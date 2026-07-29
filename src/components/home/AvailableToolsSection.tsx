import React from 'react';
import Link from 'next/link';
import { toolCatalog } from '@/lib/tools/catalog';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { ToolCard } from '@/components/ui/ToolCard';

export function AvailableToolsSection() {
  const availableTools = toolCatalog.filter((t) => t.implementationStatus === 'production');

  if (availableTools.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-surface-50 border-b border-border-default">
      <Container size="xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <SectionHeading
            badge="Available Now"
            title="Production-Ready Online Tools"
            subtitle="Explore our live, privacy-first browser utilities. Processing stays on your device."
          />
          <Link
            href="/tools?status=production"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            View all available tools →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {availableTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
              <ToolCard tool={tool} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
