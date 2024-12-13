import { createAction, props } from "@ngrx/store";
import { Auth } from "../interface/authInterface";
import { Populares } from "../interface/popularInterface";
import { Actors } from "../models/actorsModels";
import { ActorsList } from "../interface/actorsInterface";

export const loadingUsers = createAction('[Auth] loadingUsers', props<{item: any}>());
export const dataUsersSucess = createAction('[Auth] setUsers',props<{ users: Auth}>());
export const usersError = createAction('[Auth] usersError',props<{payload: any}>());
//List popular
export const loadingPopular = createAction('[Auth] loadingPopular');
export const dataPopularSucess = createAction('[Auth] setPopular',props<{ users: Populares}>());
export const popularError = createAction('[Auth] popularError',props<{payload: any}>());
//List Refresh
export const loadingRefresh = createAction('[Auth] loadingRefresh', props<{item: any}>());
export const dataRefreshSucess = createAction('[Auth] setRefresh',props<{ users: any}>());
export const refreshError = createAction('[Auth] refreshError',props<{payload: any}>());
//cretae Movies
export const loadingMovies = createAction('[Auth] loadingMovies');
export const dataMoviesSucess = createAction('[Auth] setMovies',props<{ users: Populares}>());
export const moviesError = createAction('[Auth] moviesError',props<{payload: any}>());
//cretae Actors
export const loadingActors = createAction('[Auth] loadingActors', props<{item: number}>());
export const dataActorsSucess = createAction('[Auth] setActors',props<{ users: ActorsList}>());
export const actorsError = createAction('[Auth] actorsError',props<{payload: any}>());
