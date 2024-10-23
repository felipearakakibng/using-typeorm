import { ApiProperty } from "@nestjs/swagger";
import { UFs } from "./../constants/ufs";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Transform } from "class-transformer";
import { parseQueryParamsToNumber } from "../parse-functions/general.module";
import { validateTimeFormat } from "../utils/string";

@ValidatorConstraint({ name: "uf", async: false })
export class isUF implements ValidatorConstraintInterface {
  validate(uf: string) {
    if ([undefined, null, "", 0, "0"].includes(uf)) {
      return true;
    }

    return UFs.includes(uf);
  }

  defaultMessage() {
    return "UF Inválido";
  }
}

@ValidatorConstraint({ name: "cpf", async: false })
export class isCPF implements ValidatorConstraintInterface {
  validate(cpf: string) {
    if (!cpf) {
      return true;
    }
    const cleanedCPF = cpf.replace(/\D/g, "");

    if (cleanedCPF.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cleanedCPF)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) {
      firstDigit = 0;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) {
      secondDigit = 0;
    }

    if (
      parseInt(cleanedCPF.charAt(9)) !== firstDigit ||
      parseInt(cleanedCPF.charAt(10)) !== secondDigit
    ) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "CPF Inválido";
  }
}

@ValidatorConstraint({ name: "cnpj", async: false })
export class isCNPJ implements ValidatorConstraintInterface {
  validate(cnpj: string) {
    if (!cnpj) {
      return true;
    }

    const cleanedCNPJ = cnpj.replace(/\D/g, "");

    if (cleanedCNPJ.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cleanedCNPJ)) {
      return false;
    }

    let sum = 0;
    let factor = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanedCNPJ.charAt(i)) * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }
    let firstDigit = sum % 11;
    firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

    sum = 0;
    factor = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanedCNPJ.charAt(i)) * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }
    let secondDigit = sum % 11;
    secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

    if (
      parseInt(cleanedCNPJ.charAt(12)) !== firstDigit ||
      parseInt(cleanedCNPJ.charAt(13)) !== secondDigit
    ) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "CNPJ Inválido";
  }
}

@ValidatorConstraint({ name: "hour", async: false })
export class isHourHHmm implements ValidatorConstraintInterface {
  validate(hour: string) {
    // TODO Criar validador para Hora no formato HH:mm
    if (hour) {
      return true;
    }
    return false;
  }

  defaultMessage() {
    return "Hora no formato Inválido, utilize HH:mm";
  }
}

@ValidatorConstraint({ name: "hourInArray", async: false })
export class isHourHHmmInArrayValidator implements ValidatorConstraintInterface {
  validate(hours: string[]) {
    if (hours?.length) {
      const hoursFilteredByInvalid = hours.filter((HHmm) => !validateTimeFormat(HHmm));
      return hoursFilteredByInvalid.length === 0;
    }
    return false;
  }

  defaultMessage() {
    return "Hora no formato Inválido, utilize HH:mm";
  }
}

export class PaginateDto {
  @ApiProperty()
  @Transform(parseQueryParamsToNumber)
  @IsInt()
  @IsOptional()
  readonly limit: number;

  @ApiProperty()
  @Transform(parseQueryParamsToNumber)
  @IsInt()
  @IsOptional()
  readonly offset: number;
}

export class DoctorParamDto {
  @ApiProperty()
  @Transform(parseQueryParamsToNumber)
  @IsInt()
  @IsNotEmpty()
  readonly doctorId: number;
}

export class IdParamDto {
  @ApiProperty()
  @Transform(parseQueryParamsToNumber)
  @IsInt()
  @IsNotEmpty()
  readonly id: number;
}
