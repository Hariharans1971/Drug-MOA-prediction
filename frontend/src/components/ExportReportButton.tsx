import React from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportButtonProps {
    targetId: string;
    filename?: string;
}

const ExportReportButton: React.FC<ExportButtonProps> = ({ targetId, filename = 'report' }) => {
    const handleExport = async () => {
        const input = document.getElementById(targetId);
        if (!input) {
            console.error(`Element with id ${targetId} not found`);
            return;
        }

        // Wait for potential images (like Recharts) to rendering
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#0a0a0a' // Force dark background matching theme
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.setTextColor(40);
            pdf.setFontSize(18);
            pdf.text("MoA-XFormer Analysis Report", 10, 15);

            pdf.setFontSize(11);
            pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 22);

            let heightLeft = imgHeight;
            let position = 30;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${filename}.pdf`);
        } catch (err) {
            console.error("Export failed", err);
        }
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
        >
            <Download size={16} /> Export PDF
        </button>
    );
};

export default ExportReportButton;
