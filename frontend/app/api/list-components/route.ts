import { NextRequest, NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const componentsDir = join(process.cwd(), 'components', 'playground-components');
    
    // Read all .tsx files from the directory
    const files = await readdir(componentsDir);
    const componentFiles = files.filter(file => 
      file.endsWith('.tsx') && 
      !file.startsWith('_') && 
      !file.includes('COMPONENT_GUIDE') &&
      !file.includes('README')
    );

    return NextResponse.json({
      success: true,
      components: componentFiles,
      count: componentFiles.length,
    });
  } catch (error) {
    console.error('Error listing components:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to list components', error: String(error) },
      { status: 500 }
    );
  }
}
