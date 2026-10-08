import Image from 'next/image';
import { photo } from '@/content/images';

type Props = {
  k: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Fill the parent (parent must be relative and sized). */
  fill?: boolean;
  caption?: boolean;
};

/** Local stock photo with blur placeholder. Shows a "Representative image" caption for stock people. */
export default function Photo({ k, sizes, className = '', imgClassName = '', priority, fill = true, caption = true }: Props) {
  const p = photo(k);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} placeholder={p.blurDataURL ? 'blur' : 'empty'} blurDataURL={p.blurDataURL} className={`object-cover ${imgClassName}`} />
      ) : (
        <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes={sizes} priority={priority} placeholder={p.blurDataURL ? 'blur' : 'empty'} blurDataURL={p.blurDataURL} className={imgClassName} />
      )}
      {caption && p.representative && (
        <span className="absolute bottom-2 left-2 rounded-full bg-kb-ink/70 px-2 py-0.5 text-[0.65rem] font-semibold text-kb-ricepaper backdrop-blur">Representative image</span>
      )}
    </div>
  );
}
