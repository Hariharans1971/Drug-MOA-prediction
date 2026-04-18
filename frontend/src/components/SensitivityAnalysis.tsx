import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

interface Gene {
    name: string;
    score: number;
}

interface SensitivityAnalysisProps {
    topGenes: Gene[];
    onSimulate: (data: Gene[]) => void;
}

const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ topGenes, onSimulate }) => {
    const [genes, setGenes] = useState(topGenes);

    const handleSliderChange = (idx: number, newVal: number) => {
        const updated = [...genes];
        updated[idx].score = newVal;
        setGenes(updated);
        onSimulate(updated);
    };

    return (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Sliders className="text-orange-500" size={20} />
                <h3 className="text-lg font-semibold text-white">Sensitivity Simulator</h3>
            </div>

            <div className="space-y-4">
                {genes.slice(0, 5).map((gene, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-300 font-mono">{gene.name}</span>
                            <span className="text-neutral-500">{gene.score.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.1"
                            value={gene.score}
                            onChange={(e) => handleSliderChange(idx, parseFloat(e.target.value))}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4 text-xs text-neutral-500 italic border-t border-neutral-800 pt-3">
                Adjust gene expression levels to see varying MoA probabilities (Mock Simulation).
            </div>
        </div>
    );
};

export default SensitivityAnalysis;
