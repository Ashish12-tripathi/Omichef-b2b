import { useEffect, useState } from 'react';
import { Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import AdminShell from '../components/AdminShell';
import { api } from '../lib/api';

function Field({ label, value, onChange, textarea = false, type = 'text' }) {
  return <label className="admin-field"><span>{label}</span>{textarea ? <textarea rows="4" value={value || ''} onChange={(e) => onChange(e.target.value)} /> : <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} />}</label>;
}

function JsonEditor({ label, value, onChange }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState('');
  useEffect(() => setText(JSON.stringify(value, null, 2)), [value]);
  function apply(next) {
    setText(next);
    try { onChange(JSON.parse(next)); setError(''); } catch { setError('Invalid JSON. Fix it before saving.'); }
  }
  return <label className="admin-field admin-field--full"><span>{label}</span><textarea className="json-editor" rows="14" value={text} onChange={(e) => apply(e.target.value)} />{error && <small className="admin-field-error">{error}</small>}</label>;
}

export default function AdminContent() {
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState('general');
  const [state, setState] = useState({ loading: true, saving: false, message: '', error: false });

  async function load() {
    try { const data = await api('/content'); setContent(data); setState({ loading: false, saving: false, message: '', error: false }); }
    catch (error) { setState({ loading: false, saving: false, message: error.message, error: true }); }
  }
  useEffect(() => { load(); }, []);

  function set(path, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let cursor = next;
      keys.slice(0, -1).forEach((key) => { cursor = cursor[key]; });
      cursor[keys.at(-1)] = value;
      return next;
    });
  }

  async function save() {
    try { setState((s) => ({ ...s, saving: true, message: '' })); const data = await api('/content', { method: 'PUT', body: JSON.stringify(content) }); setContent(data.data); setState({ loading: false, saving: false, message: data.message, error: false }); }
    catch (error) { setState({ loading: false, saving: false, message: error.message, error: true }); }
  }

  async function reset() {
    if (!window.confirm('Restore all website content to the original default?')) return;
    const data = await api('/content/reset', { method: 'POST' }); setContent(data.data); setState({ loading: false, saving: false, message: data.message, error: false });
  }

  function updateCollection(index, key, value) { set(`collections.${index}.${key}`, value); }
  function addCollection() { setContent((prev) => ({ ...prev, collections: [...prev.collections, { title: 'New Collection', slug: `new-${Date.now()}`, description: '', image: '', link: '', tag: '' }] })); }
  function removeCollection(index) { setContent((prev) => ({ ...prev, collections: prev.collections.filter((_, i) => i !== index) })); }

  if (state.loading || !content) return <AdminShell title="Website content"><div className="admin-loading">Loading content…</div></AdminShell>;

  return (
    <AdminShell title="Website content" actions={<div className="admin-header-actions"><button className="admin-action admin-action--secondary" onClick={reset}><RotateCcw size={17} /> Reset</button><button className="admin-action" onClick={save} disabled={state.saving}><Save size={17} /> {state.saving ? 'Saving…' : 'Save changes'}</button></div>}>
      {state.message && <div className={`admin-alert ${state.error ? 'admin-alert--error' : 'admin-alert--success'}`}>{state.message}</div>}
      <div className="content-tabs">{['general', 'collections', 'sections', 'about & faq'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>

      {tab === 'general' && <div className="admin-panel">
        <h2>Brand and announcement</h2><div className="admin-form-grid"><Field label="Brand name" value={content.brand.name} onChange={(v) => set('brand.name', v)} /><Field label="Announcement bar" value={content.brand.announcement} onChange={(v) => set('brand.announcement', v)} /><Field label="Logo path / URL" value={content.brand.logo} onChange={(v) => set('brand.logo', v)} /></div>
        <h2>Hero</h2><div className="admin-form-grid"><Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => set('hero.eyebrow', v)} /><Field label="Title" value={content.hero.title} onChange={(v) => set('hero.title', v)} textarea /><Field label="Description" value={content.hero.description} onChange={(v) => set('hero.description', v)} textarea /><Field label="Hero image" value={content.hero.image} onChange={(v) => set('hero.image', v)} /><Field label="Primary button label" value={content.hero.primaryLabel} onChange={(v) => set('hero.primaryLabel', v)} /><Field label="Primary button link" value={content.hero.primaryLink} onChange={(v) => set('hero.primaryLink', v)} /></div>
        <h2>Contact information</h2><div className="admin-form-grid"><Field label="Phone" value={content.contact.phone} onChange={(v) => set('contact.phone', v)} /><Field label="Email" value={content.contact.email} onChange={(v) => set('contact.email', v)} /><Field label="Address" value={content.contact.address} onChange={(v) => set('contact.address', v)} textarea /><Field label="Working hours" value={content.contact.hours} onChange={(v) => set('contact.hours', v)} /><Field label="WhatsApp URL" value={content.contact.whatsappUrl} onChange={(v) => set('contact.whatsappUrl', v)} /><Field label="External appointment URL" value={content.contact.appointmentUrl} onChange={(v) => set('contact.appointmentUrl', v)} /><Field label="D2C store URL" value={content.contact.d2cUrl} onChange={(v) => set('contact.d2cUrl', v)} /></div>
        <h2>Theme colors</h2><div className="admin-color-grid">{Object.entries(content.theme).map(([key, value]) => <Field key={key} label={key} type="color" value={value} onChange={(v) => set(`theme.${key}`, v)} />)}</div>
      </div>}

      {tab === 'collections' && <div className="admin-panel"><div className="admin-panel-heading"><div><h2>Collection cards</h2><p>Each card should link to its matching OmiChef Shopify collection.</p></div><button className="admin-action" onClick={addCollection}><Plus size={17} /> Add collection</button></div><div className="collection-editor-list">{content.collections.map((item, index) => <div className="collection-editor" key={item.slug + index}><div className="collection-editor__preview"><img src={item.image} alt="" /><span>{item.title}</span></div><div className="admin-form-grid"><Field label="Title" value={item.title} onChange={(v) => updateCollection(index, 'title', v)} /><Field label="Slug" value={item.slug} onChange={(v) => updateCollection(index, 'slug', v)} /><Field label="Tag" value={item.tag} onChange={(v) => updateCollection(index, 'tag', v)} /><Field label="Image URL" value={item.image} onChange={(v) => updateCollection(index, 'image', v)} /><Field label="Shopify collection URL" value={item.link} onChange={(v) => updateCollection(index, 'link', v)} /><Field label="Description" value={item.description} onChange={(v) => updateCollection(index, 'description', v)} textarea /></div><button className="icon-danger collection-delete" onClick={() => removeCollection(index)}><Trash2 size={17} /> Remove</button></div>)}</div></div>}

      {tab === 'sections' && <div className="admin-panel"><p className="admin-help">These structured JSON editors provide full control over repeatable cards. Keep the same property names while editing values or adding items.</p><div className="admin-form-grid"><JsonEditor label="Statistics" value={content.stats} onChange={(v) => set('stats', v)} /><JsonEditor label="Buyer segments" value={content.buyerSegments} onChange={(v) => set('buyerSegments', v)} /><JsonEditor label="Benefits" value={content.benefits} onChange={(v) => set('benefits', v)} /><JsonEditor label="Process steps" value={content.process} onChange={(v) => set('process', v)} /></div></div>}

      {tab === 'about & faq' && <div className="admin-panel"><h2>About section</h2><div className="admin-form-grid"><Field label="Eyebrow" value={content.about.eyebrow} onChange={(v) => set('about.eyebrow', v)} /><Field label="Title" value={content.about.title} onChange={(v) => set('about.title', v)} textarea /><Field label="Image" value={content.about.image} onChange={(v) => set('about.image', v)} /><JsonEditor label="About paragraphs" value={content.about.paragraphs} onChange={(v) => set('about.paragraphs', v)} /><JsonEditor label="FAQs" value={content.faqs} onChange={(v) => set('faqs', v)} /></div></div>}
    </AdminShell>
  );
}
