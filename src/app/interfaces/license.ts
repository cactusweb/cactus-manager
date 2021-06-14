export interface License {
    id: string,
    key: string,
    activations: {
        devices: [
          string
        ],
        quantity: number
    },
    bought_at: Date,
    created_at: Date,
    expires_in?: Date,
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
        payment_id: string,
        payment_method_id: string,
        price: number
    },
    type: string,
    unbindable: true,
    user: string
}
