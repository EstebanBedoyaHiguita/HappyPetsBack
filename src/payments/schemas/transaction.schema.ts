import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  reference_id: string;

  @Prop({ required: true })
  transaction_id: string;

  @Prop({ required: true, enum: ['APPROVED', 'REJECTED', 'PROCESSING', 'PENDING'] })
  status: string;

  @Prop({ required: true, enum: ['CREDIT_CARD', 'PSE', 'BOTON_BANCOLOMBIA'] })
  payment_method: string;

  @Prop({ required: true })
  total_amount: number;

  @Prop()
  payer_name: string;

  @Prop()
  payer_email: string;

  @Prop({ type: Object })
  raw_response: Record<string, unknown>;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
