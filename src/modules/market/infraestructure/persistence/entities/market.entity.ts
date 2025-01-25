import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MarketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  price: number;

  @Column()
  date: Date;
}