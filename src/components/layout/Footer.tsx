import Link from 'next/link';
import SiteLogo from '@/components/ui/SiteLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-50 border-t border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="flex flex-col space-y-4">
            <SiteLogo size="sm" />
            <p className="text-sm text-text-secondary">
              Every Tool. One Workspace.
            </p>
            <p className="text-xs text-text-tertiary">
              &copy; {currentYear} OmniFexa
            </p>
          </div>

          {/* Column 2 - PDF Tools */}
          <div>
            <h3 className="font-semibold text-sm text-text-primary mb-4">PDF Tools</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="/tools/compress-pdf" className="hover:text-text-primary transition-colors">Compress PDF</Link></li>
              <li><Link href="/tools/merge-pdf" className="hover:text-text-primary transition-colors">Merge PDF</Link></li>
              <li><Link href="/tools/split-pdf" className="hover:text-text-primary transition-colors">Split PDF</Link></li>
              <li><Link href="/tools/edit-pdf" className="hover:text-text-primary transition-colors">Edit PDF</Link></li>
              <li><Link href="/tools/sign-pdf" className="hover:text-text-primary transition-colors">Sign PDF</Link></li>
            </ul>
          </div>

          {/* Column 3 - More Tools */}
          <div>
            <h3 className="font-semibold text-sm text-text-primary mb-4">More Tools</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="/tools/image-compressor" className="hover:text-text-primary transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/screenshot-editor" className="hover:text-text-primary transition-colors">Screenshot Editor</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-text-primary transition-colors">QR Generator</Link></li>
              <li><Link href="/tools/word-counter" className="hover:text-text-primary transition-colors">Word Counter</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-text-primary transition-colors">JSON Formatter</Link></li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h3 className="font-semibold text-sm text-text-primary mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="/tools" className="hover:text-text-primary transition-colors">All Tools</Link></li>
              <li><span className="hover:text-text-primary transition-colors cursor-default">Privacy Policy</span></li>
              <li><span className="hover:text-text-primary transition-colors cursor-default">Terms of Service</span></li>
              <li>
                <a
                  href="https://github.com/adityagarudkar1995-cell/OmniFexa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-default">
          <p className="text-xs text-text-tertiary text-center sm:text-left">
            Built with privacy in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
