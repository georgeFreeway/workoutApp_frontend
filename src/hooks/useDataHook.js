import { useContext } from 'react';
import { DataContext } from '../context/dataContext'

export const useDataHook = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw Error('Context out of context');
    }
    return context;
}