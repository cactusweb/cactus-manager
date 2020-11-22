export interface License {
    _id: string,
    owner: string,
    user: string,
    key: string,
    status: string,
    expiresIn?: Date,
    quantity: number,
    devices?: any,
    createdAt?: Date,
    updatedAt?: Date,
}
