import React, { createContext, useContext } from 'react';

const DispatchContext = createContext(null);

export function useDispatch() {
    return useContext(DispatchContext);
}

export function DispatchProvider({ children, dispatch }) {
    debugger;// (2)
    return (
        <DispatchContext.Provider value={dispatch}>
            {children}
        </DispatchContext.Provider>
    );
}
