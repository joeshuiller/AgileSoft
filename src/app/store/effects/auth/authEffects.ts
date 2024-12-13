import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import * as auth from '../../actions'
import { mergeMap } from "rxjs/operators";
import { Authorisation } from "../../models/authorisationModels";
import { Users } from "../../models/userModels";
import { Auth } from "../../interface/authInterface";
import { AuthService } from "../../../service/auth/auth-service.service";
import { LocalStoreService } from "../../../service/utility/localstore/local-store.service";
import { Popular } from "../../models/popularModels";
import { Populares } from "../../interface/popularInterface";
import { Actors } from "../../models/actorsModels";
import { ActorsList } from "../../interface/actorsInterface";

@Injectable()
export class authEffects{
    
    auth$ = createEffect(
        () => this.action$.pipe(
            ofType(auth.loadingUsers),
            mergeMap(
                (item) => this._https.login(item.item)
                .then(
                    (user: any) => {
                        const authorisation:Authorisation = Authorisation.fromApi(user.data.payload);
                        const users : Users =  Users.fromApi(user.data.user)
                        const data: Auth = {
                            authorisation: authorisation,
                            user: users,
                        }
                        this.localStore.setSuccessLogin(data)
                        return auth.dataUsersSucess({users: data})
                    }
                ).catch(
                    (err: any) => auth.usersError({payload:err})
                )
            )
        )
    )
    popular$ = createEffect(
        () => this.action$.pipe(
            ofType(auth.loadingPopular),
            mergeMap(
                () => this._https.popular()
                .then(
                    (user: any) => {
                        const dataList:Popular[] = []
                        if ( user.data.length != 0) {
                            user.data.forEach((element: any) => {
                                let data = Popular.fromApi(element);
                                dataList.push(data)
                            });
                        } 
                        const data: Populares = {
                            imageBaseUrl: user.imageBaseUrl,
                            data: dataList,
                        }
                        return auth.dataPopularSucess({users: data})
                    }
                ).catch(
                    (err: any) => auth.usersError({payload:err})
                )
            )
        )
    )
    refresh$ = createEffect(
        () => this.action$.pipe(
            ofType(auth.loadingRefresh),
            mergeMap(
                (item) => this._https.refresh(item.item)
                .then(
                    (user: any) => {
                        const authorisation:Authorisation = Authorisation.fromApi(user.data.payload);
                        const users : Users =  Users.fromApi(user.data.user)
                        const data: Auth = {
                            authorisation: authorisation,
                            user: users,
                        }
                        this.localStore.setSuccessLogin(data)
                        return auth.dataRefreshSucess({users: data})
                    }
                ).catch(
                    (err: any) => auth.refreshError({payload:err})
                )
            )
        )
    )

    movies$ = createEffect(
        () => this.action$.pipe(
            ofType(auth.loadingMovies),
            mergeMap(
                () => this._https.movies()
                .then(
                    (user: any) => {
                        const dataList:Popular[] = []
                        if ( user.data.length != 0) {
                            user.data.forEach((element: any) => {
                                let data = Popular.fromApi(element);
                                dataList.push(data)
                            });
                        } 
                        const data: Populares = {
                            imageBaseUrl: user.imageBaseUrl,
                            data: dataList,
                        }
                        return auth.dataMoviesSucess({users: data})
                    }
                ).catch(
                    (err: any) => auth.moviesError({payload:err})
                )
            )
        )
    )
    actors$ = createEffect(
        () => this.action$.pipe(
            ofType(auth.loadingActors),
            mergeMap(
                (item) => this._https.actors(item.item)
                .then(
                    (user: any) => {
                        const dataList:Actors[] = []
                        if ( user.data.length != 0) {
                            user.data.forEach((element: any) => {
                                let data = Actors.fromApi(element);
                                dataList.push(data)
                            });
                        }
                        const data: ActorsList = {
                            imageBaseUrl: user.imageBaseUrl,
                            data: dataList,
                        }
                        return auth.dataActorsSucess({users: data})
                    }
                ).catch(
                    (err: any) => auth.actorsError({payload:err})
                )
            )
        )
    )
    constructor(
        private action$: Actions,
        private _https:AuthService,
        private localStore: LocalStoreService,
    ){

    }
}
