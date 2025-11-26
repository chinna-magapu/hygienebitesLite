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

    const offers = [
        {
            id: 1,
            title: "Fresh Apple Pack",
            description: "Juicy apples — special weekend offer!",
            discount: 20,
            image: "/images/apple.jpg"
        },
        {
            id: 2,
            title: "Green Leafy Veg Combo",
            description: "Spinach + Coriander Combo",
            discount: 15,
            image: "/images/leafy.jpg"
        },
        {
            id: 3,
            title: "Organic Banana Pack",
            description: "Sweet & organic bananas",
            discount: 10,
            image: "/images/banana.jpg"
        },
        {
            id: 4,
            title: "Seasonal Fruit Box",
            description: "Mixed fruits — Limited time",
            discount: 25,
            image: "/images/mixed.jpg"
        }
    ];

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

                {/* HOW IT WORKS – LEFT ALIGNED SIMPLE ROW */}
                <div className="mt-10">
                    <div className="bg-white rounded-xl card-shadow p-5 border border-gray-100">

                        <h3 className="text-lg font-semibold text-primary mb-4">
                            How it works
                        </h3>

                        <div className="flex flex-wrap items-center gap-4">

                            {/* STEP 1 (Combined) */}
                            <div className="flex flex-col items-center w-24 text-center">
                                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-xl shadow">
                                    🛒
                                </div>
                                <p className="mt-1 text-gray-700 text-sm font-medium">
                                    Browse & click on buy now
                                </p>
                            </div>

                            {/* Arrow */}
                            <span className="text-xl text-gray-400">➜</span>

                            {/* STEP 2 */}
                            <div className="flex flex-col items-center w-24 text-center">
                                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-xl shadow">
                                    📍
                                </div>
                                <p className="mt-1 text-gray-700 text-sm font-medium">
                                    Provide Address details
                                </p>
                            </div>

                            {/* Arrow */}
                            <span className="text-xl text-gray-400">➜</span>

                            {/* STEP 3 */}
                            <div className="flex flex-col items-center w-24 text-center">
                                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-xl shadow">
                                    ☎️
                                </div>
                                <p className="mt-1 text-gray-700 text-sm font-medium">
                                    We will connect with you
                                </p>
                            </div>

                            {/* Arrow */}
                            <span className="text-xl text-gray-400">➜</span>

                            {/* STEP 4 */}
                            <div className="flex flex-col items-center w-24 text-center">
                                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-xl shadow">
                                    🚚
                                </div>
                                <p className="mt-1 text-gray-700 text-sm font-medium">
                                    Deliver items to your address
                                </p>
                            </div>

                        </div>

                        {/* EXPLORE BUTTON – RIGHT ALIGNED */}
                        <div className="mt-6 flex justify-end">
                            <Link
                                to="/products"
                                className="
            inline-flex items-center
            bg-purple-600 
            text-white 
            px-5 py-2
            rounded-full 
            text-sm font-medium
            shadow-md
            hover:bg-purple-700 
            transition
        "
                            >
                                Explore Products
                            </Link>
                        </div>

                    </div>
                </div>

                {/* ⭐ SPECIAL OFFERS BLOCK — SNAP CAROUSEL WITH ARROWS */}
                <div className="mt-10">
                    <div className="bg-white rounded-xl card-shadow p-5 border border-gray-100">

                        {/* HEADER + SEE ALL */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary">Special Offers Just For You</h3>
                            <Link to="/offers" className="text-purple-600 text-sm font-medium hover:underline">
                                See all
                            </Link>
                        </div>

                        {/* ARROWS + CAROUSEL */}
                        <div className="relative">

                            {/* LEFT ARROW */}
                            <button
                                className="
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-purple-600 text-white p-2 rounded-full shadow
          hidden sm:flex
        "
                                onClick={() => {
                                    const el = document.getElementById("offers-carousel");
                                    el.scrollBy({ left: -250, behavior: "smooth" });
                                }}
                            >
                                ‹
                            </button>

                            {/* RIGHT ARROW */}
                            <button
                                className="
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-purple-600 text-white p-2 rounded-full shadow
          hidden sm:flex
        "
                                onClick={() => {
                                    const el = document.getElementById("offers-carousel");
                                    el.scrollBy({ left: 250, behavior: "smooth" });
                                }}
                            >
                                ›
                            </button>

                            {/* SNAP CAROUSEL */}
                            <div
                                id="offers-carousel"
                                className="
          flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1
          scroll-smooth snap-x snap-mandatory
        "
                            >
                                {offers.map((offer) => (
                                    <div
                                        key={offer.id}
                                        className="
              w-[70%] sm:w-[32%]
              bg-white rounded-lg shadow p-3 border border-gray-100
              flex-shrink-0 snap-center
            "
                                    >
                                        {/* Image */}
                                        <div className="w-full h-28 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Title */}
                                        <p className="mt-2 text-sm font-semibold text-gray-800">{offer.title}</p>

                                        {/* Description */}
                                        <p className="text-xs text-gray-600 mt-1">{offer.description}</p>

                                        {/* Discount */}
                                        <div className="mt-2 inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                            {offer.discount}% OFF
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
