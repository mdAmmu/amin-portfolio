import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { code, filename } = await request.json();

    if (!code || !filename) {
      return NextResponse.json(
        { success: false, message: 'Code and filename are required' },
        { status: 400 }
      );
    }

    // Ensure the filename ends with .tsx
    const tsxFilename = filename.endsWith('.tsx') ? filename : `${filename}.tsx`;

    // Define the path where components will be saved
    const componentsDir = join(process.cwd(), 'components', 'playground-components');
    
    // Ensure directory exists
    if (!existsSync(componentsDir)) {
      await mkdir(componentsDir, { recursive: true });
    }

    const filepath = join(componentsDir, tsxFilename);

    // Write the component file
    await writeFile(filepath, code, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Component saved successfully',
      filepath: filepath,
      filename: tsxFilename,
    });
  } catch (error) {
    console.error('Error saving component:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save component', error: String(error) },
      { status: 500 }
    );
  }
}
