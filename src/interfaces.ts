export interface iProduct{
    id: number
    name: string
    price: number
    weight: number
    section: 'food' | 'cleaning'
    expiration_date: Date
}

export interface iFoodProduct extends iProduct{
    calories: number
}

export interface iCleaningProduct extends iProduct{}
