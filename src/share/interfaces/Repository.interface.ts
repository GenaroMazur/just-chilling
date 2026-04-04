export default interface RepositoryInterface<T> {
    findById(id: string): Promise<T | null>;

    save(entity: T): Promise<T>;

    delete(id: string): Promise<void>;

    delete(entity: T): Promise<void>;

    delete(t: string | T): Promise<void>;
}