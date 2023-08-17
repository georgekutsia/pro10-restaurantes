export interface UserI{
    id?: number,
    name: string,
    email: string,
    password: string,
    age: number,
    img?: string
    favorites: []
}

export interface RestaurantI{
    id?: number,
    name: string,
    img: string,
    description: string,
    city: string,
    stars: number
}