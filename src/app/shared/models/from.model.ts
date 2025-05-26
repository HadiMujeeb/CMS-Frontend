export interface formErrorField {
    type:string;
    message:string;
}

export interface formField {
    name:string;
    label:string;
    type:'text'|'password'|'confirmPassword'|'email'|'select'|'textarea'|'file'|'number';
    placeholder:string;
    errors?:formErrorField[];


}