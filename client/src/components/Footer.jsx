import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Footer() {
  const { content } = useSite();
  if (!content) return null;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand brand--footer">
            <img src={content.brand.logo} alt="OmiChef" />
            <span><strong>OmiChef</strong><small>Business</small></span>
          </div>
          <h3>{content.footer.statement}</h3>
          <a className="button button--cream" href={content.contact.d2cUrl} target="_blank" rel="noreferrer">
            Visit retail store <ArrowUpRight size={17} />
          </a>
        </div>
        <div>
          <h4>Navigate</h4>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About OmiChef</Link>
          <Link to="/contact#quote">Request a quote</Link>
          <Link to="/contact#appointment">Book an appointment</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}><Phone size={16} /> {content.contact.phone}</a>
          <a href={`mailto:${content.contact.email}`}><Mail size={16} /> {content.contact.email}</a>
          <p><MapPin size={16} /> {content.contact.address}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {content.footer.copyright}. All rights reserved.</span>
        <Link to="/admin/login">Admin</Link>
      </div>
    </footer>
  );
}
