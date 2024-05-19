import QuotesContainer from '@/components/cotizaciones/Quotes.container'
import ContainerHome from '@/components/home/Container.home'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function page() {
    return (
        <div>
            <Navbar />
            <QuotesContainer />
            <ContainerHome />
        </div>
    )
}
