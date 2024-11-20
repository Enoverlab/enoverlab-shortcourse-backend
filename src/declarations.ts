import { Request } from "express"
import { User } from "./user/user.schema"

export interface requestObj extends Request{
    user : User
}