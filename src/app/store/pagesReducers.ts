import { ActionReducerMap } from "@ngrx/store";
import * as reducer  from "./reducer";
import { PagesStates } from "./interface/pagesInterface";

export const pagesReducers: ActionReducerMap<PagesStates> = {
    auth: reducer.authReducer,
    popular: reducer.popularReducer,
    refresh: reducer.refreshReducer,
    movies: reducer.moviesReducer,
    actors: reducer.actorsReducer
}