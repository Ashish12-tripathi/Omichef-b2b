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
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow eyebrow--light">{hero.eyebrow}</div>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
            <div className="hero-actions">
              <Link className="button button--cream" to={hero.primaryLink}>{hero.primaryLabel} <ArrowRight size={18} /></Link>
              <Link className="button button--ghost-light" to={hero.secondaryLink}>{hero.secondaryLabel}</Link>
            </div>
            <div className="hero-trust"><CheckCircle2 size={18} /> {hero.trustLine}</div>
          </div>
          <div className="hero-visual">
            <img src={hero.image} alt="OmiChef cookware collection for bulk buyers" />
            <div className="hero-float hero-float--top"><PackageCheck size={20} /><span><strong>Business bundles</strong>Tailored to volume and product mix</span></div>
            <div className="hero-float hero-float--bottom"><Truck size={20} /><span><strong>Pan-India support</strong>Commercial fulfilment consultation</span></div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          {content.stats.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
        </div>
      </section>

      <section className="section buyer-section">
        <div className="container">
          <SectionHeading eyebrow="Who we supply" title="A cookware sourcing partner for every business model." text="OmiChef Business is designed around consultation, flexible assortments and relationship-led procurement rather than a standard retail checkout." align="center" />
          <div className="buyer-grid">
            {content.buyerSegments.map((item) => {
              const Icon = iconMap[item.icon] || UsersRound;
              return <article key={item.title} className="buyer-card"><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>;
            })}
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

      <section className="section split-feature">
        <div className="container split-feature__grid">
          <div className="split-feature__image"><img src={content.supplySection.image} alt="OmiChef cookware assortment" /></div>
          <div className="split-feature__copy">
            <div className="eyebrow">{content.supplySection.eyebrow}</div>
            <h2>{content.supplySection.title}</h2>
            <p>{content.supplySection.text}</p>
            <ul className="check-list">
              <li><CheckCircle2 /> Shortlist from live Shopify collections</li>
              <li><CheckCircle2 /> Request mixed-SKU or category bundles</li>
              <li><CheckCircle2 /> Discuss MOQ, packaging and delivery terms</li>
            </ul>
            <Link className="button" to="/contact#quote">Start your requirement <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHeading eyebrow="Why OmiChef Business" title="The structure procurement teams need, backed by a consumer cookware brand." text="The site brings OmiChef's product range into a focused B2B journey: discover categories, explain the requirement, speak with the team and receive a tailored quotation." align="center" />
          <div className="benefit-grid">
            {content.benefits.map((benefit, index) => <article key={benefit.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}
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

      <section className="section faq-section">
        <div className="container faq-grid">
          <SectionHeading eyebrow="Frequently asked questions" title="What bulk buyers usually ask before the first order." text="Final MOQ, pricing and lead times depend on the exact product mix and order profile." />
          <div className="faq-list">
            {content.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ArrowUpRight size={18} /></summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}
