import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { api } from '../lib/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [state, setState] = useState({ loading: false, error: '' });
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(event) {
    event.preventDefault();
    try {
      setState({ loading: true, error: '' });
      const data = await api('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('omichef_admin_token', data.token);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (error) {
      setState({ loading: false, error: error.message });
    }
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-login-icon"><LockKeyhole /></div>
        <small>OmiChef Business</small><h1>Admin login</h1><p>Manage website content, quote enquiries and appointment requests.</p>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="button" disabled={state.loading}>{state.loading ? 'Signing in…' : 'Sign in'}</button>
        {state.error && <p className="form-message form-message--error">{state.error}</p>}
        <a href="/">Return to website</a>
      </form>
    </div>
  );
}
