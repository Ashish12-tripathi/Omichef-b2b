import { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { api } from '../lib/api';

const initial = {
  name: '', email: '', phone: '', company: '', preferredDate: '', preferredTime: '', meetingType: 'video', notes: ''
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ loading: false, message: '', error: false });
  const minDate = new Date().toISOString().split('T')[0];

  function update(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    try {
      setState({ loading: true, message: '', error: false });
      const result = await api('/appointments', { method: 'POST', body: JSON.stringify(form) });
      setState({ loading: false, message: result.message, error: false });
      setForm(initial);
    } catch (error) {
      setState({ loading: false, message: error.message, error: true });
    }
  }

  return (
    <form className="business-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Full name<input required name="name" value={form.name} onChange={update} /></label>
        <label>Email<input required type="email" name="email" value={form.email} onChange={update} /></label>
        <label>Phone<input required name="phone" value={form.phone} onChange={update} /></label>
        <label>Company<input required name="company" value={form.company} onChange={update} /></label>
        <label>Preferred date<input required type="date" min={minDate} name="preferredDate" value={form.preferredDate} onChange={update} /></label>
        <label>Preferred time
          <select required name="preferredTime" value={form.preferredTime} onChange={update}>
            <option value="">Select time</option><option>10:00 AM–12:00 PM</option><option>12:00 PM–2:00 PM</option>
            <option>2:00 PM–4:00 PM</option><option>4:00 PM–6:00 PM</option>
          </select>
        </label>
        <label>Meeting type
          <select name="meetingType" value={form.meetingType} onChange={update}>
            <option value="video">Video call</option><option value="phone">Phone call</option><option value="in-person">In-person meeting</option>
          </select>
        </label>
      </div>
      <label>Discussion notes<textarea name="notes" value={form.notes} onChange={update} rows="4" placeholder="Briefly describe the product range or business requirement." /></label>
      <button className="button" disabled={state.loading} type="submit">
        {state.loading ? 'Requesting…' : 'Request appointment'} <CalendarCheck size={17} />
      </button>
      {state.message && <p className={`form-message ${state.error ? 'form-message--error' : ''}`}>{state.message}</p>}
    </form>
  );
}
