import { TokenData } from "./token.interface";

export interface User {
    tokenData?:TokenData;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}