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

export const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: "RBH-7821049",
    bookId: "1",
    bookTitle: "Sovereignty of Grace",
    bookAuthor: "Dr. James Mitchell",
    format: "paperback",
    quantity: 1,
    price: 24.99,
    totalAmount: 24.99,
    paymentMethod: "qr",
    depositorName: "Aarav Sharma",
    buyerName: "Aarav Sharma",
    buyerEmail: "aarav.sharma@gmail.com",
    buyerPhone: "+977-9841234567",
    shippingAddress: "House 24, Patan Dhoka Road, Lalitpur, Bagmati Province, Nepal",
    status: "PENDING_VERIFICATION",
    createdAt: "2026-10-26T14:30:00Z",
    adminNotes: "Customer deposited via Sanima Bank Fonepay QR. Awaiting bank statement check."
  },
  {
    id: "RBH-7820912",
    bookId: "3",
    bookTitle: "Solitude & Prayer",
    bookAuthor: "Alethea Sterling",
    format: "ebook",
    quantity: 1,
    price: 15.99,
    totalAmount: 15.99,
    paymentMethod: "esewa",
    depositorName: "Pooja Gurung",
    buyerName: "Pooja Gurung",
    buyerEmail: "pooja.gurung@outlook.com",
    buyerPhone: "+977-9801987654",
    status: "PAYMENT_CONFIRMED",
    createdAt: "2026-10-25T11:15:00Z",
    adminNotes: "eSewa transfer verified. Digital PDF download link ready to email."
  },
  {
    id: "RBH-7819830",
    bookId: "2",
    bookTitle: "The Covenant Path",
    bookAuthor: "Rev. Thomas Vance",
    format: "paperback",
    quantity: 2,
    price: 19.99,
    totalAmount: 39.98,
    paymentMethod: "qr",
    depositorName: "Sunil Thapa",
    buyerName: "Sunil Thapa",
    buyerEmail: "sunil.thapa@gmail.com",
    buyerPhone: "+977-9851029384",
    shippingAddress: "Shanti Marga, New Baneshwor, Kathmandu, Nepal",
    status: "FULFILLED",
    createdAt: "2026-10-24T09:00:00Z",
    fulfilledAt: "2026-10-24T16:20:00Z",
    trackingNumber: "NP-EXP-44021",
    adminNotes: "Dispatched via Kathmandu Courier express. Tracking link emailed."
  }
]

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
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_ORDERS
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
      const orders = Array.isArray(data.orders) ? data.orders : localOrders
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
