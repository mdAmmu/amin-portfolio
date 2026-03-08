// Common types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Playground Component Types
export interface PlaygroundComponent {
  id: string;
  name: string;
  description: string;
  category: 'button' | 'card' | 'form' | 'navigation' | 'animation' | 'layout' | 'feedback' | 'data-display';
  tags: string[];
  thumbnail?: string;
  component: React.ComponentType<any>;
  defaultProps?: Record<string, any>;
  controls?: ComponentControl[];
  code: string;
  filename?: string; // Source filename for fetching full code
}

export interface ComponentControl {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'color';
  defaultValue: any;
  options?: string[] | number[];
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedComponents?: string[];
}
