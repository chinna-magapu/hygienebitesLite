import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import AccountModal from './AccountModal';

export default function Header() {
    const [accountOpen, setAccountOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-20 bg-pastel border-b border-purple-100">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-white">
                            <span className="text-lg font-bold text-primary">HB</span>
                        </div>
                        <div className="text-left">
                            <h1 className="text-primary text-lg font-semibold">HygieneBites</h1>
                            <p className="text-xs text-gray-500">Small healthy choices</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            aria-label="Open account"
                            onClick={() => setAccountOpen(true)}
                            className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"
                        >
                            {/* simple user icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <AccountModal visible={accountOpen} onClose={() => setAccountOpen(false)} />
        </>
    );
}
