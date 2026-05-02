import './Skeleton.scss';

export default function ProductCardSkeleton() {
  return (
    <article className="ProductCardSkeleton" aria-hidden="true">
      <div className="ProductCardSkeleton__image" />
      <div className="ProductCardSkeleton__body">
        <div className="ProductCardSkeleton__line ProductCardSkeleton__line--short" />
        <div className="ProductCardSkeleton__line" />
        <div className="ProductCardSkeleton__line ProductCardSkeleton__line--medium" />
        <div className="ProductCardSkeleton__line ProductCardSkeleton__line--short" />
        <div className="ProductCardSkeleton__line ProductCardSkeleton__line--price" />
      </div>
    </article>
  );
}
