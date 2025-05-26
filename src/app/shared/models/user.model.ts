export interface IUser {
    _id:string;
    name:string;
    email:string;
    picture?:string;
}

export interface regiserReponse {
    message:string;
    userData:IUser
}


export interface IRegisterErrorResponse {
errorField?: string;
message? : string;
error? : string;
}