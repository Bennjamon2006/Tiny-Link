import { Db, Collection, Filter as MongoFilter } from "mongodb";
import DataSource from "shared/domain/DataSource";
import Filter from "shared/types/Filter";

export default abstract class MongoDataSource<T> implements DataSource<T> {
  protected db: Db;

  private collectionName: string;

  protected collection: Collection<T>;

  constructor(db: Db) {
    this.db = db;
    this.collectionName = this.getCollectionName();
    this.collection = this.db.collection(this.collectionName);
  }

  abstract getCollectionName(): string;

  async getAll(filter?: Filter<T>): Promise<T[]> {
    const mongoFilter: MongoFilter<T> = (filter || {}) as MongoFilter<T>;
    return this.collection.find(mongoFilter).toArray() as Promise<T[]>;
  }

  async getOne(filter: Filter<T>): Promise<T | null> {
    return this.collection.findOne(
      filter as MongoFilter<T>,
    ) as Promise<T | null>;
  }

  async getById(id: string): Promise<T | null> {
    return this.collection.findOne({
      _id: id,
    } as MongoFilter<T>) as Promise<T | null>;
  }

  async create(item: T): Promise<T> {
    const result = await this.collection.insertOne(item as any);

    return { ...(item as any), _id: result.insertedId } as T;
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: id } as MongoFilter<T>,
      { $set: item },
      { returnDocument: "after" },
    );
    return result as T | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({
      _id: id,
    } as MongoFilter<T>);
    return result.deletedCount === 1;
  }
}
