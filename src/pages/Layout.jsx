import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = ({ onBookClick }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="bg-background min-h-screen text-white font-sans selection:bg-accent selection:text-black flex flex-col">
            <Navbar onBookClick={onBookClick} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer onBookClick={onBookClick} />
        </div>
    );
};

export default Layout;
