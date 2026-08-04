import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadContent() {
    try {
      setLoading(true);
      setError('');
      const data = await api('/content');
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  const value = useMemo(
    () => ({ content, setContent, loading, error, reload: loadContent }),
    [content, loading, error]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used inside SiteProvider');
  return context;
}
