import React, { useState } from 'react';
import { Upload, FileText, Play, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Predict: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handlePredict = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // In a real scenario, we would post to the backend`
            // const response = await axios.post('http://localhost:8000/api/predict/moa', formData);
            // For now, let's verify connectivity or mock it if backend isn't ready

            const response = await axios.post('http://127.0.0.1:8000/api/predict/moa', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            // Navigate to results with state
            navigate('/results', { state: { data: response.data } });

        } catch (err: any) {
            console.error(err);
            const status = err.response ? err.response.status : 'Network Error';
            const url = 'http://127.0.0.1:8000/api/predict/moa';
            setError(`Failed to connect to backend (${url}). Status: ${status}. Ensure backend is running on Port 8000.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-3xl font-bold text-white mb-6">Mechanism of Action Prediction</h2>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">1. Upload Gene Expression Data</h3>

                <div className="relative border-2 border-dashed border-neutral-700 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-neutral-900 transition-colors">
                    <input
                        type="file"
                        accept=".csv,.txt,.tsv"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={48} className={`mb-4 ${file ? 'text-green-500' : 'text-neutral-500'}`} />
                    {file ? (
                        <div>
                            <p className="text-lg text-white font-medium">{file.name}</p>
                            <p className="text-sm text-green-500 mt-2 flex items-center justify-center gap-2">
                                <CheckCircle size={14} /> Ready for analysis
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-lg text-neutral-300 font-medium">Drag & drop your CSV/TSV file here</p>
                            <p className="text-sm text-neutral-500 mt-2">Supports LINCS L1000 format</p>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-900/50 flex items-center gap-3 text-red-200">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={handlePredict}
                    disabled={!file || loading}
                    className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
            ${!file || loading
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-neutral-200'}
          `}
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Play size={18} />
                            Run Prediction
                        </>
                    )}
                </button>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => {
                        // Create a dummy file object
                        const dummyContent = "gene1,gene2,gene3\n1.0,2.0,3.0";
                        const dummyFile = new File([dummyContent], "demo_l1000_sample.csv", { type: "text/csv" });
                        setFile(dummyFile);
                    }}
                    className="text-sm text-neutral-500 hover:text-white underline transition-colors"
                >
                    Don't have a file? Load Demo Data
                </button>
            </div>
        </div>
    );
};

export default Predict;
