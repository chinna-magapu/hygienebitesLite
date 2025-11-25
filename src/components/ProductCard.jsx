import React from 'react';
import '../styles/common.css';

export default function ProductCard({ product, onClick, onBuy }) {
    return (
        <div
            onClick={() => onClick && onClick(product)}
            className="
                cursor-pointer bg-white rounded-lg card-shadow overflow-hidden
                h-64 flex flex-col
                transform transition duration-150 hover:shadow-lg hover:scale-105
                w-full
            "
        >
            {/* Image area */}
            <div className="basis-[70%] bg-gray-100 relative w-full h-80 flex items-center justify-center overflow-hidden">
                {/* Image container */}
                <img
                    src={product.images && product.images.length ? product.images[0] : null}
                    alt={product.name}
                    className="w-full h-full object-contain"
                />

                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded text-xs text-gray-700 shadow">
                    4.5 ★
                </div>
            </div>

            {/* Details */}
            <div className="basis-[30%] p-2 sm:p-3 flex flex-col justify-between w-full">

                <div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        {product.description}
                    </p>
                </div>

                <div className="mt-2 flex items-center gap-2 w-full">
                    {product.stock > 0 ? (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onBuy && onBuy(product); }}
                                className="flex-1 bg-primary text-white text-xs sm:text-sm py-2 rounded-md"
                            >
                                Order Now
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); onBuy && onBuy(product); }}
                                className="px-2 sm:px-3 py-2 border border-gray-200 rounded-md text-xs sm:text-sm text-gray-700"
                            >
                                Order Now
                            </button>
                        </>
                    ) : (
                        <button
                            className="w-full bg-gray-200 text-gray-500 text-sm py-2 rounded-md"
                            disabled
                        >
                            OUT OF STOCK
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}