import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import ProjectView from './pages/ProjectView';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateProject />} />
                <Route path="/project/:id" element={<ProjectView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;