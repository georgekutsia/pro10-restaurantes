export interface UserI{
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    img?: string
    admin?: boolean,
    favorite: any[],
    comments?: any[],
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
    adress: string,
    hours: string,
    phone:number,
    comments: any[],
    createdAt: string,
    updatedAt: string,
    
}