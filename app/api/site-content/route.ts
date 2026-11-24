import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { DEFAULT_SITE_CONTENT, mergeWithDefaults } from '@/lib/site-content'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'site-content.json')

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return NextResponse.json({ content: mergeWithDefaults(parsed), source: 'server' })
  } catch {
    return NextResponse.json({ content: DEFAULT_SITE_CONTENT, source: 'defaults' })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const merged = mergeWithDefaults(body)
    merged.updatedAt = new Date().toISOString()

    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(merged, null, 2), 'utf-8')

    return NextResponse.json({ ok: true, content: merged })
  } catch (error) {
    console.error('Failed to persist site content:', error)
    return NextResponse.json(
      { ok: false, error: 'Could not write to server storage; saved locally instead.' },
      { status: 500 }
    )
  }
}
