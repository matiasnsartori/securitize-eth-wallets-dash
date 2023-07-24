import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({
        unique: true
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Column({
        unique: true
    })
    address: string;

    @IsNotEmpty()
    @IsBoolean()
    @Column()
    favorite: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @Column({default: false})
    isOld?: boolean;
}
