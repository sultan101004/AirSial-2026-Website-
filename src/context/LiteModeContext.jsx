import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LiteModeContext = createContext();

export const LiteModeProvider = ({ children }) => {
    // We can't use useSearchParams here because this provider might be wrapped INSIDE Router,
    // or OUTSIDE. To be safe, we'll check window.location directly for initial state.
    const [isLiteMode, setIsLiteMode] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const lite = params.get('lite') === 'true';
        setIsLiteMode(lite);


    }, []);

    return (
        <LiteModeContext.Provider value={{ isLiteMode }}>
            {children}
        </LiteModeContext.Provider>
    );
};

export const useLiteMode = () => useContext(LiteModeContext);
