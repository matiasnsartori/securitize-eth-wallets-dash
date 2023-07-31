import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  eth: number = 0;

  @IsNumber()
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  usd: number = 0;

  @IsNumber()
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  euro: number = 0;
}
