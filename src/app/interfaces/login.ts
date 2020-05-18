export interface Roles {
    reader: boolean;
    author?: boolean;
    admin?: boolean;
    teacher?: boolean;
    student?: boolean;
    parents?: boolean;
    invited?: boolean;
}

export class UserInfo {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    constructor(authData: any) {
        this.uid = authData.uid;
        this.email = authData.email;
        this.displayName = authData.displayName;
        this.photoURL = authData.photoURL;
    };
}

export class User {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    password: string;
    photoURL: string;
    roles: Roles;

    constructor(authData: any) {
        this.uid = authData.uid;
        this.email = authData.email;
        this.displayName = authData.displayName;
        this.phoneNumber = authData.phoneNumber;
        this.photoURL = authData.photoURL;
        this.password = authData.password;
        this.roles = { reader: true };
    };
}