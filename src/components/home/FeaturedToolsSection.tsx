import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ToolCard } from '@/components/ui/ToolCard';
import { getFeaturedTools } from '@/lib/tools/catalog';

export function FeaturedToolsSection() {
  const featuredTools = getFeaturedTools().slice(0, 12);

  return (
    <section id="featured-tools" className="py-16 sm:py-24 bg-surface-50">
      <Container size="xl">
        <SectionHeading
          badge="Popular Tools"
          title="Most-Used Utilities"
          subtitle="The tools people reach for first — fast, clean, and accessible on any device."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  );
}
