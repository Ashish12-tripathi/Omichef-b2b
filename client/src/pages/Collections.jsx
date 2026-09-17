import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import CollectionCard from '../components/CollectionCard';
import SectionHeading from '../components/SectionHeading';

export default function Collections() {
  const { content } = useSite();
  return (
    <>
      <section className="page-hero page-hero--collections">
        <div className="container page-hero__grid">
          <div><div className="eyebrow eyebrow--light">Product catalogue</div><h1>Browse OmiChef collections for your bulk requirement.</h1><p>Every card opens the current Shopify collection in a new tab. Shortlist products there, then return here to request business pricing.</p></div>
          <img src="/images/compatibility.webp" alt="OmiChef cookware compatibility" />
        </div>
      </section>
      <section className="section section--cream-deep">
        <div className="container">
          <SectionHeading {...content.collectionsIntro} align="center" />
          <div className="collection-grid collection-grid--page">
            {content.collections.map((collection) => <CollectionCard key={collection.slug} collection={collection} />)}
          </div>
        </div>
      </section>
      <section className="section collection-instructions">
        <div className="container collection-instructions__grid">
          <div><div className="eyebrow">Using the catalogue</div><h2>Retail browsing stays on Shopify. Business negotiation starts here.</h2></div>
          <ol>
            <li><span>1</span><div><strong>Open a live collection</strong><p>Review current OmiChef products, sizes and retail product details.</p></div></li>
            <li><span>2</span><div><strong>Shortlist products</strong><p>Note your preferred categories, SKUs, approximate quantities and delivery location.</p></div></li>
            <li><span>3</span><div><strong>Request commercial terms</strong><p>Submit the bulk form so the business team can discuss pricing and supply.</p></div></li>
          </ol>
        </div>
        <div className="container centered-actions">
          <Link className="button" to="/contact#quote">Request bulk pricing <ArrowRight size={18} /></Link>
          <a className="button button--outline" href={content.contact.d2cUrl} target="_blank" rel="noreferrer">Open full OmiChef store <ExternalLink size={17} /></a>
        </div>
      </section>
    </>
  );
} 
