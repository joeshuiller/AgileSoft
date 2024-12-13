export class Popular {
    static fromApi(item: any){
        return new Popular (
            item.adult,
            item.backdrop_path,
            item.id,
            item.original_title,
            item.overview,
            item.popularity,
            item.poster_path,
            item.release_date,
            item.title,
            item.video,
            item.vote_average,
            item.vote_count,
        )  
    }
    constructor(
        public adult?: boolean,
        public backdropPath?: string,
        public id?: number,
        public originalTitle?: string,
        public overView?: string,
        public popularity?: number,
        public posterPath?: string,
        public releaseDate?: string,
        public title?: string,
        public video?: string,
        public voteAverage?:number,
        public voteCount?: number,
    ){}
}
