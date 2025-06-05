// Space Owner Model
export interface SpaceOwner {
  id: string
  fullName: string
  companyName?: string
  contactPerson: string
  phone: string
  email: string
  address: string
  pincode: string
  landmark?: string
  createdAt: Date
  updatedAt: Date
}

// Space Model
export interface Space {
  id: string
  ownerId: string
  name: string
  spaceType: string
  address: string
  city: string
  spaceSize: number
  footfallWeekday: number
  footfallWeekend: number
  ageGroup: string
  incomeSegment: string
  hasCameras: boolean
  cameraCount?: number
  cameraType?: string
  cameraAccessible?: boolean
  photos: string[]
  status: "active" | "inactive" | "pending"
  createdAt: Date
  updatedAt: Date
}

// Brand/Advertiser Model
export interface Brand {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  industryType: string
  website?: string
  socialLinks?: string[]
  createdAt: Date
  updatedAt: Date
}

// Vendor Model
export interface Vendor {
  id: string
  companyName: string
  contactPerson: string
  phone: string
  email: string
  serviceCategory: string[]
  operationalCities: string[]
  hasDelivery: boolean
  avgTurnaroundTime: string
  gstNumber?: string
  panNumber?: string
  bankDetails: {
    bankName: string
    branch: string
    accountNumber: string
    ifscCode: string
  }
  status: "active" | "inactive" | "pending"
  createdAt: Date
  updatedAt: Date
}

// BlookForce Agent Model
export interface BlookForceAgent {
  id: string
  fullName: string
  phone: string
  email: string
  city: string
  languages: string[]
  salesExperience: boolean
  availability: "full-time" | "part-time" | "flexible"
  panNumber: string
  aadhaarNumber?: string
  aadhaarDocument?: string // File path/URL
  selfiePhoto?: string // File path/URL
  documentsVerified: boolean
  bankDetails: {
    bankName: string
    branch: string
    accountNumber: string
    ifscCode: string
  }
  status: "pending" | "documents_pending" | "verified" | "active" | "inactive" | "rejected"
  createdAt: Date
  updatedAt: Date
}

// Campaign Model
export interface Campaign {
  id: string
  brandId: string
  spaceId: string
  name: string
  description?: string
  startDate: Date
  endDate: Date
  campaignType: string
  budget: number
  status: "draft" | "pending" | "active" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

// BlookPerks Campaign Model
export interface BlookPerksCampaign {
  id: string
  spaceId: string
  name: string
  description?: string
  campaignType: "spin-to-win" | "scratch-card" | "lucky-draw" | "survey" | "coupon"
  startDate: Date
  endDate: Date
  rewards: {
    type: string
    value: string
    quantity: number
    remaining: number
  }[]
  qrCode: string
  status: "draft" | "active" | "completed" | "cancelled"
  analytics: {
    scans: number
    engagements: number
    redemptions: number
  }
  createdAt: Date
  updatedAt: Date
}

// BlookWorks Job Model
export interface BlookWorksJob {
  id: string
  campaignId: string
  vendorId?: string
  jobType: "printing" | "fabrication" | "installation" | "deployment"
  description: string
  locations: string[]
  deliverables: string[]
  timeline: Date
  budget: number
  status: "open" | "assigned" | "in-progress" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

// BlookForce Commission Model
export interface BlookForceCommission {
  id: string
  agentId: string
  referralType: "space" | "brand" | "vendor"
  referredId: string
  amount: number
  status: "pending" | "paid"
  paymentDate?: Date
  createdAt: Date
  updatedAt: Date
}
