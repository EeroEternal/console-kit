import React from 'react';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const DashboardPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-xs text-muted-foreground mt-1">{t('dashboard.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{t('dashboard.serviceStatus')}</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold mt-2">Active</div>
          <span className="inline-flex items-center text-[10px] text-emerald-600 font-medium mt-1">
            ● {t('dashboard.healthy')}
          </span>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Mesh Gateway</span>
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold mt-2">Axum 0.8</div>
          <span className="text-[10px] text-muted-foreground mt-1">Rust 2024 Edition</span>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Agent Policy</span>
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold mt-2">Enforced</div>
          <span className="text-[10px] text-muted-foreground mt-1">Standing Constraints Active</span>
        </div>
      </div>
    </div>
  );
};
