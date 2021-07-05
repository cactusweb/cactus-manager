export interface License {
    id: string,
    key: string,
    activations: {
        devices: [
          string
        ],
        quantity: number
    },
    bought_at: Date | number,
    created_at: Date | number,
    expires_in?: Date | number,
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
