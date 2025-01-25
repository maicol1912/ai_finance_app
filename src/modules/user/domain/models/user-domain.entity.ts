import { PasswordEncoder } from "@app/shared/utils/encryptors/password.encoder";

export class UserDomainEntity {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    // transactions: TransactionEntity[];
    // investments: InvestmentEntity[];
    // savings: SavingEntity[];
    // recommendations: RecommendationEntity[];

    async encryptPassword(){
        this.password = await PasswordEncoder.hashPassword(this.password)
    }
}