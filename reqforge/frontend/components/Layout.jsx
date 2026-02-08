// import Sidebar from './Sidebar'; // Removed
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    if (isAuthPage) {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">

            {/* Sidebar - Fixed on Login */}
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>

                <footer className="bg-white border-t py-6">
                    <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} ReqForge • Empowering Development Teams
                    </div>
                </footer>
            </div>

        </div>
    );
};

export default Layout;
