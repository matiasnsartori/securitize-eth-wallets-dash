
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    favorite: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isOld?: boolean;

}