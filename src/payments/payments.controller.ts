import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('checkout/:orderId')
  @UseGuards(JwtAuthGuard)
  getCheckoutParams(@Param('orderId') orderId: string) {
    return this.paymentsService.getCheckoutParams(orderId);
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
