import { ActionReducerMap } from "@ngrx/store";
import { StoreKey } from '../store/store.enums';
import { authReducer } from "./auth/auth.reducer";
import { AuthEffects } from "./auth/auth.effects";
import { IState } from "./store.interfaces";

export const REDUCERS: ActionReducerMap<IState> = {
    [StoreKey.AUTH]: authReducer
};

export const EFFECTS = [AuthEffects];
