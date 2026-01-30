const RequirementPreview = ({ requirements }) => {
    return (
        <div className="space-y-10">
            {Object.keys(requirements).map((section, index) => (
                <div key={section} className="break-inside-avoid">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100">
                            {index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">{section}</h3>
                    </div>

                    <div className="pl-12">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <ul className="space-y-3">
                                {requirements[section].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <span className="mt-2 w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                                        <span className="text-gray-700 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequirementPreview;
