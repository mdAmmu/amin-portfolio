// API service for component generation

export interface GenerateComponentRequest {
  prompt: string;
}

export interface GenerateComponentResponse {
  code: string;
  filename: string;
  filepath: string;
}

export async function generateComponent(prompt: string): Promise<GenerateComponentResponse> {
  const response = await fetch('http://localhost:8000/api/generate-component', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate component: ${response.statusText}`);
  }

  return response.json();
}

export interface SaveComponentRequest {
  code: string;
  filename: string;
}

export interface SaveComponentResponse {
  success: boolean;
  message: string;
  filepath?: string;
}

export async function saveGeneratedComponent(code: string, filename: string): Promise<SaveComponentResponse> {
  const response = await fetch('/api/save-component', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, filename }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save component: ${response.statusText}`);
  }

  return response.json();
}
