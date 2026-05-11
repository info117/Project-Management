import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { FloatingAIChat } from '../shared/FloatingAIChat';

export function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden flex bg-bg-deep transition-colors duration-300">
      {/* Background Decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--brand) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full"></div>
      </div>

      <Sidebar />
      <main className="flex-1 min-h-screen flex flex-col z-10 pl-64">
        <Navbar />
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <FloatingAIChat />
    </div>
  );
}
