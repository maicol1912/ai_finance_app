import { UserEntity } from "@app/modules/user/infraestructure/persistence/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class SavingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  goal: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, user => user.savings)
  user: UserEntity;
}