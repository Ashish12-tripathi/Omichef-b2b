import { useState } from 'react';
import { Send } from 'lucide-react';
import { api } from '../lib/api';
import { useSite } from '../context/SiteContext';

const initial = {
  name: '', email: '', phone: '', company: '', buyerType: '', monthlyVolume: '',
  selectedCollections: [], city: '', gstNumber: '', message: ''
};

export default function QuoteForm({ compact = false }) {
  const { content } = useSite();
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ loading: false, message: '', error: false });

  function update(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleCollection(title) {
    setForm((prev) => ({
      ...prev,
      selectedCollections: prev.selectedCollections.includes(title)
        ? prev.selectedCollections.filter((item) => item !== title)
        : [...prev.selectedCollections, title]
    }));
  }

  async function submit(event) {
    event.preventDefault();
    try {
      setState({ loading: true, message: '', error: false });
      const result = await api('/inquiries', { method: 'POST', body: JSON.stringify(form) });
      setState({ loading: false, message: result.message, error: false });
      setForm(initial);
    } catch (error) {
      setState({ loading: false, message: error.message, error: true });
    }
  }

  return (
    <form className={`business-form ${compact ? 'business-form--compact' : ''}`} onSubmit={submit}>
      <div className="form-grid">
        <label>Full name<input required name="name" value={form.name} onChange={update} placeholder="Your name" /></label>
        <label>Business email<input required type="email" name="email" value={form.email} onChange={update} placeholder="name@company.com" /></label>
        <label>Phone number<input required name="phone" value={form.phone} onChange={update} placeholder="+91" /></label>
        <label>Company name<input required name="company" value={form.company} onChange={update} placeholder="Company / store" /></label>
        <label>Buyer type
          <select required name="buyerType" value={form.buyerType} onChange={update}>
            <option value="">Select buyer type</option>
            <option>Retailer</option><option>Distributor</option><option>Hotel / Restaurant</option>
            <option>Corporate Gifting</option><option>Marketplace / D2C</option><option>Institution</option><option>Other</option>
          </select>
        </label>
        <label>Expected volume
          <select name="monthlyVolume" value={form.monthlyVolume} onChange={update}>
            <option value="">Select quantity range</option>
            <option>25–50 units</option><option>51–100 units</option><option>101–250 units</option>
            <option>251–500 units</option><option>500+ units</option><option>Need guidance</option>
          </select>
        </label>
        {!compact && <>
          <label>Delivery city<input name="city" value={form.city} onChange={update} placeholder="City / state" /></label>
          <label>GST number <span>(optional)</span><input name="gstNumber" value={form.gstNumber} onChange={update} placeholder="GSTIN" /></label>
        </>}
      </div>

      <fieldset className="collection-checks">
        <legend>Collections required</legend>
        <div>
          {content.collections.map((collection) => (
            <label key={collection.slug} className={form.selectedCollections.includes(collection.title) ? 'checked' : ''}>
              <input type="checkbox" checked={form.selectedCollections.includes(collection.title)} onChange={() => toggleCollection(collection.title)} />
              {collection.title}
            </label>
          ))}
        </div>
      </fieldset>

      <label>Requirement details
        <textarea required minLength="10" name="message" value={form.message} onChange={update} rows={compact ? 4 : 6} placeholder="Products, estimated quantities, packaging, delivery timeline or any other requirement…" />
      </label>

      <button className="button" disabled={state.loading} type="submit">
        {state.loading ? 'Submitting…' : 'Submit bulk requirement'} <Send size={17} />
      </button>
      {state.message && <p className={`form-message ${state.error ? 'form-message--error' : ''}`}>{state.message}</p>}
    </form>
  );
}
