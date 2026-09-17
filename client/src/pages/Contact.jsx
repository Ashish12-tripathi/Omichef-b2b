import { CalendarDays, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import QuoteForm from '../components/QuoteForm';
import AppointmentForm from '../components/AppointmentForm';

export default function Contact() {
  const { content } = useSite();
  const { contact } = content;
  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="container contact-hero-grid">
          <div><div className="eyebrow eyebrow--light">Contact OmiChef Business</div><h1>Start with a quote request or schedule a business discussion.</h1><p>Use the route that suits your stage. Detailed requirements can go directly into the quote form; early-stage buyers can request an appointment first.</p></div>
          <div className="contact-card">
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}><Phone /> <span><small>Call us</small>{contact.phone}</span></a>
            <a href={`mailto:${contact.email}`}><Mail /> <span><small>Email us</small>{contact.email}</span></a>
            <a href={contact.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> <span><small>WhatsApp</small>Start a conversation</span></a>
            <p><MapPin /> <span><small>Business address</small>{contact.address}</span></p>
          </div>
        </div>
      </section>

      <section id="quote" className="section form-section">
        <div className="container form-section__grid">
          <div className="form-intro"><div className="eyebrow">Bulk purchase form</div><h2>Request wholesale pricing.</h2><p>Provide enough context for the team to evaluate your requirement and respond with the right next step.</p><ul><li>Collection and product mix</li><li>Expected quantity or recurring volume</li><li>Delivery city and business type</li><li>Packaging, gifting or institutional requirements</li></ul></div>
          <QuoteForm />
        </div>
      </section>

      <section id="appointment" className="section section--cream-deep form-section">
        <div className="container form-section__grid form-section__grid--reverse">
          <AppointmentForm />
          <div className="form-intro"><div className="eyebrow">Book an appointment</div><h2>Prefer to speak before finalising quantities?</h2><p>Request a time slot for a phone, video or in-person business discussion. The team will confirm availability separately.</p><div className="appointment-note"><CalendarDays /><span><strong>Working hours</strong>{contact.hours}</span></div>{contact.appointmentUrl && <a className="button button--outline" href={contact.appointmentUrl} target="_blank" rel="noreferrer">Open external calendar</a>}</div>
        </div>
      </section>
    </>
  );
}
