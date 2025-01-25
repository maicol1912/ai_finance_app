import { TransactionEntity } from "@app/modules/expense/infraestructure/persistence/entities/transaction.entity";
import { InvestmentEntity } from "@app/modules/investment/infraestructure/persistence/entities/investment.entity";
import { RecommendationEntity } from "@app/modules/recomendation/infraestructure/persistence/entities/recomendation.entity";
import { SavingEntity } from "@app/modules/saving/infraestructure/persistence/entities/saving.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToMany(() => TransactionEntity, transaction => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => InvestmentEntity, investment => investment.user)
  investments: InvestmentEntity[];

  @OneToMany(() => SavingEntity, saving => saving.user)
  savings: SavingEntity[];

  @OneToMany(() => RecommendationEntity, recomendation => recomendation.user)
  recommendations: RecommendationEntity[];
}