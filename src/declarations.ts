import { Request } from "express"
import { User } from "./short-course/user/user.schema"

export interface requestObj extends Request{
    user : User
}