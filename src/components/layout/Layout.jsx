import React from 'react'
import Header from './Header'
import Footer from './Footer'


const Layout = (props) => {
    return (
        <>
            <Header />
            <main className='main_container'>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Layout