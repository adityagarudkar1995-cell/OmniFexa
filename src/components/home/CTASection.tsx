import Container from '@/components/ui/Container';
import { SearchBox } from '@/components/search/SearchBox';

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-surface-50 border-t border-border-default">
      <Container size="md">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Ready to Start Processing Files?
          </h2>
          <p className="text-base sm:text-lg text-text-secondary mt-3 max-w-xl mx-auto">
            Search for any tool across our 187-tool catalog. No account or installation required.
          </p>

          <div className="mt-8 max-w-xl mx-auto">
            <SearchBox size="compact" />
          </div>

          <p className="text-xs sm:text-sm text-text-tertiary mt-4">
            187 planned tools • Privacy-first • Mobile & desktop ready
          </p>
        </div>
      </Container>
    </section>
  );
}
