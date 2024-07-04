import QuotesContainer from '@/components/cotizaciones/Quotes.container'
import Navbar from '@/components/navbar/Navbar'
import PaginaEnConstruccion from '@/utils/PaginaEnConstruccion'

export default function page() {
    return (
        <section>
            <div className='sticky top-0 left-0 z-20'>
                <Navbar />
                <QuotesContainer />
            </div>
            <PaginaEnConstruccion />
        </section>
    )
}
