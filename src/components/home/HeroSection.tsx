import Container from '@/components/ui/Container';
import { SearchBox } from '@/components/search/SearchBox';

export function HeroSection() {
  const exampleSearches = [
    'Compress PDF',
    'Edit Screenshot',
    'Word to PDF',
    'Image to Text',
  ];

  return (
    <section id="hero" className="py-16 sm:py-24 lg:py-28 relative overflow-hidden">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            187 Privacy-First Tools • All In One Place
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.15]">
            Every Tool You Need.{' '}
            <span className="text-primary-600 dark:text-primary-400">One Clean Workspace.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary mt-5 max-w-2xl mx-auto leading-relaxed">
            Edit PDFs, improve screenshots, convert files, process images and use everyday utilities — without jumping between cluttered websites.
          </p>

          {/* Hero Search Box */}
          <div className="mt-8 sm:mt-10" id="hero-search">
            <SearchBox size="hero" />
          </div>

          {/* Search suggestions pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-text-tertiary">
            <span className="font-medium text-text-secondary mr-1">Popular searches:</span>
            {exampleSearches.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-surface-100 text-text-secondary border border-border-subtle"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Privacy line */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-text-tertiary">
            <svg
              className="w-4 h-4 text-emerald-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Your files stay on your device whenever technically possible</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
