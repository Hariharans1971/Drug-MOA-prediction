import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Dna, Activity, FileText, History as HistoryIcon, LayoutDashboard, Files, GitCompare, BarChart2, BookOpen, Settings, Network, Globe, Search, Menu } from 'lucide-react';

const Layout: React.FC = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<any[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            const results = navItems.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const navItems = [
        { name: 'Home', path: '/', icon: Dna },
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Predict', path: '/predict', icon: Activity },
        { name: 'Batch Mode', path: '/batch', icon: Files },
        { name: 'Results', path: '/results', icon: FileText },
        { name: 'Compare', path: '/compare', icon: GitCompare },
        { name: 'Gene Network', path: '/network', icon: Network },
        { name: 'Global Insights', path: '/insights', icon: Globe },
        { name: 'History', path: '/history', icon: HistoryIcon },
        { name: 'Metrics', path: '/metrics', icon: BarChart2 },
        { name: 'Docs', path: '/docs', icon: BookOpen },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans selection:bg-neutral-800">
            {/* Sidebar - Desktop */}
            <nav className="w-64 border-r border-neutral-800 bg-neutral-950 hidden md:flex flex-col p-6 fixed h-full z-10">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-lg">M</div>
                    <h1 className="text-xl font-bold tracking-tight">MoA-XFormer</h1>
                </div>

                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                                            ? 'bg-neutral-100 text-black font-medium'
                                            : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}
                  `}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto pt-6 border-t border-neutral-900">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold border border-green-500/30">
                                    {user.email[0].toUpperCase()}
                                </div>
                                <div className="text-xs truncate max-w-[120px]">
                                    <div className="text-white font-medium truncate">{user.email}</div>
                                    <div className="text-neutral-500">Researcher</div>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-xs text-neutral-400 hover:text-white flex items-center gap-2 hover:bg-neutral-900 py-2 px-2 rounded transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="text-xs text-neutral-500">
                            Guest Mode
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                {/* Header */}
                <header className="h-16 border-b border-neutral-800 bg-black/50 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-neutral-400 hover:text-white">
                            <Menu size={24} />
                        </button>

                        <div className="relative w-full max-w-md hidden md:block group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-green-500 transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search pages... (e.g. 'Network')"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm text-neutral-300 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-neutral-600"
                            />

                            {/* Search Dropdown */}
                            {searchResults.length > 0 && searchQuery && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl z-50">
                                    {searchResults.map((result, idx) => (
                                        <Link
                                            key={idx}
                                            to={result.path}
                                            onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors"
                                        >
                                            <result.icon size={16} className="text-neutral-400" />
                                            <span className="text-sm text-white">{result.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Profile Dropdown (Simplified) */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold border border-green-500/30">
                            {user?.email?.[0].toUpperCase() || 'U'}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
