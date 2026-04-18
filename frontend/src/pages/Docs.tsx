import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Database, Layers } from 'lucide-react';

const Docs: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
                        <BookOpen size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Documentation</h2>
                </div>
                <p className="text-neutral-400 text-lg leading-relaxed">
                    The MoA-XFormer is a deep learning platform designed to predict the Mechanism of Action (MoA) of drugs based on gene expression profiles (L1000 dataset).
                </p>
            </motion.div>

            {/* Architecture Section */}
            <section className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Layers className="text-blue-500" />
                    <h3 className="text-2xl font-bold text-white">System Architecture</h3>
                </div>

                <div className="space-y-6 text-neutral-300">
                    <p>
                        The core model utilizes a <strong>Transformer-based TabNet architecture</strong> with multi-head self-attention mechanisms to capture non-linear relationships between 978 landmark genes.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                        <li><strong>Input Layer:</strong> Accepts 1000-float vectors representing gene expression signature (Part 1 - Part 5).</li>
                        <li><strong>Attention Block:</strong> 4-head attention mechanism to weight gene importance dynamically.</li>
                        <li><strong>Classification Head:</strong> Dense layers predicting probabilities for 206 distinct MoA classes.</li>
                    </ul>
                </div>
            </section>

            {/* Dataset Section */}
            <section className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Database className="text-orange-500" />
                    <h3 className="text-2xl font-bold text-white">Data Sources</h3>
                </div>

                <div className="space-y-4 text-neutral-300">
                    <p>
                        Training data was sourced from the <strong>LINCS L1000 project</strong>, hosted on the NIH integrated Network-based Cellular Signatures (iNCS) database.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-black/40 p-4 rounded-lg">
                            <div className="text-xs text-neutral-500 uppercase font-semibold">Training Samples</div>
                            <div className="text-xl font-mono text-white">23,814</div>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg">
                            <div className="text-xs text-neutral-500 uppercase font-semibold">Landmark Genes</div>
                            <div className="text-xl font-mono text-white">978</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Reference */}
            <section className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Code className="text-purple-500" />
                    <h3 className="text-2xl font-bold text-white">API Reference</h3>
                </div>

                <div className="space-y-6">
                    <div className="border border-neutral-800 rounded-lg overflow-hidden">
                        <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-3">
                            <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/20">POST</span>
                            <code className="text-sm text-neutral-300">/api/predict/moa</code>
                        </div>
                        <div className="p-4 bg-neutral-950">
                            <p className="text-sm text-neutral-500 mb-2">Payload (Multipart Form Data):</p>
                            <pre className="text-xs text-neutral-400 font-mono">file: [binary_csv_data]</pre>

                            <p className="text-sm text-neutral-500 mt-4 mb-2">Response (JSON):</p>
                            <pre className="text-xs text-neutral-400 font-mono">
                                {`{
  "moa_probabilities": {
    "EGFR inhibitor": 0.98,
    "Other": 0.02
  },
  "top_driver_genes": [
    { "gene": "TP53", "score": 0.85 }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Docs;
