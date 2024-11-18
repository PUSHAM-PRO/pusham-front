import AgentSidebar from '../pages/agent/AgentSidebar';
import AgentHeader from '../pages/agent/AgentHeader';
import { Outlet } from 'react-router-dom';
import AgentSubheader from '../pages/agent/AgentSubheader';

const AgentDashboard = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <AgentSidebar />
      <div className='flex-1 flex flex-col'>
        <AgentHeader />
        <AgentSubheader />
        <main className='flex-1 overflow-auto p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AgentDashboard;