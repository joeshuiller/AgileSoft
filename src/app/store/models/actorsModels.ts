export class Actors {
    static fromApi(item: any){
        return new Actors (
            item.adult,
            item.cast_id,
            item.character,
            item.credit_id,
            item.gender,
            item.id,
            item.known_for_department,
            item.name,
            item.order,
            item.original_name,
            item.popularity,
            item.profile_path,
        )  
    }
    constructor(
        public adult?: boolean,
        public castId?: number,
        public character?: string,
        public creditId?: string,
        public gender?: number,
        public id?: number,
        public knownDepartment?: string,
        public name?: string,
        public order?: number,
        public originalName?: string,
        public popularity?:number,
        public profilePath?: number,
    ){}
}
