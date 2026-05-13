import { type ReactNode, useRef, useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './Carousel.css';

interface CarouselProps {
  children: ReactNode;
  showControls?: boolean;
  showDots?: boolean;
}

export function Carousel({ children, showControls = true, showDots }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const update = () => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 4);
    setCanNext(t.scrollLeft + t.clientWidth < t.scrollWidth - 4);
    const slideWidth = t.firstElementChild?.clientWidth ?? t.clientWidth;
    setActiveDot(Math.round(t.scrollLeft / slideWidth));
  };

  useEffect(() => {
    update();
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      t.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const w = t.firstElementChild?.clientWidth ?? t.clientWidth * 0.8;
    t.scrollBy({ left: dir * (w + 12), behavior: 'smooth' });
  };

  const count = Array.isArray(children) ? children.length : 1;

  return (
    <div className="rf-carousel">
      <div ref={trackRef} className="rf-carousel__track">
        {children}
      </div>
      {showControls && (
        <>
          <button type="button" className="rf-carousel__btn rf-carousel__btn--prev" onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label="Previous slide">
            <CaretLeft size={14} />
          </button>
          <button type="button" className="rf-carousel__btn rf-carousel__btn--next" onClick={() => scrollBy(1)} disabled={!canNext} aria-label="Next slide">
            <CaretRight size={14} />
          </button>
        </>
      )}
      {showDots && count > 1 && (
        <div className="rf-carousel__dots" role="tablist">
          {Array.from({ length: count }).map((_, i) => (
            <span key={i} className={`rf-carousel__dot ${i === activeDot ? 'rf-carousel__dot--active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  );
}
