import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const componentsDir = path.join(process.cwd(), 'components/playground-components');
    const files = await fs.readdir(componentsDir);
    
    // Filter for .tsx files, exclude template and index files
    const componentFiles = files.filter(
      (file) => file.endsWith('.tsx') && !file.startsWith('_') && file !== 'index.tsx'
    );

    // Read each file and extract metadata
    const components = await Promise.all(
      componentFiles.map(async (file) => {
        const filePath = path.join(componentsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract component name from file (convert kebab-case to PascalCase)
        const componentName = file
          .replace('.tsx', '')
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');

        return {
          filename: file,
          componentName,
          path: `/components/playground-components/${file}`,
        };
      })
    );

    return NextResponse.json({ components });
  } catch (error) {
    console.error('Error reading components:', error);
    return NextResponse.json(
      { error: 'Failed to load components' },
      { status: 500 }
    );
  }
}
