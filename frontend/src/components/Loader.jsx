import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }
    return <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />;
};

export default Loader;
