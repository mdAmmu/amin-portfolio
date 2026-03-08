import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Security: Only allow files from playground-components directory
    const componentsDir = path.join(process.cwd(), 'components/playground-components');
    const filePath = path.join(componentsDir, filename);

    // Verify the file is within the allowed directory
    const realPath = await fs.realpath(filePath).catch(() => null);
    if (!realPath || !realPath.startsWith(componentsDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }

    // Read the file content
    const content = await fs.readFile(filePath, 'utf-8');

    return NextResponse.json({ content, filename });
  } catch (error) {
    console.error('Error reading component source:', error);
    return NextResponse.json(
      { error: 'Failed to read component source' },
      { status: 500 }
    );
  }
}
