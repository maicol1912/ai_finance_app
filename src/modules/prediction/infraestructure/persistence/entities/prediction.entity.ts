import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PredictionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  predictedPrice: number;

  @Column()
  date: Date;
}