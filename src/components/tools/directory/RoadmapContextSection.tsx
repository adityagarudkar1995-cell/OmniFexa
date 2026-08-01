import React from 'react';
import { ShieldCheck, Layers, Lock, Cpu } from 'lucide-react';

export function RoadmapContextSection() {
  return (
    <section className="bg-surface-0 border border-border-default rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
          Roadmap & Integrity
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          How OmniFexa releases tools
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          OmniFexa is releasing tools in verified phases. Coming Soon pages represent the planned roadmap—not unfinished actions presented as working tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="bg-surface-50 border border-border-default rounded-2xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-text-primary">Verified Functional</h3>
          <p className="text-xs text-text-tertiary leading-relaxed">
            Available tools are production-ready and process data reliably on your device.
          </p>
        </div>

        <div className="bg-surface-50 border border-border-default rounded-2xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-text-primary">Phased Roadmap</h3>
          <p className="text-xs text-text-tertiary leading-relaxed">
            185 planned tools represent scheduled document, image, and text capabilities.
          </p>
        </div>

        <div className="bg-surface-50 border border-border-default rounded-2xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-text-primary">Client Processing</h3>
          <p className="text-xs text-text-tertiary leading-relaxed">
            Browser-based processing keeps your files on device without compulsory uploads.
          </p>
        </div>

        <div className="bg-surface-50 border border-border-default rounded-2xl p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-text-primary">No Compulsory Login</h3>
          <p className="text-xs text-text-tertiary leading-relaxed">
            Free browser utilities operate immediately without registration barriers.
          </p>
        </div>
      </div>
    </section>
  );
}
