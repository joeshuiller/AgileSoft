export class Users {
    static fromApi(item: any){
        return new Users (
            item.email,
            item.firstName,
            item.lastName,
            
        )
    }
    constructor(
        public email?: string,
        public firstName?: string,
        public lastName?: string,
    ){}
}