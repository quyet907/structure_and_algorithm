import { BaseModel } from "./BaseModel";

export interface Customer extends BaseModel {
    name: string,
    email: string,  
}