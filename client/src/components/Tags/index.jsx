import React from 'react'
import './style.css'

export default function Tags({ type, title }) {
    return (
        <>
            {type === "approved" && <span class="tag approved">{title}</span>}
        </>
    )
}
