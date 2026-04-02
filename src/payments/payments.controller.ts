import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { PaymentAttemptDto } from './dto/payment-attempt.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intent')
  createIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.paymentsService.createPaymentIntent(dto.orderId);
  }

  @Post('attempt')
  createAttempt(@Body() dto: PaymentAttemptDto) {
    return this.paymentsService.createPaymentAttempt(dto);
  }

  @Get('attempt/:transactionId/status')
  getStatus(@Param('transactionId') transactionId: string) {
    return this.paymentsService.getAttemptStatus(transactionId);
  }

  @Get('pse-banks')
  getPseBanks() {
    return this.paymentsService.getPseBanks();
  }

  @Get('transactions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.AGENT)
  findAllTransactions() {
    return this.paymentsService.findAllTransactions();
  }

  @Post('webhook')
  handleWebhook(@Body() body: Record<string, unknown>) {
    return this.paymentsService.handleWebhook(body);
  }
}
