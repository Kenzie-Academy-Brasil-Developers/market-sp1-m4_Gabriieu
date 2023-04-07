export interface iProduct{
    id: number
    name: string
    price: number
    weight: number
    section: 'food' | 'cleaning'
    calories: string
    expirationDate: Date
}



export type iCleaningProduct = Omit<iProduct, 'calories'>
