import React from 'react';
import Footer from '../components/Footer';
import App from './index.js'

const Layout = ({ Component, pageProps }) => (
    <div>
        <header>
            {/* Your header here */}
        </header>
        <main><Component {...pageProps} /></main>
        <Footer />
    </div>
);

export default Layout;

