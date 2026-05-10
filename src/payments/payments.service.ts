import * as crypto from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from '../orders/schemas/order.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class PaymentsService {
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {
    this.apiKey = (this.configService.get<string>('BOLD_API_KEY') ?? '').trim();
    this.secretKey = (this.configService.get<string>('BOLD_SECRET_KEY') ?? '').trim();
  }

  async getCheckoutParams(orderId: string) {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) throw new NotFoundException('Orden no encontrada');

    const amount = order.total.toString();
    const currency = 'COP';
    const integritySignature = crypto
      .createHash('sha256')
      .update(`${order.orderNumber}${amount}${currency}${this.secretKey}`)
      .digest('hex');

    return {
      apiKey: this.apiKey,
      orderId: order.orderNumber,
      amount,
      currency,
      integritySignature,
      description: `Pago orden ${order.orderNumber} - Happy Pets`,
    };
  }

  async findAllTransactions() {
    return this.transactionModel.find().sort({ createdAt: -1 }).exec();
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

    await this.transactionModel.create({
      reference_id: referenceId,
      transaction_id: transactionId,
      status: 'APPROVED',
      payment_method: (body.payment_method as string) ?? 'BOLD_BUTTON',
      total_amount: (body.amount as number) ?? 0,
      raw_response: body,
    });

    return { received: true };
  }
}
