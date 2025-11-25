import React from 'react';

export default function AccountModal({ visible, onClose }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-full max-w-md bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Account</h3>
                    <button onClick={onClose} className="text-gray-600 px-2 py-1">Close</button>
                </div>

                <div className="mt-4 text-sm text-gray-700">
                    <p className="mb-2">Signed in as <strong>guest@demo.com</strong></p>
                    <p className="mb-2">This is a stub account modal. Wire up auth or profile pages as needed.</p>
                    <div className="mt-4">
                        <button className="w-full bg-primary text-white py-2 rounded-md">Go to Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
