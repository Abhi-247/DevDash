import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_RECRUITER_DATA } from '../utils/mockRecruiterData';

const RecruiterContext = createContext();

export const useRecruiter = () => {
    const context = useContext(RecruiterContext);
    if (!context) {
        throw new Error('useRecruiter must be used within a RecruiterProvider');
    }
    return context;
};

export const RecruiterProvider = ({ children }) => {
    // Default to false so developers see their actual profile data, or load stored preference
    const [isRecruiterMode, setIsRecruiterMode] = useState(() => {
        const saved = localStorage.getItem('recruiter_demo_mode');
        return saved !== null ? saved === 'true' : false;
    });

    useEffect(() => {
        localStorage.setItem('recruiter_demo_mode', isRecruiterMode);
    }, [isRecruiterMode]);

    const toggleRecruiterMode = () => {
        setIsRecruiterMode(prev => !prev);
    };

    return (
        <RecruiterContext.Provider
            value={{
                isRecruiterMode,
                setIsRecruiterMode,
                toggleRecruiterMode,
                mockData: MOCK_RECRUITER_DATA,
                isArchModalOpen: false,
                setIsArchModalOpen: () => {},
                isTerminalOpen: false,
                setIsTerminalOpen: () => {},
                isCommandPaletteOpen: false,
                setIsCommandPaletteOpen: () => {}
            }}
        >
            {children}
        </RecruiterContext.Provider>
    );
};
