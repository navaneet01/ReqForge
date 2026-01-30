import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate(token ? '/dashboard' : '/')}>
                        <span className="text-white text-2xl font-bold tracking-wider">
                            Req<span className="text-indigo-200">Forge</span> ⚡
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-4">
                        {token ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition ${isActive('/dashboard') ? 'bg-indigo-700' : ''}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/create"
                                    className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition ${isActive('/create') ? 'bg-indigo-700' : ''}`}
                                >
                                    New Project
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-bold hover:bg-gray-100 transition shadow-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="text-indigo-200 text-sm">Welcome to Intelligent SRS Generation</div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
