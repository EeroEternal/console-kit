import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Server, Settings, Cpu } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { cn } from '../../lib/utils';

export const AppSidebar: React.FC = () => {
  const { t } = useI18n();

  const navItems = [
    { to: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: '/workers', label: t('nav.workers'), icon: Server },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar-background flex flex-col h-screen select-none">
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-sidebar-border font-medium text-foreground">
        <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
          <Cpu className="w-4 h-4" />
        </div>
        <span className="text-sm tracking-tight font-semibold">Agentic Admin</span>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
