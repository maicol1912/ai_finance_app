import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntityManager, FindOptionsWhere, In, ObjectLiteral, Repository } from "typeorm";

type AtLeastOneProperty<T> =
  | {
      [K in keyof T]?: T[K] | { [P: string]: any };
    }
  | { [P: string]: any };

export abstract class BaseRepository<
  T extends ObjectLiteral, 
  ID extends keyof T,    
  DomainEntity extends ObjectLiteral
> {
  protected repository: Repository<T>;
  private transactionManager: EntityManager | null = null;
  private readonly idField: ID;

  constructor(
    @InjectDataSource() protected dataSource: DataSource,
    private entityType: new () => T,
    idField: ID,
  ) {
    this.repository = this.dataSource.getRepository(this.entityType);
    this.idField = idField;
  }

  protected getManager(): EntityManager {
    return this.transactionManager || this.dataSource.manager;
  }

  public setTransactionManager(manager: EntityManager | null) {
    this.transactionManager = manager;
  }

  protected fromDomain(domainEntity: DomainEntity): T {
    const entity = new this.entityType();
    Object.assign(entity, domainEntity);
    return entity;
  }

  protected toDomain(entity: T): DomainEntity {
    return entity as unknown as DomainEntity;
  }

  public async findManyByField<U extends AtLeastOneProperty<T>>(query: U): Promise<DomainEntity[]> {
    if (!query) {
      return [];
    }

    const whereClause: FindOptionsWhere<T> = {};

    (Object.keys(query) as (keyof U)[]).forEach((key) => {
      if (typeof query[key] === 'object' && query[key] !== null) {
        const relation = this.repository.metadata.relations.find((r) => r.propertyName === key);
        if (relation) {
          whereClause[key as keyof T] = query[key] as any;
        } else {
          console.warn(`La propiedad "${String(key)}" no existe en la entidad y será ignorada.`);
        }
      } else {
        if (this.repository.metadata.findColumnWithPropertyName(key as string)) {
          whereClause[key as keyof T] = query[key] as any;
        } else {
          console.warn(`La propiedad "${String(key)}" no existe en la entidad y será ignorada.`);
        }
      }
    });

    if (Object.keys(whereClause).length === 0 || Object.values(whereClause).some((value) => value === undefined))  throw new Error('No se proporcionaron campos válidos para la búsqueda.');

    const entities = await this.getManager().find(this.entityType, { where: whereClause });
    return entities.map((entity) => this.toDomain(entity)); // Convertir a dominio
  }

  public async findByField<U extends AtLeastOneProperty<T>>(query: U): Promise<DomainEntity | null> {
    if (!query) {
      return null;
    }

    const whereClause: FindOptionsWhere<T> = {};

    (Object.keys(query) as (keyof U)[]).forEach((key) => {
      if (typeof query[key] === 'object' && query[key] !== null) {
        const relation = this.repository.metadata.relations.find((r) => r.propertyName === key);
        if (relation) {
          whereClause[key as keyof T] = query[key] as any;
        } else {
          console.warn(`La propiedad "${String(key)}" no existe en la entidad y será ignorada.`);
        }
      } else {
        if (this.repository.metadata.findColumnWithPropertyName(key as string)) {
          whereClause[key as keyof T] = query[key] as any;
        } else {
          console.warn(`La propiedad "${String(key)}" no existe en la entidad y será ignorada.`);
        }
      }
    });

    if (Object.keys(whereClause).length === 0 || Object.values(whereClause).some((value) => value === undefined)) throw new Error('No se proporcionaron campos válidos para la búsqueda.');
    
    const entity = await this.getManager().findOne(this.entityType, { where: whereClause });
    return entity ? this.toDomain(entity) : null; // Convertir a dominio
  }

  public async save(domainEntity: DomainEntity): Promise<DomainEntity> {
    const entity = this.fromDomain(domainEntity); // Convertir de dominio a TypeORM
    const savedEntity = await this.getManager().save(this.entityType, entity);
    return this.toDomain(savedEntity); // Convertir de TypeORM a dominio
  }

  public async findById(id: string | number): Promise<DomainEntity | null> {
    if (!id) {
      return null;
    }
    const whereCondition: FindOptionsWhere<T> = {
      [this.idField]: id as any,
    } as FindOptionsWhere<T>;
    const entity = await this.getManager().findOne(this.entityType, { where: whereCondition });
    return entity ? this.toDomain(entity) : null; // Convertir a dominio
  }

  public async findByIds(ids: (string | number)[]): Promise<DomainEntity[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    const whereCondition: FindOptionsWhere<T> = {
      [this.idField]: In(ids),
    } as FindOptionsWhere<T>;
    const entities = await this.getManager().find(this.entityType, { where: whereCondition });
    return entities.map((entity) => this.toDomain(entity)); // Convertir a dominio
  }

  public async findAll(): Promise<DomainEntity[]> {
    const entities = await this.getManager().find(this.entityType);
    return entities.map((entity) => this.toDomain(entity)); // Convertir a dominio
  }

  public async update(id: string | number, domainEntity: Partial<DomainEntity>): Promise<DomainEntity> {
    if (id === undefined) {
      return null;
    }
    const entity = this.fromDomain(domainEntity as DomainEntity); // Convertir de dominio a TypeORM
    await this.getManager().update(this.entityType, { [this.idField]: id as any }, entity);
    const updatedEntity = await this.findById(id) as unknown as T;
    return this.toDomain(updatedEntity);
  }

  public async delete(id: string | number): Promise<void> {
    if (id === undefined) {
      return null;
    }
    await this.getManager().delete(this.entityType, { [this.idField]: id as any });
  }
}