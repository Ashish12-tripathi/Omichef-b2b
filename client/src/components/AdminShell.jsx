import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, PanelsTopLeft } from 'lucide-react';

export default function AdminShell({ title, children, actions }) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('omichef_admin_token');
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">OC <span>Business Admin</span></div>
        <nav>
          <NavLink to="/admin" end><LayoutDashboard size={18} /> Leads</NavLink>
          <NavLink to="/admin/content"><PanelsTopLeft size={18} /> Website Content</NavLink>
        </nav>
        <button onClick={logout}><LogOut size={18} /> Log out</button>
      </aside>
      <main className="admin-main">
        <header className="admin-header"><div><small>OmiChef Business</small><h1>{title}</h1></div>{actions}</header>
        {children}
      </main>
    </div>
  );
}
