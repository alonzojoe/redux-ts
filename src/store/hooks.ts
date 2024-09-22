import { useDispatch } from 'react-redux';
import { AppDispatch } from './index';

type DispatchAction = () => AppDispatch;

export const useCartDispatch: DispatchAction = useDispatch;