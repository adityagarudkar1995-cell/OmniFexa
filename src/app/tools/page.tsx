import type { Metadata } from 'next';
import { toolCatalog } from '@/lib/tools/catalog';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ToolCatalogView, type ToolCatalogProjectionEntry } from '@/components/tools/ToolCatalogView';

export const metadata: Metadata = {
  title: 'Tool Catalog — 187 Free Online Utilities | OmniFexa',
  description:
    'Browse OmniFexa’s complete catalog of 187 privacy-first online tools for PDF, images, document conversion, text, developer utilities, and calculators.',
  alternates: {
    canonical: '/tools',
  },
};

interface ToolsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    phase?: string;
  }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;

  // Minimal serializable catalog projection for client filtering (Mandatory Correction #4)
  const projectionCatalog: ToolCatalogProjectionEntry[] = toolCatalog.map((tool) => ({
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    shortDescription: tool.shortDescription,
    category: tool.category,
    subcategory: tool.subcategory,
    keywords: tool.keywords,
    hinglishKeywords: tool.hinglishKeywords,
    phase: tool.phase,
    implementationStatus: tool.implementationStatus,
    processingMode: tool.processingMode,
    resultAdapter: tool.resultAdapter,
    inputFormats: tool.inputFormats,
    outputFormats: tool.outputFormats,
    featured: tool.featured,
  }));

  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Tool Catalog"
            title="All 187 Online Tools & Utilities"
            subtitle="Search and filter through our full planned catalog. Filter by category, processing mode, or implementation phase."
          />
        </div>

        <ToolCatalogView
          catalog={projectionCatalog}
          initialCategory={params.category || ''}
          initialQuery={params.q || ''}
          initialPhase={params.phase || ''}
        />
      </Container>
    </div>
  );
}
