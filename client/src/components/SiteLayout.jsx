import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useSite } from '../context/SiteContext';

export default function SiteLayout() {
  const { content, loading, error } = useSite();

  if (loading) {
    return <div className="page-state"><div className="spinner" /> Loading OmiChef Business…</div>;
  }
  if (error || !content) {
    return <div className="page-state page-state--error">{error || 'Website content could not be loaded.'}</div>;
  }

  const theme = content.theme;
  const style = {
    '--rust': theme.rust,
    '--rust-dark': theme.rustDark,
    '--cream': theme.cream,
    '--cream-deep': theme.creamDeep,
    '--navy': theme.navy,
    '--charcoal': theme.charcoal,
    '--white': theme.white,
    '--peach': theme.peach
  };

  return (
    <div style={style} className="site-shell">
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}
