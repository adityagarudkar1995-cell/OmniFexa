import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

export function PrivacySection() {
  const trustItems = [
    {
      title: 'Browser-First Processing',
      description:
        'Most tools process files directly in your browser using modern WebAssembly and Canvas APIs. Your files stay on your device.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      title: 'No Compulsory Login',
      description:
        'Use all core tools instantly without mandatory accounts, paywalls, or forced email sign-ups for basic document tasks.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
    },
    {
      title: 'Result Workspace Review',
      description:
        'Every output opens in a shared, interactive Result Workspace so you can preview, adjust, and confirm before exporting.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      ),
    },
    {
      title: 'Mobile & Desktop Parity',
      description:
        'Designed equally well for mobile touchscreens and desktop monitors with responsive layouts and touch-friendly controls.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      ),
    },
  ];

  return (
    <section id="privacy" className="py-16 sm:py-24">
      <Container size="xl">
        <SectionHeading
          badge="Privacy & Principles"
          title="Built for Privacy and Speed"
          subtitle="Honest software principles — no dark patterns, no fake timers, and client-first processing."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="bg-surface-0 border border-border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>

                <h3 className="font-semibold text-text-primary text-base">{item.title}</h3>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
