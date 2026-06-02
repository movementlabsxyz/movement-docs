import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Static-export compatible — the YAML is read at build time and emitted
// as a plain file in the build output.
export const dynamic = 'force-static';

export async function GET() {
  try {
    const specPath = join(process.cwd(), 'public', 'spec.yaml');
    const specContent = readFileSync(specPath, 'utf-8');
    
    return new NextResponse(specContent, {
      headers: {
        'Content-Type': 'application/yaml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error reading spec file:', error);
    return new NextResponse('Spec file not found', { status: 404 });
  }
} 