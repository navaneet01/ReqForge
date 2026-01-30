import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');
        fetchProjects();
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/project/all');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id, e) => {
        e.stopPropagation(); // Prevent card click
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/project/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            alert('Delete failed');
        }
    };

    if (loading) {
        return <Layout><div className="flex justify-center p-12 text-gray-500">Loading your projects...</div></Layout>;
    }

    return (
        <Layout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage all your generated requirements.</p>
                </div>
                <button
                    onClick={() => navigate('/create')}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition flex items-center gap-2"
                >
                    <span>+</span> Create New Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200 border-dashed">
                    <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                    <p className="text-gray-500 mt-1">Get started by creating your first system requirement spec.</p>
                    <button
                        onClick={() => navigate('/create')}
                        className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800"
                    >
                        Create Project &rarr;
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div
                            key={project._id}
                            onClick={() => navigate(`/project/${project._id}`)}
                            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => deleteProject(project._id, e)}
                                    className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-full"
                                    title="Delete Project"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                    {project.projectName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {project.projectName}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                {project.description || "System Requirement Specification"}
                            </p>

                            <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full">Completed</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-400">
                                <span>Includes {project.modules.length} modules</span>
                                <span className="text-indigo-500 font-medium group-hover:translate-x-1 transition-transform">View Details &rarr;</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default Dashboard;
