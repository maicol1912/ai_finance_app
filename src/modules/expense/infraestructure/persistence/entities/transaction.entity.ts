import { UserEntity } from "@app/modules/user/infraestructure/persistence/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: 'income' | 'expense';

  @Column()
  category: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, user => user.transactions)
  user: UserEntity;
}