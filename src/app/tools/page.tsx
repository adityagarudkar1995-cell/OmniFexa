import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { toolCatalog } from '@/lib/tools/catalog';
import { createCatalogProjection } from '@/lib/tools/projection';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ToolCatalogView } from '@/components/tools/ToolCatalogView';

export const metadata: Metadata = {
  title: 'OmniFexa Tool Catalog — 187 Planned Online Tools',
  description:
    'Explore OmniFexa’s planned catalog of PDF, image, screenshot, OCR, document-conversion, text, developer and calculator tools.',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsPage() {
  const projectionCatalog = createCatalogProjection(toolCatalog);

  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <div className="mb-10 text-center">
          <SectionHeading
            badge="Roadmap Catalog"
            title="OmniFexa Planned Tool Catalog"
            subtitle="Explore 187 planned online tools across 15 categories. All tools are currently in development as part of our privacy-first roadmap."
          />
        </div>

        <Suspense
          fallback={
            <div className="p-12 text-center text-text-tertiary bg-surface-0 border border-border-default rounded-2xl">
              Loading catalog tools...
            </div>
          }
        >
          <ToolCatalogView catalog={projectionCatalog} />
        </Suspense>
      </Container>
    </div>
  );
}
