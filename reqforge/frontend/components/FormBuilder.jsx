import { useState } from 'react';

const FormBuilder = ({ onSubmit, loading }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectName: '',
        description: ''
    });

    const updateData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        if (!formData.projectName || !formData.description) return alert('Please fill in all details');
        onSubmit(formData);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex gap-2">
                    {[1, 2].map(i => (
                        <div key={i} className={`h-2 w-12 rounded-full transition-colors ${step >= i ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                    ))}
                </div>
                <span className="text-sm font-medium text-gray-500">Step {step} of 2</span>
            </div>

            <div className="p-8 min-h-[400px]">
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800">What is the name of your project?</h2>
                        <input
                            className="w-full text-2xl border-b-2 border-gray-200 focus:border-indigo-600 p-2 outline-none transition bg-transparent placeholder-gray-300"
                            placeholder="e.g. Ecommerce Website"
                            autoFocus
                            value={formData.projectName}
                            onChange={e => updateData('projectName', e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !!formData.projectName && setStep(2)}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800">Describe your project requirements</h2>
                        <p className="text-gray-500">List all the features, user roles, and functionalities you need.</p>
                        <textarea
                            className="w-full h-96 border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-600 outline-none transition resize-none text-lg"
                            placeholder="e.g. I need a system where users can sign up, pay online. Admins should see a dashboard..."
                            autoFocus
                            value={formData.description}
                            onChange={e => updateData('description', e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-between bg-gray-50">
                <button
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className="px-6 py-2 text-gray-600 font-medium hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    Back
                </button>

                {step < 2 ? (
                    <button
                        onClick={() => setStep(s => Math.min(2, s + 1))}
                        disabled={step === 1 && !formData.projectName}
                        className="bg-gray-900 text-white px-8 py-2 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !formData.description}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-lg hover:shadow-xl disabled:opacity-70"
                    >
                        {loading ? 'Generating...' : 'Generate SRS ✨'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormBuilder;
