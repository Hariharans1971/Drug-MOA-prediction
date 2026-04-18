import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, FileText, ArrowRight, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Session {
    id: number;
    filename: string;
    predicted_moa: string;
    confidence: number;
    timestamp: string;
    details: any;
}

const History: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/history/');
            setSessions(res.data);
        } catch (err) {
            console.error("Failed to fetch history", err);
        } finally {
            setLoading(false);
        }
    };

    const loadSession = (session: Session) => {
        navigate('/results', {
            state: {
                data: {
                    moa_probabilities: session.details.probabilities,
                    top_driver_genes: session.details.genes
                }
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto py-10">
            <div className="flex items-center gap-4 mb-8">
                <Database size={32} className="text-blue-500" />
                <h2 className="text-3xl font-bold text-white">Research History</h2>
            </div>

            {loading ? (
                <div className="text-neutral-500">Loading archives...</div>
            ) : sessions.length === 0 ? (
                <div className="p-10 border border-neutral-800 rounded-xl bg-neutral-900/30 text-center text-neutral-400">
                    No past analyses found. Run a prediction to start building your research database.
                </div>
            ) : (
                <div className="grid gap-4">
                    {sessions.map((session, idx) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => loadSession(session)}
                            className="group flex items-center justify-between p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-700 cursor-pointer transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg">{session.filename}</h4>
                                    <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {new Date(session.timestamp).toLocaleDateString()}
                                        </span>
                                        <span className="bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                                            ID: #{session.id}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Prediction</div>
                                    <div className="text-green-400 font-medium">{session.predicted_moa}</div>
                                </div>

                                <div className="text-right w-24">
                                    <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Confidence</div>
                                    <div className="text-white font-medium">{(session.confidence * 100).toFixed(1)}%</div>
                                </div>

                                <div className="p-2 rounded-full border border-neutral-700 text-neutral-500 group-hover:border-white group-hover:text-white transition-all">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
