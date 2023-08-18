export interface UserI{
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    img?: string
    admin?: boolean,
    favorite: string[]
}

export interface RestaurantI{
    id: string,
    name: string,
    img: string,
    description: string,
    city: string,
    score: number,
    comments: string[],
}