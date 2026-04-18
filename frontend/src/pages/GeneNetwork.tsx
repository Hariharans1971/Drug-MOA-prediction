import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Network, Info } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, Legend } from 'recharts';

const mockNetworkData = [
    { x: 10, y: 30, z: 200, name: 'EGFR', type: 'Target' },
    { x: 30, y: 200, z: 150, name: 'AKT1', type: 'Target' },
    { x: 45, y: 100, z: 180, name: 'TP53', type: 'Gene' },
    { x: 50, y: 400, z: 120, name: 'MYC', type: 'Gene' },
    { x: 70, y: 150, z: 250, name: 'BCL2', type: 'target' },
    { x: 100, y: 250, z: 100, name: 'Drug_A', type: 'Compound' },
    { x: 120, y: 100, z: 140, name: 'Drug_B', type: 'Compound' }
];

const GeneNetwork: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400">
                        <Network size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Interactome Network</h2>
                </div>
                <p className="text-neutral-400 ml-14">Explore drug-target-gene interaction networks.</p>
            </motion.div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 h-[600px] relative">
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Gene</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> Target</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Drug</span>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis type="number" dataKey="x" name="stature" hide />
                        <YAxis type="number" dataKey="y" name="weight" hide />
                        <ZAxis type="number" dataKey="z" range={[100, 500]} />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            wrapperStyle={{ zIndex: 100 }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-xl">
                                            <p className="text-white font-bold">{data.name}</p>
                                            <p className="text-xs text-neutral-400 capitalize">{data.type}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter name="Nodes" data={mockNetworkData} fill="#8884d8">
                            {mockNetworkData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={
                                    entry.type === 'Gene' ? '#3b82f6' :
                                        entry.type === 'Target' ? '#22c55e' : '#a855f7'
                                } />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                <div className="absolute bottom-6 left-6 max-w-sm">
                    <div className="p-4 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-xl">
                        <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                            <Info size={16} className="text-blue-400" /> Network Insights
                        </h4>
                        <p className="text-sm text-neutral-400">
                            This graph visualizes the predicted interaction pathways.
                            <strong> Drug_A</strong> shows strong affinity for the <strong>BCL2</strong> target cluster.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneNetwork;
