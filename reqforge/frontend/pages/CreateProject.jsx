import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import FormBuilder from '../components/FormBuilder';

function CreateProject() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        setLoading(true);
        try {
            await api.post('/project/create', formData);
            navigate('/dashboard');
        } catch (err) {
            alert('Failed to create project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Start New Project</h1>
                <p className="text-gray-500 mt-2">Follow the steps to generate your specification document.</p>
            </div>

            <div className="max-w-4xl mx-auto">
                <FormBuilder onSubmit={handleCreate} loading={loading} />
            </div>
        </Layout>
    );
}

export default CreateProject;
