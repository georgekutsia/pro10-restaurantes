export interface UserI{
    id: string,
    nombre: string,
    email: string,
    password: string,
    edad: number,
    foto?: string
    admin?: boolean,
    favorito: string[]
}

export interface RestaurantI{
    id: string,
    nombre: string,
    foto: string,
    descripcion: string,
    ciudad: string,
    puntos: number
}