import {thunk}  from "redux-thunk"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as AppReducer } from "./AppReducer/reducer";


export const store = legacy_createStore(AppReducer, applyMiddleware(thunk));


