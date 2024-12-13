import { createReducer, on } from "@ngrx/store";
import * as authCreation from "../../actions";
import { authEnd } from "../../interface/authEndInterface";

export const authInitialState: authEnd = {
    item:null,
    auth: null,
    loaded: false,
    loading: false,
    error: null
}

const _authReducer = createReducer(
    authInitialState,
    on(authCreation.dataUsersSucess, (state,{users}) =>({
        ...state,
        loading:false,
        loaded:true,
       auth:{...users},
       error:null
        
    })),
    on(authCreation.loadingUsers,  (state, { item }) =>({
        ...state,
        loading:true,
        item:item,
        error: null
        
    })),
    on(authCreation.usersError, (state, { payload }) =>({
        ...state,
        loading:false,
        loaded:true,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
            status: payload.status,
        }
        
    }))
)

export function authReducer(state: any, action: any){
    return _authReducer(state, action);
}

const _popularReducer = createReducer(
    authInitialState,
    on(authCreation.dataPopularSucess, (state,{users}) =>({
        ...state,
        loading:false,
        loaded:true,
       auth:{...users},
       error:null
        
    })),
    on(authCreation.loadingUsers,  (state, { item }) =>({
        ...state,
        loading:true,
        item:item,
        error: null
        
    })),
    on(authCreation.usersError, (state, { payload }) =>({
        ...state,
        loading:false,
        loaded:true,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
            status: payload.status,
        }
        
    }))
)

export function popularReducer(state: any, action: any){
    return _popularReducer(state, action);
}

const _refreshReducer = createReducer(
    authInitialState,
    on(authCreation.dataRefreshSucess, (state,{users}) =>({
        ...state,
        loading:false,
        loaded:true,
       auth:{...users},
       error:null
        
    })),
    on(authCreation.loadingRefresh,  (state, { item }) =>({
        ...state,
        loading:true,
        item:item,
        error: null
        
    })),
    on(authCreation.refreshError, (state, { payload }) =>({
        ...state,
        loading:false,
        loaded:true,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
            status: payload.status,
        }
        
    }))
)

export function refreshReducer(state: any, action: any){
    return _refreshReducer(state, action);
}

const _moviesReducer = createReducer(
    authInitialState,
    on(authCreation.dataMoviesSucess, (state,{users}) =>({
        ...state,
        loading:false,
        loaded:true,
       auth:{...users},
       error:null
        
    })),
    on(authCreation.loadingMovies,  (state) =>({
        ...state,
        loading:true,
        error: null
        
    })),
    on(authCreation.moviesError, (state, { payload }) =>({
        ...state,
        loading:false,
        loaded:true,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
            status: payload.status,
        }
        
    }))
)

export function moviesReducer(state: any, action: any){
    return _moviesReducer(state, action);
}

const _actorsReducer = createReducer(
    authInitialState,
    on(authCreation.dataActorsSucess, (state,{users}) =>({
        ...state,
        loading:false,
        loaded:true,
       auth:{...users},
       error:null
        
    })),
    on(authCreation.loadingActors,  (state) =>({
        ...state,
        loading:true,
        error: null
        
    })),
    on(authCreation.actorsError, (state, { payload }) =>({
        ...state,
        loading:false,
        loaded:true,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
            status: payload.status,
        }
        
    }))
)

export function actorsReducer(state: any, action: any){
    return _actorsReducer(state, action);
}
