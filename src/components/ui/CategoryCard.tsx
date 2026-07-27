'use client';

import { CATEGORY_ICONS } from './category-icons';
import type { CategoryDisplay } from '@/lib/categories';

interface CategoryCardProps {
  category: CategoryDisplay;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.iconName && CATEGORY_ICONS[category.iconName]
    ? CATEGORY_ICONS[category.iconName]
    : CATEGORY_ICONS.Wand2;

  return (
    <div className="bg-surface-0 border border-border-default rounded-2xl p-5 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-default">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="font-semibold text-text-primary text-base">{category.label}</h3>
          <p className="text-sm text-text-secondary mt-1">{category.description}</p>
          <span className="text-xs text-text-tertiary mt-3 font-medium">
            {category.count} tools
          </span>
        </div>
      </div>
    </div>
  );
}
