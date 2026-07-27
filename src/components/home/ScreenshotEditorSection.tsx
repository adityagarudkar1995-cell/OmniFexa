import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';

export function ScreenshotEditorSection() {
  const features = [
    'Crop, rotate, flip and perspective correction',
    'Blur and redact sensitive numbers or personal details',
    'Highlighter, freehand drawing, arrows and callouts',
    'Numbered step badges for tutorials and bug reports',
    'Magnifier spotlight and layer management',
    'Export in WebP, PNG, JPG with multi-screenshot stitching',
  ];

  return (
    <section id="screenshot-editor" className="py-16 sm:py-24 bg-surface-50 border-y border-border-default">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary">Flagship Tool</Badge>
              <Badge variant="status">In Development</Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Flagship Screenshot Editor
            </h2>

            <p className="text-base sm:text-lg text-text-secondary mt-4 leading-relaxed">
              Annotate, redact, and highlight screenshots in seconds right inside your browser. No software installation or sign-up required.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — CSS Mock Preview */}
          <div className="bg-surface-0 border border-border-default rounded-2xl shadow-xl overflow-hidden">
            {/* Window bar */}
            <div className="h-10 bg-surface-100 border-b border-border-default flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-mono text-text-tertiary">OmniFexa Screenshot Studio</span>
              <div className="w-12" />
            </div>

            {/* Toolbar */}
            <div className="h-11 bg-surface-50 border-b border-border-subtle flex items-center justify-between px-4 text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded bg-primary-600 text-white text-xs font-medium">Select</div>
                <div className="px-2.5 py-1 rounded hover:bg-surface-200 text-xs font-medium">Arrow</div>
                <div className="px-2.5 py-1 rounded hover:bg-surface-200 text-xs font-medium">Text</div>
                <div className="px-2.5 py-1 rounded hover:bg-surface-200 text-xs font-medium">Blur</div>
                <div className="px-2.5 py-1 rounded hover:bg-surface-200 text-xs font-medium">Crop</div>
              </div>
              <div className="text-xs text-text-tertiary font-mono">1920 × 1080</div>
            </div>

            {/* Canvas mockup */}
            <div className="aspect-[16/10] bg-surface-100 relative p-6 flex flex-col justify-between overflow-hidden">
              {/* Simulated UI screenshot element */}
              <div className="w-full h-full bg-surface-0 rounded-xl border border-border-default p-4 shadow-sm relative flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <div className="h-4 w-32 bg-surface-200 rounded" />
                  <div className="h-6 w-16 bg-primary-100 dark:bg-primary-900/40 rounded" />
                </div>

                <div className="space-y-3 my-4">
                  <div className="h-3 w-3/4 bg-surface-200 rounded" />
                  <div className="h-3 w-1/2 bg-surface-200 rounded" />
                </div>

                {/* Simulated Redaction / Blur block */}
                <div className="absolute top-12 right-6 w-36 h-10 bg-slate-800/80 backdrop-blur-md rounded-lg border border-slate-700 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-slate-300 tracking-widest">[REDACTED]</span>
                </div>

                {/* Simulated Arrow annotation */}
                <div className="absolute bottom-10 left-12 flex items-center gap-2">
                  <div className="w-24 h-0.5 bg-rose-500 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-rose-500 rotate-45" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-semibold">Step 1</span>
                </div>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="h-8 bg-surface-50 border-t border-border-default flex items-center justify-between px-4 text-[11px] text-text-tertiary font-mono">
              <span>Zoom: 100%</span>
              <span>Client-side Canvas</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
