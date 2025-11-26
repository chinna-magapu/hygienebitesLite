import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddressModal({ visible, product, onClose }) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [interested, setInterested] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);

    useEffect(() => {
        if (!visible) {
            setName("");
            setMobile("");
            setAddress("");
            setQuantity("1");
            setInterested("");
            setErrorMsg("");
            setLoading(false);
            setShowThankYou(false);
        }
    }, [visible]);

    if (!visible) return null;

    const API_URL = "https://pnr11lzc50.execute-api.us-east-1.amazonaws.com/prod/order";

    const submitOrder = async () => {
        if (!name || !mobile || !address) {
            setErrorMsg("Please fill all required fields");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        const payload = {
            productName: product?.name || "",
            quantity,
            customerName: name,
            contactNumber: mobile,
            address,
            productsInterestedIn: interested
        };

        try {
            await axios.post(API_URL, payload, {
                headers: { "Content-Type": "application/json" }
            });

            setLoading(false);
            setShowThankYou(true);

            setTimeout(() => {
                setShowThankYou(false);
                onClose();
            }, 1500);

        } catch (err) {
            setLoading(false);
            setErrorMsg("Order failed. Please try again.");
        }
    };

    return (
        <>
            {/* BACKDROP WITH FADE */}
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fadeIn"></div>

            {/* MODAL SLIDE UP */}
            <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none animate-slideUp">

                {/* MODAL CONTENT WITH POP ANIMATION */}
                <div className="bg-white w-full rounded-t-2xl max-h-[90vh] flex flex-col shadow-xl animate-popIn pointer-events-auto">

                    {/* THANK YOU OVERLAY */}
                    {showThankYou && (
                        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 z-50 animate-popIn">
                            <h2 className="text-xl font-semibold text-purple-600">Thank You!</h2>
                            <p className="text-gray-600 mt-2 text-center">
                                Your order has been received.
                                We will contact you shortly.
                            </p>
                        </div>
                    )}

                    {/* HEADER */}
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Delivery Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-600 bg-purple-50 rounded-md px-3 py-1"
                        >
                            Close
                        </button>
                    </div>

                    {/* SCROLL SECTION */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">

                        {errorMsg && (
                            <p className="text-red-600 bg-red-50 p-2 rounded text-sm">
                                {errorMsg}
                            </p>
                        )}

                        <div>
                            <label className="text-sm text-gray-600">Selected Product</label>
                            <input
                                readOnly
                                value={product?.name || ""}
                                className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Your Name *</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Mobile Number *</label>
                            <input
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Full Address *</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Other products you want</label>
                            <input
                                value={interested}
                                onChange={(e) => setInterested(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                                placeholder="e.g. fruits, vegetables"
                            />
                        </div>
                    </div>

                    {/* BOTTOM BUTTON */}
                    <div className="p-4 border-t bg-white">
                        <button
                            onClick={submitOrder}
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-medium disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit Order"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}