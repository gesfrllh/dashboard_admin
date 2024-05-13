export interface Customers{
    id: number,
    name: string,
    price: number,
    description: string,
    image_data: {
        type: string,
        data: string
    },
    customerId: number
}

export interface Dashboards{
    id: number,
    name: string,
    month: number[],
    price_per_month: string[],
    total: number[]
    customerId: number
}