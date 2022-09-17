import { createContext, useReducer } from "react";

export const DataContext = createContext();

const myDataReducer = (state, action) => {
    switch(action.type){
        case 'GET_DATA':
        return {
            data: action.payload
        }
        case 'CREATE_DATA':
        return {
            data: [ ...state.data, action.payload ]
        }
        case 'DELETE_DATA':
        return {
            data: state.data.filter((item) => {
                return item._id !== action.payload._id
            })
        } 
        default: 
        return state;
    }
}

export const DataContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(myDataReducer, {
        data: null
    });

    // console.log(state);

    return (
        <DataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}