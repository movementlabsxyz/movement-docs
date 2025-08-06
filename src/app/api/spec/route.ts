import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

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