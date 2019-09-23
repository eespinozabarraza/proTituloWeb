export interface User {
    $key: string;
    firstName: string;
    lastName: string;
    email: string
    mobileNumber: Number;
 }

 export interface UserInterface {
     id?: string;
     email?: string;
     password?: string;
     tipo?: string;

 }