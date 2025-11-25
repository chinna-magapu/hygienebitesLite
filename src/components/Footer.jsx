import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';

export default function Footer() {
    return (
        <footer className="sticky bottom-0 z-20 bg-white border-t">
            <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-around">
                <Link to="/" className="flex flex-col items-center text-sm text-gray-600">
                    <span className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">🏠</span>
                    <span className="mt-1">Home</span>
                </Link>

                <Link to="/products" className="flex flex-col items-center text-sm text-gray-600">
                    <span className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">🛍️</span>
                    <span className="mt-1">Products</span>
                </Link>

                <button type="button" className="flex flex-col items-center text-sm text-gray-600">
                    <span className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">📞</span>
                    <span className="mt-1">Contact</span>
                </button>
            </div>
        </footer>
    );
}
