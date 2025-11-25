import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import './styles/common.css';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-pastel text-gray-800">
                <Header />

                <main className="flex-1 overflow-auto p-4">
                    <div className="w-full px-0 sm:max-w-6xl sm:mx-auto sm:px-3">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                        </Routes>
                    </div>
                </main>

                <Footer />

                {/* ⭐ Simple copyright footer */}
                <div className="text-center text-xs text-gray-600 py-3">
                    © {new Date().getFullYear()} Hygienebites — All rights reserved.
                </div>
            </div>
        </Router>
    );
}