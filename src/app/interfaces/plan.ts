export interface Plan {
    activations: number,
    id: string,
    license_status: string,
    name: string,
    owner: string,
    renewal_price: number,
    roles: [
      {
        id: string,
        name: string
      }
    ],
    unbindable: true
}
