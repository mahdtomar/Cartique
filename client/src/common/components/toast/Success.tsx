'use client';

import { toast } from 'sonner';

export default function Success() {
    return (
        <button
            className="toast-button"
            onClick={() => {
                toast.success('This is a success toast');
            }}
        >
            Render toast
        </button>
    );
}