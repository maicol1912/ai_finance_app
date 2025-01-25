import { ObjectLiteral } from "typeorm";

export abstract class BaseRepositoryInterface<
  T extends ObjectLiteral,
  DomainEntity extends ObjectLiteral
> {
  abstract findManyByField<U extends Partial<T>>(query: U): Promise<DomainEntity[]>;
  abstract findByField<U extends Partial<T>>(query: U): Promise<DomainEntity | null>;
  abstract save(domainEntity: DomainEntity): Promise<DomainEntity>;
  abstract findById(id: string | number): Promise<DomainEntity | null>;
  abstract findByIds(ids: (string | number)[]): Promise<DomainEntity[]>;
  abstract findAll(): Promise<DomainEntity[]>;
  abstract update(id: string | number, domainEntity: Partial<DomainEntity>): Promise<DomainEntity>;
  abstract delete(id: string | number): Promise<void>;
}