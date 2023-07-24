import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Exchange {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    eth: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    dollar: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    euro: number;
}
