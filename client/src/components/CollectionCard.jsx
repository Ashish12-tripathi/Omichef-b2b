import { ArrowUpRight } from 'lucide-react';

export default function CollectionCard({ collection }) {
  return (
    <article className="collection-card">
      <a href={collection.link} target="_blank" rel="noreferrer" className="collection-card__media">
        <img src={collection.image} alt={collection.title} loading="lazy" />
        <span>{collection.tag}</span>
      </a>
      <div className="collection-card__body">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <a href={collection.link} target="_blank" rel="noreferrer" className="text-link">
          View live collection <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
