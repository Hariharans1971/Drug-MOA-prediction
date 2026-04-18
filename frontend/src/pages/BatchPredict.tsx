import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Files, Upload, CheckCircle } from 'lucide-react';

const BatchPredict: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleUpload = async () => {
        if (files.length === 0) return;
        setUploading(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            // Note: In a real environment, use an auth token here if needed
            // For now assuming public or simple header
            const token = localStorage.getItem('token');
            const res = await fetch('http://127.0.0.1:8000/api/predict/batch', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                setResults(data.results);
                setFiles([]); // Clear queue
            }
        } catch (err) {
            console.error("Batch upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                        <Files size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Batch Prediction</h2>
                </div>
                <p className="text-neutral-400 ml-14">High-throughput screening mode. Upload multiple gene expression profiles (CSV/TSV/ZIP) for batch processing.</p>
            </motion.div>

            {/* Results Section */}
            {results.length > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6">
                    <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20} /> Processing Complete</h3>
                    <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-neutral-500 text-sm border-b border-green-500/20">
                                    <th className="pb-2">File</th>
                                    <th className="pb-2">Predicted MoA</th>
                                    <th className="pb-2 text-right">Confidence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r, i) => (
                                    <tr key={i} className="border-b border-green-500/10 last:border-0 hover:bg-green-500/5 transition-colors">
                                        <td className="py-3 px-2 text-white font-medium">{r.filename}</td>
                                        <td className="py-3 px-2 text-green-300 font-mono">{r.predicted_moa}</td>
                                        <td className="py-3 px-2 text-right text-green-400 font-bold">{(r.confidence * 100).toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Upload Zone */}
            <div
                className={`
                    border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
                    ${dragActive
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-neutral-800 bg-neutral-900/30 hover:border-neutral-700'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-400">
                    <Upload size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Drag & Drop Files Here</h3>
                <p className="text-neutral-500 mb-6">or click to browse from your computer</p>
                <div className="relative">
                    <input
                        type="file"
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                            if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)])
                        }}
                    />
                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors pointer-events-none">
                        Select Files
                    </button>
                </div>
                <p className="text-xs text-neutral-600 mt-4">Supported: .csv, .tsv, .txt, .zip (Max 50MB)</p>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-neutral-800 bg-neutral-900/80 flex justify-between items-center">
                        <h4 className="font-semibold text-white">Upload Queue ({files.length})</h4>
                        <button
                            className="text-xs text-red-400 hover:text-red-300"
                            onClick={() => setFiles([])}
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {files.map((file, idx) => (
                            <div key={idx} className="p-3 border-b border-neutral-800/50 flex items-center justify-between last:border-0 hover:bg-neutral-800/30">
                                <div className="flex items-center gap-3">
                                    <div className="text-neutral-500"><Files size={16} /></div>
                                    <span className="text-sm text-neutral-300">{file.name}</span>
                                    <span className="text-xs text-neutral-600">({(file.size / 1024).toFixed(1)} KB)</span>
                                </div>
                                <div className="text-neutral-500">
                                    <div className="w-4 h-4 border-2 border-neutral-700 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-neutral-900/80 border-t border-neutral-800 flex justify-end">
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? 'Processing...' : (
                                <>Start Processing <CheckCircle size={16} /></>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BatchPredict;
