import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { toolCatalog } from '@/lib/tools/catalog';
import { createCatalogProjection } from '@/lib/tools/projection';
import Container from '@/components/ui/Container';
import { ToolCatalogView } from '@/components/tools/ToolCatalogView';

export const metadata: Metadata = {
  title: 'OmniFexa Tool Directory — Online Tools & Roadmap',
  description:
    'Use available browser utilities like Word Counter and Case Converter now, and explore OmniFexa’s 187-tool privacy-first roadmap across PDF, image, developer, and text utilities.',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsPage() {
  const projectionCatalog = createCatalogProjection(toolCatalog);

  return (
    <div className="pt-6 sm:pt-10 pb-16">
      <Container size="xl">
        <Suspense
          fallback={
            <div className="p-12 text-center text-text-tertiary bg-surface-0 border border-border-default rounded-3xl">
              Loading tools directory...
            </div>
          }
        >
          <ToolCatalogView catalog={projectionCatalog} />
        </Suspense>
      </Container>
    </div>
  );
}
