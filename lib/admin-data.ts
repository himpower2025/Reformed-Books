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

export function saveOrders(orders: OrderRecord[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  } catch (e) {
    console.error("Failed to save orders:", e)
  }
}

export function addOrder(newOrder: OrderRecord): void {
  const current = getStoredOrders()
  const updated = [newOrder, ...current]
  saveOrders(updated)
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
  } catch (e) {
    console.error("Failed to save bank config:", e)
  }
}
