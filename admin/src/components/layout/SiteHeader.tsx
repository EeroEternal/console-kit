import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export const SiteHeader: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Console</span>
        <span>/</span>
        <span>Overview</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{locale === 'zh' ? 'English' : '中文'}</span>
        </button>
      </div>
    </header>
  );
};
