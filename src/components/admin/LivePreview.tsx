'use client'

import { useState, useEffect } from 'react'

export default function LivePreview() {
    const [key, setKey] = useState(0)

    // Listen for custom events to refresh the preview
    useEffect(() => {
        const handleRefresh = () => {
            setKey(prev => prev + 1)
        }

        window.addEventListener('preview-refresh', handleRefresh)
        return () => window.removeEventListener('preview-refresh', handleRefresh)
    }, [])

    return (
        <iframe
            key={key}
            src="/"
            style={{
                flex: 1,
                width: '100%',
                border: 'none',
                backgroundColor: '#050505'
            }}
            title="Live Preview"
        />
    )
}
