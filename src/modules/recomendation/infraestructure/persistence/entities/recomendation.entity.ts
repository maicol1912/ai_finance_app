import { UserEntity } from "@app/modules/user/infraestructure/persistence/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class RecommendationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'investment' | 'saving' | 'general';

  @Column()
  message: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, user => user.recommendations)
  user: UserEntity;
}