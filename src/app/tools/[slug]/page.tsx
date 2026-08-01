import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toolCatalog, getToolBySlug } from '@/lib/tools/catalog';
import { getToolRobotsMetadata, getToolCanonicalPath } from '@/lib/seo/indexing';
import Container from '@/components/ui/Container';
import { ToolBreadcrumbs } from '@/components/tools/ToolBreadcrumbs';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { ToolMetadataPanel } from '@/components/tools/ToolMetadataPanel';
import { ToolFormatList } from '@/components/tools/ToolFormatList';
import { ToolPrivacyNotice } from '@/components/tools/ToolPrivacyNotice';
import { PlannedToolState } from '@/components/tools/PlannedToolState';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { ResultWorkspaceShell } from '@/components/result-workspace/ResultWorkspaceShell';
import { isToolImplemented } from '@/lib/tools/implementation-registry';
import { ToolImplementationRenderer } from '@/components/tools/ToolImplementationRenderer';
import { getCategoryMeta } from '@/lib/categories';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/** Pre-render static paths for all 187 catalog tools */
export async function generateStaticParams() {
  return toolCatalog.map((tool) => ({
    slug: tool.slug,
  }));
}

/** Generate dynamic SEO metadata per tool */
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: [...tool.keywords, ...tool.hinglishKeywords],
    robots: getToolRobotsMetadata(tool),
    alternates: {
      canonical: getToolCanonicalPath(tool),
    },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const isImplemented = isToolImplemented(tool.slug);
  const categoryMeta = getCategoryMeta(tool.category);

  const breadcrumbItems = [
    { label: 'Tools', href: '/tools' },
    { label: categoryMeta?.label || tool.category, href: `/tools?category=${tool.category}` },
    { label: tool.name },
  ];

  return (
    <div className="py-8 sm:py-12">
      <Container size="xl">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <ToolBreadcrumbs items={breadcrumbItems} />

          {/* Header */}
          <ToolHeader tool={tool} />

          {/* If implemented -> render live tool engine; if planned -> render planned state banner & disabled preview */}
          {isImplemented ? (
            <ToolImplementationRenderer tool={tool} />
          ) : (
            <>
              <PlannedToolState tool={tool} />
              <ResultWorkspaceShell
                adapterType={tool.resultAdapter}
                toolName={tool.name}
                isPreview={true}
              />
            </>
          )}

          {/* Metadata & Technical Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-border-default">
            <div className="lg:col-span-2 space-y-6">
              <ToolFormatList
                inputFormats={tool.inputFormats}
                outputFormats={tool.outputFormats}
              />
              <ToolPrivacyNotice processingMode={tool.processingMode} />
            </div>

            <div>
              <ToolMetadataPanel tool={tool} />
            </div>
          </div>

          {/* Related Tools */}
          <RelatedTools currentTool={tool} />
        </div>
      </Container>
    </div>
  );
}
