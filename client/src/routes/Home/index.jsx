import React from 'react'
import HomeCard from 'components/HomeCard'
import Body from 'components/Layout/__test-Body__'

export default function Home() {
    document.title = "4rums | Home"
    return (
        <>
            <Body />
            <HomeCard />
        </>
    )
}
