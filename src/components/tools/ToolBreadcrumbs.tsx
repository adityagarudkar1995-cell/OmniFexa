import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function ToolBreadcrumbs({ items }: ToolBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs sm:text-sm text-text-tertiary">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li>
          <Link href="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li aria-hidden="true" className="text-text-tertiary select-none">
              /
            </li>
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-text-primary font-medium">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
