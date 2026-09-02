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
    // Default to true for impressive first-glance recruiter experience, or load stored preference
    const [isRecruiterMode, setIsRecruiterMode] = useState(() => {
        const saved = localStorage.getItem('recruiter_demo_mode');
        return saved !== null ? saved === 'true' : true;
    });

    const [isArchModalOpen, setIsArchModalOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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
                isArchModalOpen,
                setIsArchModalOpen,
                isTerminalOpen,
                setIsTerminalOpen,
                isCommandPaletteOpen,
                setIsCommandPaletteOpen
            }}
        >
            {children}
        </RecruiterContext.Provider>
    );
};
