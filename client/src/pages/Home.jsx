import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Gift, Hotel, PackageCheck, ShoppingBag,
  Store, Truck, UsersRound
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import SectionHeading from '../components/SectionHeading';
import CollectionCard from '../components/CollectionCard';
import QuoteForm from '../components/QuoteForm';

const iconMap = { Store, Hotel, Gift, ShoppingBag };

export default function Home() {
  const { content } = useSite();
  const { hero } = content;

  return (
    
    <>
    <section className="hero">
  <div className="hero-inner">

    {/* LEFT CONTENT */}
    <div className="hero-copy">

      <div className="hero-eyebrow">
        {hero.eyebrow}
      </div>

      <h1 className="hero-title">
        {hero.title}
      </h1>

      <div className="hero-benefits">
        <span>Bulk pricing</span>
        <span>Flexible quantities</span>
        <span>Pan-India fulfilment</span>
      </div>

      <div className="hero-actions">
        <Link
          className="hero-button hero-button--primary"
          to={hero.primaryLink}
        >
          {hero.primaryLabel}
          <ArrowRight size={18} />
        </Link>

        <Link
          className="hero-button hero-button--secondary"
          to={hero.secondaryLink}
        >
          {hero.secondaryLabel}
        </Link>
      </div>

      <div className="hero-trust">
        <CheckCircle2 size={17} />
        <span>{hero.trustLine}</span>
      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className="hero-visual">
      <div className="hero-image-wrap">
        <img
          src={hero.image}
          alt="OmiChef premium cookware collection for business buyers"
        />
      </div>
    </div>

  </div>
</section>

 <section className="section process-section">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="From requirement to commercial supply in four clear steps." align="center" />
          <div className="process-grid">
            {content.process.map((item) => <article key={item.step}><strong>{item.step}</strong><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

<section className="section section--cream-deep">
        <div className="container">
          <div className="heading-row">
            <SectionHeading {...content.collectionsIntro} />
            <Link className="text-link text-link--large" to="/collections">View all collections <ArrowRight size={18} /></Link>
          </div>
          <div className="collection-grid">
            {content.collections.slice(0, 6).map((collection) => <CollectionCard key={collection.slug} collection={collection} />)}
          </div>
        </div>
      </section>
      <section className="section quote-preview">
        <div className="container quote-preview__grid">
          <div>
            <div className="eyebrow">Request a business quote</div>
            <h2>Tell us what you need. We will structure the bundle.</h2>
            <p>Share your category mix, estimated volume and location. A business team member can then discuss availability and commercial terms.</p>
            <div className="contact-points">
              <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
              <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
            </div>
          </div>
          <QuoteForm compact />
        </div>
      </section>

     
      
    </>
  );
}
