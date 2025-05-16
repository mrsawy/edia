export type WithId<T> = T & {
    _id: string, createdAt?: Date;
    updatedAt?: Date;
};
