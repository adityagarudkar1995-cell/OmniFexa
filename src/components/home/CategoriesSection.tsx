import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { getCategoryCounts } from '@/lib/categories';
import { toolCatalog } from '@/lib/tools/catalog';

export function CategoriesSection() {
  const categories = getCategoryCounts(toolCatalog);

  return (
    <section id="categories" className="py-16 sm:py-24">
      <Container size="xl">
        <SectionHeading
          badge="Browse Catalog"
          title="Explore All Tool Categories"
          subtitle="187 planned tools organised across 15 specialised categories for every digital task."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.key} category={cat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
