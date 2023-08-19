export interface UserI{
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    img?: string
    admin?: boolean,
    favorite: string[],
    createdAt: string,
    updatedAt: string
}

export interface RestaurantI{
    id: string,
    name: string,
    img: string,
    description: string,
    city: string,
    score: number,
    coments: string[],
    createdAt: string,
    updatedAt: string
}