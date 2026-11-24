// Reformed Books House - Central Admin & Order Management State
// Designed for reliable persistent local storage and intuitive administrator operations.

export interface OrderRecord {
  id: string
  bookId: string
  bookTitle: string
  bookAuthor: string
  format: 'paperback' | 'ebook'
  quantity: number
  price: number
  totalAmount: number
  paymentMethod: 'qr' | 'esewa'
  depositorName: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  shippingAddress?: string
  status: 'PENDING_VERIFICATION' | 'PAYMENT_CONFIRMED' | 'FULFILLED' | 'CANCELLED'
  createdAt: string
  fulfilledAt?: string
  trackingNumber?: string
  adminNotes?: string
}

export interface BankConfig {
  bankName: string
  accountName: string
  accountNumber: string
  branchName: string
  fonepayTerminalId: string
  qrImageUrl: string
  esewaNumber: string
  khaltiNumber: string
  contactPhone: string
  contactEmail: string
}

export const DEFAULT_BANK_CONFIG: BankConfig = {
  bankName: "Sanima Bank Ltd.",
  accountName: "REFORMED BOOKS HOUSE PVT.LTD.",
  accountNumber: "028010010001171",
  branchName: "Kathmandu Main Branch",
  fonepayTerminalId: "2222110015078798",
  qrImageUrl: "/fonepay-qr.jpg",
  esewaNumber: "9801234567",
  khaltiNumber: "9801234567",
  contactPhone: "+977-1-4250000",
  contactEmail: "info@reformedbooks.com"
}

export const INITIAL_SAMPLE_ORDERS: OrderRecord[] = []

const LEGACY_FAKE_ORDER_IDS = new Set(['RBH-7821049', 'RBH-7820912', 'RBH-7819830'])

export function stripFakeSampleOrders(list: OrderRecord[]): OrderRecord[] {
  return list.filter((o) => !LEGACY_FAKE_ORDER_IDS.has(o.id))
}

const ORDERS_STORAGE_KEY = 'reformed_books_orders'
const BANK_STORAGE_KEY = 'reformed_books_bank_config'

export function getStoredOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_ORDERS
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS))
      return INITIAL_SAMPLE_ORDERS
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return INITIAL_SAMPLE_ORDERS
    const cleaned = stripFakeSampleOrders(parsed)
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(cleaned))
    }
    return cleaned
  } catch (e) {
    console.error("Failed to parse stored orders:", e)
    return INITIAL_SAMPLE_ORDERS
  }
}

export const ADMIN_BANK_EVENT = 'reformed_bank_config_updated'

export function saveOrders(orders: OrderRecord[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    fetch('/api/admin-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'saveOrders', orders })
    }).catch(() => {})
  } catch (e) {
    console.error("Failed to save orders:", e)
  }
}

export function addOrder(newOrder: OrderRecord): void {
  const current = getStoredOrders()
  const updated = [newOrder, ...current]
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
      fetch('/api/admin-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addOrder', order: newOrder })
      }).catch(() => {})
    } catch (e) {
      console.error("Failed to add order:", e)
    }
  }
}

export function updateOrderStatus(
  orderId: string, 
  status: OrderRecord['status'], 
  extra?: { trackingNumber?: string; adminNotes?: string }
): OrderRecord[] {
  const current = getStoredOrders()
  const updated = current.map(order => {
    if (order.id === orderId) {
      return {
        ...order,
        status,
        ...(status === 'FULFILLED' ? { fulfilledAt: new Date().toISOString() } : {}),
        ...(extra?.trackingNumber !== undefined ? { trackingNumber: extra.trackingNumber } : {}),
        ...(extra?.adminNotes !== undefined ? { adminNotes: extra.adminNotes } : {})
      }
    }
    return order
  })
  saveOrders(updated)
  return updated
}

export function deleteOrder(orderId: string): OrderRecord[] {
  const current = getStoredOrders()
  const updated = current.filter(o => o.id !== orderId)
  saveOrders(updated)
  return updated
}

export function getStoredBankConfig(): BankConfig {
  if (typeof window === 'undefined') return DEFAULT_BANK_CONFIG
  try {
    const raw = localStorage.getItem(BANK_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(DEFAULT_BANK_CONFIG))
      return DEFAULT_BANK_CONFIG
    }
    return { ...DEFAULT_BANK_CONFIG, ...JSON.parse(raw) }
  } catch (e) {
    return DEFAULT_BANK_CONFIG
  }
}

export function saveBankConfig(config: BankConfig): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(config))
    window.dispatchEvent(new CustomEvent(ADMIN_BANK_EVENT, { detail: config }))
    fetch('/api/admin-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'saveBankConfig', bankConfig: config })
    }).catch(() => {})
  } catch (e) {
    console.error("Failed to save bank config:", e)
  }
}

export async function fetchAdminStore(): Promise<{ orders: OrderRecord[]; bankConfig: BankConfig }> {
  const localOrders = getStoredOrders()
  const localBank = getStoredBankConfig()
  if (typeof window === 'undefined') {
    return { orders: localOrders, bankConfig: localBank }
  }
  try {
    const res = await fetch('/api/admin-store', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      const rawOrders = Array.isArray(data.orders) ? data.orders : localOrders
      const orders = stripFakeSampleOrders(rawOrders)
      const bankConfig = data.bankConfig ? { ...DEFAULT_BANK_CONFIG, ...data.bankConfig } : localBank
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
      localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(bankConfig))
      return { orders, bankConfig }
    }
  } catch {
    // Fallback to localStorage
  }
  return { orders: localOrders, bankConfig: localBank }
}
