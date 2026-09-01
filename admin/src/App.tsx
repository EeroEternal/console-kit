import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppSidebar } from './components/layout/AppSidebar';
import { SiteHeader } from './components/layout/SiteHeader';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen overflow-hidden bg-muted/40 font-sans">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SiteHeader />
          <main className="flex-1 overflow-y-auto bg-background/50">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/workers" element={<div className="p-6 text-xs text-muted-foreground">Worker Node Management</div>} />
              <Route path="/settings" element={<div className="p-6 text-xs text-muted-foreground">Global Settings</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
