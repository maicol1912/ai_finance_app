import { UserEntity } from "@app/modules/user/infraestructure/persistence/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class InvestmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, user => user.investments)
  user: UserEntity;
}