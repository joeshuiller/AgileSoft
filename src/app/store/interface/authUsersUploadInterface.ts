import { Users } from "../models/userModels"

export interface authUsersUpload{
    item:any,
    auth: Users[],
    loaded: boolean,
    loading: boolean,
    error: any
}