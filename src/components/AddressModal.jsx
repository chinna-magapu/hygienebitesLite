import React, { useState, useEffect } from 'react';

export default function AddressModal({ visible, product, onClose, onContinue }) {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (!visible) {
            setName('');
            setMobile('');
            setAddress('');
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black bg-opacity-40">
            <div className="w-full h-full bg-white rounded-t-xl p-4 overflow-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Delivery Address</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 bg-purple-50 rounded-md px-3 py-1"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Mobile</label>
                        <input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="Phone number"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            rows={4}
                            placeholder="Full delivery address"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={() => onContinue && onContinue({ name, mobile, address, product })}
                            className="w-full bg-primary text-white py-2 rounded-md"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
