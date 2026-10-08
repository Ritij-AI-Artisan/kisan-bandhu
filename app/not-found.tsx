import Link from 'next/link';
import LogoMark from '@/components/brand/LogoMark';
import { buttonClass } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-kb-ricepaper px-4 pt-[var(--header-h)] text-center">
      <div>
        <LogoMark className="mx-auto h-24 w-24" />
        <h1 className="h2 mt-6">This path hasn’t sprouted yet</h1>
        <p className="lead mt-3 text-kb-stone">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className={buttonClass('primary', 'lg', 'mt-8')}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
