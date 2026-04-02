import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Order, OrderDocument, OrderStatus } from '../orders/schemas/order.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { PaymentAttemptDto } from './dto/payment-attempt.dto';

@Injectable()
export class PaymentsService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {
    this.apiUrl = (this.configService.get<string>('BOLD_API_URL') ?? '').trim();
    this.apiKey = (this.configService.get<string>('BOLD_API_KEY') ?? '').trim();
  }

  private get headers() {
    return {
      Authorization: `x-api-key ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async createPaymentIntent(orderId: string) {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    const body = {
      reference_id: order.orderNumber,
      amount: {
        currency: 'COP',
        total_amount: order.total,
        taxes: [],
      },
      description: `Pago orden ${order.orderNumber} - Happy Pets`,
    };

    const { data } = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/online/link/v1/payment-intents`, body, {
        headers: this.headers,
      }),
    );

    return data.payload;
  }

  async createPaymentAttempt(attemptDto: PaymentAttemptDto) {
    const body: Record<string, unknown> = {
      reference_id: attemptDto.reference_id,
      payer: attemptDto.payer,
      payment_method: attemptDto.payment_method,
    };

    const methodName = (attemptDto.payment_method as any).name;
    if (methodName === 'PSE' || methodName === 'BOTON_BANCOLOMBIA') {
      body.callback_url =
        attemptDto.callback_url ||
        `${this.configService.get<string>('FRONTEND_URL')}/pago-resultado`;
    }

    const { data } = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/online/link/v1/payment-intents/${attemptDto.reference_id}/payment-attempts`, body, {
        headers: this.headers,
      }),
    );

    const result = data.payload;

    await this.transactionModel.create({
      reference_id: attemptDto.reference_id,
      transaction_id: result.transaction_id,
      status: result.status,
      payment_method: (attemptDto.payment_method as any).name,
      total_amount: 0,
      payer_name: attemptDto.payer.name,
      payer_email: attemptDto.payer.email,
      raw_response: result,
    });

    return result;
  }

  async findAllTransactions() {
    return this.transactionModel.find().sort({ createdAt: -1 }).exec();
  }

  async getAttemptStatus(transactionId: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/online/link/v1/payment-intents/attempts/${transactionId}`, {
        headers: this.headers,
      }),
    );

    return data.payload;
  }

  async getPseBanks() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/online/link/v1/pse/banks`, {
        headers: this.headers,
      }),
    );

    return data.payload;
  }

  async handleWebhook(body: Record<string, unknown>) {
    const referenceId = body.reference_id as string;
    const status = body.status as string;
    const transactionId = body.bold_transaction_id as string;

    if (status !== 'PAID' || !referenceId) {
      return { received: true };
    }

    const order = await this.orderModel.findOne({ orderNumber: referenceId }).exec();
    if (!order || order.status === OrderStatus.PAID) {
      return { received: true };
    }

    await this.orderModel.findByIdAndUpdate(order._id, {
      status: OrderStatus.PAID,
      paymentRef: transactionId,
      paymentMethod: 'BOLD',
      paymentDetails: body,
    });

    await this.transactionModel.findOneAndUpdate(
      { reference_id: referenceId },
      { status: 'APPROVED', transaction_id: transactionId, raw_response: body },
    );

    return { received: true };
  }
}
