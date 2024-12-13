export class Authorisation {
   static fromApi(item: any){
        return new Authorisation(
            item.type,
            item.token,
            item.refresh_token,
        )
   }
    constructor(
        public tokenType?: string,
        public accessToken?: string,
        public refreshToken?: string,
    ){

    }
}
