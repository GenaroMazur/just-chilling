export default interface RepositoryInterface<T, ID extends string | number> {
    findById(id: ID): Promise<T | null>;

    save(entity: T): Promise<T>;

    delete(id: ID): Promise<void>;
}