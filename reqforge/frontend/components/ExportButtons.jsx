import api from '../services/api';

const ExportButtons = ({ projectId }) => {
    const downloadPDF = async () => {
        try {
            const response = await api.get(`/export/pdf/${projectId}`, {
                responseType: 'blob', // Important for binary data
            });

            // Create a blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Project_${projectId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error(err);
            alert('Failed to download PDF');
        }
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={downloadPDF}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm font-medium text-sm"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Export PDF
            </button>

            {/* Placeholders for future export types */}
            <button
                disabled
                className="flex items-center gap-2 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed text-sm"
                title="Coming Soon"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                CSV
            </button>
        </div>
    );
};

export default ExportButtons;
