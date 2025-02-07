import { IUser } from "./user";

export interface IAuth {
    token : string ,
    userDto? : IUser;
    error? : string | null;
}

