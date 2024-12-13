import { Authorisation } from "../models/authorisationModels"
import { Users } from "../models/userModels"

export interface Auth{
    authorisation:Authorisation,
    user: Users,
}