import api from '../services/api';

const DownloadButton = ({ projectId }) => {
    const downloadPDF = () => {
        // This assumes the backend serves the file directly or the controller handles it
        // For better experience we might use api.get with responseType blob, 
        // but the direct window.open or link method is simpler for now.
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://reqforge.onrender.com/api';
        window.open(`${baseURL}/export/pdf/${projectId}`, '_blank');
    };

    return (
        <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition font-medium"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Download PDF
        </button>
    );
};

export default DownloadButton;