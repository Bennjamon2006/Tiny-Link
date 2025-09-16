import Filter from "shared/types/Filter";

export default interface DataSource<T> {
  getAll(filter?: Filter<T>): Promise<T[]>;
  getOne(filter: Filter<T>): Promise<T | null>;
  getById(id: string): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
