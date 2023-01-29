export interface Activations {
    quantity: number
    devices: string[],
    additional_activations: AdditionalActivation[]
}


export interface AdditionalActivation{
    purchase_at: number,
    expires_at: number,
    price: number,
    type: 'temporary'|'lifetime'
}