import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './index';

type DispatchAction = () => AppDispatch;

export const useCartDispatch: DispatchAction = useDispatch;
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;