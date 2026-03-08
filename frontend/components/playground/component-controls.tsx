'use client';

import { ComponentControl as ComponentControlType } from '@/types';

interface ComponentControlProps {
  control: ComponentControlType;
  value: any;
  onChange: (value: any) => void;
}

export function ComponentControl({ control, value, onChange }: ComponentControlProps) {
  const renderControl = () => {
    switch (control.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] 
                     border border-[var(--border)] text-[var(--text-primary)]
                     focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => onChange(Number(e.target.value))}
            min={control.min}
            max={control.max}
            step={control.step || 1}
            className="w-full px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] 
                     border border-[var(--border)] text-[var(--text-primary)]
                     focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[var(--border)] rounded-full peer 
                            peer-checked:bg-[var(--accent)] transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                            transition-transform peer-checked:translate-x-5"></div>
            </div>
            <span className="text-sm text-[var(--text-secondary)]">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value || control.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] 
                     border border-[var(--border)] text-[var(--text-primary)]
                     focus:outline-none focus:border-[var(--accent)] transition-colors
                     cursor-pointer"
          >
            {control.options?.map((option) => (
              <option key={String(option)} value={option}>
                {String(option)}
              </option>
            ))}
          </select>
        );

      case 'color':
        return (
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--border)]"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] 
                       border border-[var(--border)] text-[var(--text-primary)]
                       focus:outline-none focus:border-[var(--accent)] transition-colors
                       font-mono text-sm"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--text-primary)]">
        {control.label}
      </label>
      {renderControl()}
    </div>
  );
}
