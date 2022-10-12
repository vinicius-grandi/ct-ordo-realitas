import battlefieldReducer from "./battlefieldSlice";
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  battlefieldReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
