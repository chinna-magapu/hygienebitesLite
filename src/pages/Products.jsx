import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AddressModal from '../components/AddressModal';
import '../styles/common.css';
import useProducts from '../Hooks/useProducts/useProducts';

export default function Products() {
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [localData, setLocalData] = useState({
        products: [],
        categories: {},
    });

    const location = useLocation();
    const [productsPageData, getProducts] = useProducts();

    // Fetch products safely
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                if (data) {
                    setLocalData({
                        products: data.products || [],
                        categories: data.categories || {},
                    });
                }
            } catch (err) {
                console.error('Failed to fetch products', err);
            }
        };

        // Only fetch if productsPageData is missing or empty
        if (!productsPageData || !productsPageData.products?.length) {
            fetchData();
        } else {
            setLocalData({
                products: productsPageData.products || [],
                categories: productsPageData.categories || {},
            });
        }
    }, [productsPageData, getProducts]);

    const { products, categories } = localData;

    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    const filtered = category
        ? products.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase())
        : products;

    const categoryTitle = category ? (categories[category]?.name || category) : null;

    function openModal(product) {
        setSelected(product);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setSelected(null);
    }

    function handleContinue(data) {
        console.log('Continue with', data);
        closeModal();
        alert('Order placed (demo) — check console for details');
    }

    return (
        <div className="w-full sm:max-w-4xl sm:mx-auto sm:px-0 px-0">
            <section className="py-4 pb-20">
                {/* Breadcrumb */}
                <div className="mb-3 text-sm text-gray-600 flex items-center gap-2 px-3 sm:px-0">
                    <Link to="/" className="text-purple-600 hover:underline">Home</Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-800 font-medium">
                        {category ? categoryTitle : 'All Products'}
                    </span>
                </div>

                <h2 className="text-xl font-semibold text-primary px-3 sm:px-0">
                    {category ? `${categoryTitle} Products` : 'Products'}
                </h2>

                <p className="text-sm text-gray-600 mt-1 px-3 sm:px-0">
                    Tap a product to order.
                </p>

                {/* PRODUCT GRID */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-0">
                    {filtered.length ? (
                        filtered.map((p) => (
                            <div
                                key={p.id}
                                className="w-full transform transition hover:scale-[1.03] active:scale-[0.97] hover:shadow-lg rounded-xl"
                            >
                                <ProductCard
                                    product={p}
                                    onClick={openModal}
                                    onBuy={openModal}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 col-span-full">
                            There are no products available in this category.
                        </div>
                    )}
                </div>
            </section>

            <AddressModal
                visible={modalOpen}
                product={selected}
                onClose={closeModal}
                onContinue={handleContinue}
            />
        </div>
    );
}