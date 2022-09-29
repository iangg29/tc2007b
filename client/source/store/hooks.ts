// (c) Tecnologico de Monterrey 2022, rights reserved.

import { AppDispatch, RootState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
