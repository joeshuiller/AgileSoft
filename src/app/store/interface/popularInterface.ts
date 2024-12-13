import { Authorisation } from "../models/authorisationModels"
import { Popular } from "../models/popularModels"
import { Users } from "../models/userModels"

export interface Populares{
    imageBaseUrl:string,
    data: Popular[],
}