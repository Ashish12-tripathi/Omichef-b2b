import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ChefHat, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  /*const { content } = useSite();
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="container page-hero__grid">
          <div><div className="eyebrow eyebrow--light">{content.about.eyebrow}</div><h1>{content.about.title}</h1><p>{content.about.paragraphs[0]}</p></div>
          <img src={content.about.image} alt="OmiChef cookware in a modern kitchen" />
        </div>
      </section>
      <section className="section about-story">
        <div className="container about-story__grid">
          <SectionHeading eyebrow="The B2B extension" title="The same OmiChef range, organised for wholesale conversations." text={content.about.paragraphs[1]} />
          <div className="about-values">
            <article><BadgeCheck /><h3>Quality-led range</h3><p>Cookware focused on durable materials, practical design and everyday performance.</p></article>
            <article><ShieldCheck /><h3>Trust and support</h3><p>Safety, warranties on selected lines and dependable after-sales communication.</p></article>
            <article><ChefHat /><h3>Indian kitchen relevance</h3><p>Products across triply, non-stick triply, cast iron, pressure cooking and drinkware.</p></article>
            <article><HeartHandshake /><h3>Relationship-led B2B</h3><p>Consultation for retailers, hospitality, gifting, marketplaces and institutions.</p></article>
          </div>
        </div>
      </section>
      <section className="section section--cream-deep brand-promise">
        <div className="container brand-promise__grid">
          <img src="/images/hero-cookware.webp" alt="OmiChef product range" />
          <div><div className="eyebrow">Our business promise</div><h2>Make cookware procurement easier without losing product choice.</h2><p>OmiChef Business does not replace the consumer store. It creates a dedicated entry point for bundle purchasing, recurring supply discussions and commercial support.</p><Link className="button" to="/contact#appointment">Discuss your business requirement <ArrowRight size={18} /></Link></div>
        </div>
      </section>
    </>
  );*/
}
