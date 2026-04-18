import React from 'react';
import { Tooltip, ResponsiveContainer, ScatterChart, XAxis, YAxis, Scatter, Cell } from 'recharts';

interface HeatmapProps {
    data: { gene: string; value: number }[];
}

const HeatmapVisualization: React.FC<HeatmapProps> = ({ data }) => {
    // Transform flat list into a grid (10x10 or similar) for visualization
    // This is a "mock" heatmap using scatter plot to simulate grid cells
    const gridSize = Math.ceil(Math.sqrt(data.length));

    const gridData = data.slice(0, 100).map((item, index) => ({
        ...item,
        x: index % 10, // 10 columns
        y: Math.floor(index / 10), // Rows
        z: item.value // Color intensity
    }));

    return (
        <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-neutral-900 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0.5 p-1">
                {gridData.map((cell, i) => (
                    <div
                        key={i}
                        className="relative group transition-all hover:scale-110 hover:z-10 hover:border hover:border-white"
                        style={{
                            backgroundColor: `rgba(59, 130, 246, ${0.1 + cell.z})`, // Blue gradient based on value
                        }}
                    >
                        {/* Tooltip */}
                        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none">
                            {cell.gene}: {cell.value.toFixed(3)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-neutral-500">
                Top 100 Genes Expression
            </div>
        </div>
    );
};

export default HeatmapVisualization;
