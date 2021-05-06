export interface License {
    id: string,
    key: string,
    activations: {
        devices: [
          string
        ],
        quantity: number
    },
    boughtAt: Date,
    createdAt: Date,
    expiresIn?: Date,
    discord: {
        id: string,
        roles: [
          {
            id: string,
            name: string
          }
        ]
    },
    owner: string,
    payment: {
        currency: string,
        last4: string,
        paymentId: string,
        paymentMethodId: string,
        price: number
    },
    type: string,
    unbindable: true,
    user: string
}
