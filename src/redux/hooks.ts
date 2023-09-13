import { type store } from './store';
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


// ----------------------------------------------------
// we're using these custom typed hooks throughout app
// instead of plain `useDispatch` and `useSelector`
// more info: https://youtu.be/9zySeP5vH9c
// ----------------------------------------------------

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
