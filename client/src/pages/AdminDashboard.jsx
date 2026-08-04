import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, FileText, RefreshCw, Trash2 } from 'lucide-react';
import AdminShell from '../components/AdminShell';
import { api } from '../lib/api';

const inquiryStatuses = ['new', 'contacted', 'qualified', 'won', 'closed'];
const appointmentStatuses = ['requested', 'confirmed', 'completed', 'cancelled'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('inquiries');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true); setError('');
      const data = await api(tab === 'inquiries' ? '/inquiries' : '/appointments');
      setItems(data.items || []);
    } catch (error) {
      if (/session|authentication|expired/i.test(error.message)) {
        localStorage.removeItem('omichef_admin_token');
        window.location.href = '/admin/login';
      }
      setError(error.message);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [tab]);

  async function updateStatus(id, status) {
    await api(`/${tab}/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    setItems((prev) => prev.map((item) => item._id === id ? { ...item, status } : item));
  }

  async function remove(id) {
    if (!window.confirm('Delete this record permanently?')) return;
    await api(`/${tab}/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((item) => item._id !== id));
  }

  const summary = useMemo(() => {
    const statuses = tab === 'inquiries' ? inquiryStatuses : appointmentStatuses;
    return statuses.map((status) => ({ status, count: items.filter((item) => item.status === status).length }));
  }, [items, tab]);

  return (
    <AdminShell title="Leads & appointments" actions={<button className="admin-action" onClick={load}><RefreshCw size={17} /> Refresh</button>}>
      <div className="admin-tabs">
        <button className={tab === 'inquiries' ? 'active' : ''} onClick={() => setTab('inquiries')}><FileText /> Quote enquiries</button>
        <button className={tab === 'appointments' ? 'active' : ''} onClick={() => setTab('appointments')}><CalendarClock /> Appointments</button>
      </div>
      <div className="admin-summary">{summary.map((item) => <div key={item.status}><strong>{item.count}</strong><span>{item.status}</span></div>)}</div>
      {error && <div className="admin-alert">{error}</div>}
      {loading ? <div className="admin-loading">Loading records…</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Contact</th><th>Business</th><th>Requirement</th><th>Created</th><th>Status</th><th /></tr></thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan="6" className="empty-cell">No records yet.</td></tr>}
              {items.map((item) => (
                <tr key={item._id}>
                  <td><strong>{item.name}</strong><a href={`mailto:${item.email}`}>{item.email}</a><a href={`tel:${item.phone}`}>{item.phone}</a></td>
                  <td><strong>{item.company}</strong><span>{item.buyerType || item.meetingType}</span><span>{item.city || ''}</span></td>
                  <td className="requirement-cell">{tab === 'inquiries' ? <><span>{item.monthlyVolume || 'Volume not specified'}</span><small>{(item.selectedCollections || []).join(', ')}</small><p>{item.message}</p></> : <><span>{item.preferredDate} • {item.preferredTime}</span><p>{item.notes || 'No notes'}</p></>}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString('en-IN')}</td>
                  <td><select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)}>{(tab === 'inquiries' ? inquiryStatuses : appointmentStatuses).map((status) => <option key={status}>{status}</option>)}</select></td>
                  <td><button className="icon-danger" onClick={() => remove(item._id)}><Trash2 size={17} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
