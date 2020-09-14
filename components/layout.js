import Navbar from './navbar';
import cookie from 'js-cookie';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => setIsLogged(cookie.get('token')));

    return (
        <>
            <Head>
                <title>Batidora FC</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {
                isLogged ?
                    <Navbar />
                    :
                    null
            }
            {children}
        </>
    )
}