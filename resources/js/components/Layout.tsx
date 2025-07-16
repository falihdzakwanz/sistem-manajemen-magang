import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './NavBar';

interface LayoutProps {
    children: ReactNode;
    currentPage: 'beranda' | 'daftar-magang' | 'cek-status' | 'data-mahasiswa';
}

const Layout = ({ children, currentPage }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Navbar currentPage={currentPage} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
