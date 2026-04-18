import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-6 mb-10"
            >
                <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                    <User size={40} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">{user?.email}</h2>
                    <p className="text-neutral-400">Researcher • Active Access ID</p>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-900/30">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-neutral-500 uppercase font-semibold">Email</label>
                            <div className="text-neutral-300">{user?.email}</div>
                        </div>
                        <div>
                            <label className="text-xs text-neutral-500 uppercase font-semibold">Role</label>
                            <div className="text-neutral-300">Administrator</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
