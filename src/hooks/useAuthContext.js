import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('Context out of context');
    }
    return context;
}