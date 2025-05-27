import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Manage from './pages/Manage';
import MonitorPage from './pages/MonitorPage';
import StaffPage from './pages/StaffPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로로 접속 시 /manage로 리다이렉트 */}
        <Route path="/" element={<Manage />} />
        <Route path="/monitor/:patientId" element={<MonitorPage />} />
        <Route path="/staff/:patientId" element={<StaffPage />} />
      </Routes>
    </BrowserRouter>
  );
}