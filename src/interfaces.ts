export interface iProduct{
    id: number
    name: string
    price: number
    weight: number
    section: 'food' | 'cleaning'
    calories: string
    expiration_date: Date
}



export type iCleaningProduct = Omit<iProduct, 'calories'>
