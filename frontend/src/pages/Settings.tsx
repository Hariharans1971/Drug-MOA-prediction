import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Moon, Shield, Database } from 'lucide-react';

const Settings: React.FC = () => {
    // Load initial state from localStorage or default
    const [toggles, setToggles] = useState(() => {
        const saved = localStorage.getItem('appSettings');
        return saved ? JSON.parse(saved) : {
            darkMode: true,
            emailNotifs: false,
            publicProfile: false,
            autoSave: true
        };
    });

    // Save to localStorage whenever toggles change
    React.useEffect(() => {
        localStorage.setItem('appSettings', JSON.stringify(toggles));
        // Apply Dark Mode immediately (mock implementation involves toggling class on body if needed)
        // document.body.classList.toggle('dark', toggles.darkMode); 
    }, [toggles]);

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const clearData = () => {
        if (window.confirm('Are you sure? This will delete all your local history and cached predictions.')) {
            // Keep token and settings, clear others if we had specific keys
            // For now, let's just pretend to clear "history" mock
            // In a real app with localStorage based history: localStorage.removeItem('history');
            alert('Local cache cleared.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-neutral-700/30 text-neutral-300">
                        <SettingsIcon size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">System Settings</h2>
                </div>
                <p className="text-neutral-400 ml-14">Configure your workspace preferences.</p>
            </motion.div>

            <div className="space-y-6">
                {/* Appearance Group */}
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Moon size={18} /> Appearance
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-medium">Dark Mode</h4>
                                <p className="text-sm text-neutral-500">Enable high-contrast dark theme (Cyber-Bio)</p>
                            </div>
                            <div
                                onClick={() => toggle('darkMode')}
                                className={`w-12 h-6 rounded-full border relative cursor-pointer transition-colors ${toggles.darkMode ? 'bg-green-500/20 border-green-500' : 'bg-neutral-800 border-neutral-700'}`}
                            >
                                <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${toggles.darkMode ? 'right-1 bg-green-500' : 'left-1 bg-neutral-600'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications Group */}
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Bell size={18} /> Notifications
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-medium">Email Alerts</h4>
                                <p className="text-sm text-neutral-500">Receive alerts when long-running jobs complete</p>
                            </div>
                            <div
                                onClick={() => toggle('emailNotifs')}
                                className={`w-12 h-6 rounded-full border relative cursor-pointer transition-colors ${toggles.emailNotifs ? 'bg-green-500/20 border-green-500' : 'bg-neutral-800 border-neutral-700'}`}
                            >
                                <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${toggles.emailNotifs ? 'right-1 bg-green-500' : 'left-1 bg-neutral-600'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Group */}
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Shield size={18} /> Privacy & Data
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-medium">Make Profile Public</h4>
                                <p className="text-sm text-neutral-500">Allow other researchers to find your ID</p>
                            </div>
                            <div
                                onClick={() => toggle('publicProfile')}
                                className={`w-12 h-6 rounded-full border relative cursor-pointer transition-colors ${toggles.publicProfile ? 'bg-green-500/20 border-green-500' : 'bg-neutral-800 border-neutral-700'}`}
                            >
                                <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all ${toggles.publicProfile ? 'right-1 bg-green-500' : 'left-1 bg-neutral-600'}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                            <div>
                                <h4 className="text-white font-medium text-red-400">Clear Local History</h4>
                                <p className="text-sm text-neutral-500">Remove all cached prediction results from this device</p>
                            </div>
                            <button onClick={clearData} className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm transition-colors">
                                Clear Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
