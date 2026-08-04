import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { content } = useSite();
  if (!content) return null;

  const nav = [
    ['/', 'Home'],
    ['/collections', 'Collections'],
    ['/about', 'About'],
    ['/contact', 'Contact']
  ];

  return (
    <>
      <div className="announcement">{content.brand.announcement}</div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img src={content.brand.logo} alt="OmiChef" />
            <span>
              <strong>OmiChef</strong>
              <small>Business</small>
            </span>
          </Link>

          <nav className={`main-nav ${open ? 'main-nav--open' : ''}`}>
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <a href={content.contact.d2cUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              D2C Store <ArrowUpRight size={15} />
            </a>
          </nav>

          <div className="header-actions">
            <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`} className="header-phone" aria-label="Call OmiChef">
              <Phone size={18} />
            </a>
            <Link to="/contact#appointment" className="button button--small">Book a call</Link>
            <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
