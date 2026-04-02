import { IsString, IsNotEmpty, IsObject, ValidateNested, IsOptional, IsInt, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsIn(['CEDULA', 'CEDULA_EXTRANJERIA', 'TARJETA_IDENTIDAD', 'PASAPORTE', 'NIT'])
  document_type: string;

  @IsString()
  @IsNotEmpty()
  document_number: string;
}

export class CreditCardMethodDto {
  name: 'CREDIT_CARD' = 'CREDIT_CARD';

  @IsString()
  @IsNotEmpty()
  cardholder_name: string;

  @IsInt()
  expiration_month: number;

  @IsInt()
  expiration_year: number;

  @IsInt()
  installments: number;

  @IsString()
  @IsNotEmpty()
  card_number: string;

  @IsString()
  @IsNotEmpty()
  cvc: string;
}

export class PseMethodDto {
  name: 'PSE' = 'PSE';

  @IsInt()
  bank_code: number;

  @IsString()
  @IsNotEmpty()
  bank_name: string;
}

export class BancolombiaMethodDto {
  name: 'BOTON_BANCOLOMBIA' = 'BOTON_BANCOLOMBIA';
}

export class PaymentAttemptDto {
  @IsString()
  @IsNotEmpty()
  reference_id: string;

  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;

  @IsObject()
  payment_method: CreditCardMethodDto | PseMethodDto | BancolombiaMethodDto;

  @IsString()
  @IsOptional()
  callback_url?: string;
}
