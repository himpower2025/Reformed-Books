import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { DEFAULT_BANK_CONFIG, INITIAL_SAMPLE_ORDERS, OrderRecord, BankConfig } from '@/lib/admin-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const ADMIN_FILE = path.join(DATA_DIR, 'admin-store.json')

interface AdminStorePayload {
  orders: OrderRecord[]
  bankConfig: BankConfig
}

async function readStore(): Promise<AdminStorePayload> {
  try {
    const raw = await fs.readFile(ADMIN_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return {
      orders: Array.isArray(parsed.orders) ? parsed.orders : INITIAL_SAMPLE_ORDERS,
      bankConfig: { ...DEFAULT_BANK_CONFIG, ...(parsed.bankConfig || {}) }
    }
  } catch {
    return {
      orders: INITIAL_SAMPLE_ORDERS,
      bankConfig: DEFAULT_BANK_CONFIG
    }
  }
}

async function writeStore(payload: AdminStorePayload): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(ADMIN_FILE, JSON.stringify(payload, null, 2), 'utf-8')
}

export async function GET() {
  const store = await readStore()
  return NextResponse.json(store)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const current = await readStore()

    if (body.action === 'addOrder' && body.order) {
      const next: AdminStorePayload = {
        ...current,
        orders: [body.order, ...current.orders]
      }
      await writeStore(next)
      return NextResponse.json({ ok: true, ...next })
    }

    if (body.action === 'saveOrders' && Array.isArray(body.orders)) {
      const next: AdminStorePayload = {
        ...current,
        orders: body.orders
      }
      await writeStore(next)
      return NextResponse.json({ ok: true, ...next })
    }

    if (body.action === 'saveBankConfig' && body.bankConfig) {
      const next: AdminStorePayload = {
        ...current,
        bankConfig: { ...DEFAULT_BANK_CONFIG, ...body.bankConfig }
      }
      await writeStore(next)
      return NextResponse.json({ ok: true, ...next })
    }

    return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Admin store error:', error)
    return NextResponse.json({ ok: false, error: 'Failed to update admin store' }, { status: 500 })
  }
}
