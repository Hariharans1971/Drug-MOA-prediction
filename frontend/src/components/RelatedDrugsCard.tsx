import React from 'react';
import { Pill, ExternalLink } from 'lucide-react';

interface RelatedDrugsCardProps {
    moaClass: string;
}

// Mock Knowledge Base
const DRUG_KB: Record<string, string[]> = {
    "Kinase inhibitor": ["Imatinib", "Dasatinib", "Sunitinib", "Gefitinib"],
    "DNA synthesis inhibitor": ["Methotrexate", "Fluorouracil", "Gemcitabine"],
    "Epigenetic regulator": ["Vorinostat", "Romidepsin", "Azacitidine"],
    "Metabolic inhibitor": ["Metformin", "Atorvastatin"],
    "Signal transduction blocker": ["Trametinib", "Vemurafenib"]
};

const RelatedDrugsCard: React.FC<RelatedDrugsCardProps> = ({ moaClass }) => {
    const drugs = DRUG_KB[moaClass] || ["No clinical drugs mapped for this MoA yet."];

    return (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Pill className="text-purple-500" size={20} />
                <h3 className="text-lg font-semibold text-white">FDA-Approved Drugs</h3>
            </div>

            <div className="space-y-3">
                {drugs.map((drug, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
                        <span className="text-neutral-300 font-medium">{drug}</span>
                        <a
                            href={`https://go.drugbank.com/drugs/${drug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-500 hover:text-purple-400 transition-colors"
                        >
                            <ExternalLink size={14} />
                        </a>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-xs text-neutral-500">
                *Based on MoA class mapping. Consult clinical databases for direct interactions.
            </div>
        </div>
    );
};

export default RelatedDrugsCard;
