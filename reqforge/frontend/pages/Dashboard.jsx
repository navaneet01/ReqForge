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
            <div className="relative">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-gray-800">Recent Projects</h1>

                    {/* Floating-style New Project Button */}
                    <button
                        onClick={() => navigate('/create')}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 absolute top-0 right-0"
                        style={{ boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}
                    >
                        New Project
                    </button>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-12">
                    {projects.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
                            <button onClick={() => navigate('/create')} className="mt-4 text-indigo-600 font-semibold">
                                Create your first project &rarr;
                            </button>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-4 px-6 text-sm font-bold text-gray-700">Project Name</th>
                                    <th className="py-4 px-6 text-sm font-bold text-gray-700">Status</th>
                                    <th className="py-4 px-6 text-sm font-bold text-gray-700">Last Updated</th>
                                    <th className="py-4 px-6 text-sm font-bold text-gray-700"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr
                                        key={project._id}
                                        onClick={() => navigate(`/project/${project._id}`)}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                                    >
                                        <td className="py-4 px-6 font-medium text-gray-900">
                                            {project.projectName}
                                        </td>
                                        <td className="py-4 px-6">
                                            {/* Mock Status for Visual Parity */}
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${index % 2 === 0 ? 'bg-green-500' : 'bg-orange-500'}`}>
                                                {index % 2 === 0 ? 'Status' : 'Complex'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-500 text-sm">
                                            {/* Mock Time for Visual Parity - In real app use moment/date-fns */}
                                            {20 + index} minutes ago
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={(e) => deleteProject(project._id, e)}
                                                className="text-gray-400 hover:text-red-500 font-bold text-xl leading-none"
                                            >
                                                ...
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
