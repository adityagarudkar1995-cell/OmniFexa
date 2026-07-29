import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toolCatalog, getToolBySlug } from '@/lib/tools/catalog';
import { getCategoryMeta } from '@/lib/categories';
import { getToolRobotsMetadata, getToolCanonicalUrl } from '@/lib/seo/indexing';
import Container from '@/components/ui/Container';
import { ToolBreadcrumbs } from '@/components/tools/ToolBreadcrumbs';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { ToolFormatList } from '@/components/tools/ToolFormatList';
import { ToolMetadataPanel } from '@/components/tools/ToolMetadataPanel';
import { ToolPrivacyNotice } from '@/components/tools/ToolPrivacyNotice';
import { PlannedToolState } from '@/components/tools/PlannedToolState';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { ResultWorkspaceShell } from '@/components/result-workspace/ResultWorkspaceShell';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/** Pre-render static params for all 187 tools in canonical catalog */
export async function generateStaticParams() {
  return toolCatalog.map((tool) => ({
    slug: tool.slug,
  }));
}

/** Generate dynamic page metadata with mandatory noindex for planned tools */
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | OmniFexa',
    };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: [...tool.keywords, ...tool.hinglishKeywords],
    alternates: {
      canonical: getToolCanonicalUrl(tool),
    },
    // Mandatory Correction #1 & #2: Enforce page-level noindex for all planned tools
    robots: getToolRobotsMetadata(tool),
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  // Return Next.js 404 for invalid tool slug
  if (!tool) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(tool.category);

  const breadcrumbs = [
    { label: 'Tools', href: '/tools' },
    { label: categoryMeta?.label || tool.category, href: `/tools?category=${tool.category}` },
    { label: tool.name },
  ];

  return (
    <div className="py-8 sm:py-12">
      <Container size="xl">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <ToolBreadcrumbs items={breadcrumbs} />

          {/* Header & Main Info */}
          <ToolHeader tool={tool} />

          {/* Planned Status Banner */}
          <PlannedToolState tool={tool} />

          {/* Privacy Boundary Guarantee */}
          <ToolPrivacyNotice processingMode={tool.processingMode} />

          {/* Universal Result Workspace Shell (Interface Preview) */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-text-primary">
              Workspace Interface Preview
            </h2>
            <p className="text-xs text-text-secondary">
              This preview illustrates how outputs will open inside the Universal Result Workspace once processing is connected.
            </p>
            <ResultWorkspaceShell
              adapterType={tool.resultAdapter}
              toolName={tool.name}
              isPreview={true}
            />
          </div>

          {/* Format Specifications */}
          <ToolFormatList
            inputFormats={tool.inputFormats}
            outputFormats={tool.outputFormats}
          />

          {/* Technical Metadata Panel */}
          <ToolMetadataPanel tool={tool} />

          {/* Related Tools */}
          <RelatedTools currentTool={tool} />
        </div>
      </Container>
    </div>
  );
}
