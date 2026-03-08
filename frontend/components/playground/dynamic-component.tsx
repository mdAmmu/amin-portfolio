'use client';

import { useState } from 'react';
import { PlaygroundComponent } from '@/types';
import { ComponentControl } from './component-controls';

interface DynamicComponentProps {
  componentData: PlaygroundComponent;
}

export function DynamicComponent({ componentData }: DynamicComponentProps) {
  const [props, setProps] = useState(componentData.defaultProps || {});

  const Component = componentData.component;

  const handlePropChange = (propName: string, value: any) => {
    setProps((prev) => ({ ...prev, [propName]: value }));
  };

  return (
    <div className="w-full">
      {/* Live Preview */}
      <div className="relative flex items-center justify-center p-12 min-h-[300px] bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] mb-8 overflow-hidden isolate">
        {/* Container for components - creates positioning context */}
        <div className="relative w-full max-w-full">
          <Component {...props} />
        </div>
      </div>

      {/* Controls */}
      {componentData.controls && componentData.controls.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {componentData.controls.map((control) => (
            <ComponentControl
              key={control.name}
              control={control}
              value={props[control.name]}
              onChange={(value) => handlePropChange(control.name, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
