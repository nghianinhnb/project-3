export interface RegisterDto {
    email: string;
    password: string;
    username: string;
}

export interface UpdateDto {
    password?: string;
    username?: string;
}
