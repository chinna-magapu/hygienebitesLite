import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import { PRODUCTS } from '../data/products';
import useProducts from '../Hooks/useProducts/useProducts';

export default function Home() {

    const [productsPageData, getProducts] = useProducts();
    const { products,
        categories,
        selCat,
        isLoading,
        error } = productsPageData;

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div className="max-w-3xl mx-auto">
            <section className="py-4">
                <h2 className="text-2xl font-semibold text-primary">Welcome to HygieneBites</h2>
                <p className="mt-2 text-gray-600">Healthy small choices for everyday living. Browse our products and get them delivered.</p>

                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Browse by category</h3>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                        {
                            categories.filter((c) => c.enable)
                                .sort((a, b) => a.order - b.order)
                                .map((c) => {
                                    const to = c.name === 'all' ? '/products' : `/products?category=${encodeURIComponent(c.name)}`;

                                    return (
                                        <Link
                                            key={c.id}
                                            to={to}
                                            className="flex items-start gap-3 p-3 rounded-lg bg-white card-shadow"
                                        >
                                            <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center text-lg">
                                                <span aria-hidden>{c.emoji}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm font-semibold text-gray-800 capitalize">{c.name}</div>
                                                    <div className="text-xs text-gray-500">{c.count}</div>
                                                </div>
                                                {c.desc && <div className="text-xs text-gray-500">{c.desc}</div>}
                                            </div>
                                        </Link >
                                    );
                                })}
                    </div>
                </div>
            </section>
        </div>
    );
}
