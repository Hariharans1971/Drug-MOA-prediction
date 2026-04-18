import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const trainingData = [
    { epoch: 1, loss: 0.85, val_loss: 0.88 },
    { epoch: 2, loss: 0.65, val_loss: 0.70 },
    { epoch: 3, loss: 0.45, val_loss: 0.55 },
    { epoch: 4, loss: 0.35, val_loss: 0.48 },
    { epoch: 5, loss: 0.28, val_loss: 0.42 },
    { epoch: 6, loss: 0.22, val_loss: 0.39 },
    { epoch: 7, loss: 0.19, val_loss: 0.38 },
    { epoch: 8, loss: 0.17, val_loss: 0.39 },
];

const classPerformance = [
    { name: 'EGFR', precision: 0.92, recall: 0.88 },
    { name: 'Dopamine', precision: 0.85, recall: 0.82 },
    { name: 'Adrenergic', precision: 0.78, recall: 0.85 },
    { name: 'Bcl-2', precision: 0.95, recall: 0.91 },
    { name: 'PI3K', precision: 0.81, recall: 0.76 },
];

const ModelMetrics: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400">
                        <BarChart2 size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Model Metrics</h2>
                </div>
                <p className="text-neutral-400 ml-14">Technical validation of the XFormer Neural Network.</p>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-neutral-400 text-sm">Valid Accuracy</div>
                            <div className="text-3xl font-bold text-white mt-1">94.2%</div>
                        </div>
                        <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="text-xs text-green-400">+2.1% vs Baseline</div>
                </div>
                <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-neutral-400 text-sm">Macro F1-Score</div>
                            <div className="text-3xl font-bold text-white mt-1">0.89</div>
                        </div>
                        <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="text-xs text-neutral-500">Across 206 MoA Classes</div>
                </div>
                <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-neutral-400 text-sm">Log Loss</div>
                            <div className="text-3xl font-bold text-white mt-1">0.0145</div>
                        </div>
                        <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
                            <AlertTriangle size={20} />
                        </div>
                    </div>
                    <div className="text-xs text-green-400">-0.003 Improvement</div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Loss Curve */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Training vs Validation Loss</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trainingData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                                <XAxis dataKey="epoch" stroke="#525252" label={{ value: 'Epoch', position: 'insideBottomRight', offset: -5 }} />
                                <YAxis stroke="#525252" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="val_loss" stroke="#f97316" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Per Class Metrics */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Per-Class Precision & Recall</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={classPerformance} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                                <XAxis type="number" domain={[0, 1]} stroke="#525252" />
                                <YAxis dataKey="name" type="category" width={80} stroke="#a3a3a3" style={{ fontSize: '12px' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff' }}
                                    cursor={{ fill: '#262626' }}
                                />
                                <Legend />
                                <Bar dataKey="precision" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={10} />
                                <Bar dataKey="recall" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={10} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
import { Activity } from 'lucide-react';

export default ModelMetrics;
