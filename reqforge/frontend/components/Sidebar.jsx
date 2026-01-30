import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/create', label: 'New Project', icon: '➕' },
        // { path: '/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-[calc(100vh-64px)] fixed top-16 left-0 overflow-y-auto">
            <div className="p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-6 mt-auto border-t border-gray-100">
                <div className="bg-indigo-50 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-indigo-900">Need Help?</h4>
                    <p className="text-xs text-indigo-700 mt-1">Check our documentation for writing better requirements.</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
