import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import ExportButtons from '../components/ExportButtons';
import RequirementPreview from '../components/RequirementPreview';

function ProjectView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        api.get(`/project/${id}`)
            .then(res => setProject(res.data))
            .catch(() => navigate('/dashboard'));
    }, [id, navigate]);

    if (!project) return <Layout><div className="flex justify-center items-center h-64 text-gray-500 font-medium">Loading document...</div></Layout>;

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">

                {/* Header Toolbar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-opacity-90">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
                            &larr;
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{project.projectName}</h1>
                            <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full inline-block">v1.0 DRAFT</div>
                        </div>
                    </div>

                    <ExportButtons projectId={project._id} />
                </div>

                {/* Document Viewer */}
                <div className="bg-white p-8 md:p-16 rounded-2xl shadow-xl border border-gray-100 min-h-[800px] mb-12 relative animate-fade-in">

                    {/* Decoration */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] font-black text-6xl text-gray-900 select-none pointer-events-none">
                        REQFORGE
                    </div>

                    <div className="border-b-2 border-gray-100 pb-8 mb-12 text-center">
                        <div className="mb-4 inline-block p-3 rounded-full bg-indigo-50 text-indigo-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">System Requirement Specification</h2>
                        <p className="text-gray-500 mt-2">Generated automatically by ReqForge AI</p>
                    </div>

                    {/* Reusable Component for Requirements */}
                    <RequirementPreview requirements={project.requirements} />

                    <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm italic">
                        -- End of Document --
                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default ProjectView;
