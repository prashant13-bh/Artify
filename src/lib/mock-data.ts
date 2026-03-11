export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: "t-shirt" | "hoodie" | "jacket" | "cap" | "tote";
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: string;
}

export interface AIDesign {
  id: string;
  prompt: string;
  imageUrl: string;
  creator: { name: string; avatar: string };
  likes: number;
  remixes: number;
  createdAt: string;
  productType: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerAvatar: string;
  product: string;
  designType: "DTF Print" | "Embroidery" | "Ready-Made";
  status: "todo" | "in-production" | "ready";
  pincode: string;
  city: string;
  amount: number;
  createdAt: string;
  designPreview: string;
  isSYOG: boolean;
}

export interface Seller {
  id: string;
  name: string;
  shopName: string;
  avatar: string;
  city: string;
  pincode: string;
  rating: number;
  totalOrders: number;
  revenue: number;
  commission: number;
  status: "active" | "pending" | "suspended";
  joinedAt: string;
  capabilities: string[];
}

export interface Payout {
  id: string;
  sellerName: string;
  amount: number;
  commission: number;
  netPayout: number;
  status: "pending" | "processing" | "completed";
  date: string;
}

// ========== MOCK DATA ==========

export const mockProducts: Product[] = [
  {
    id: "p1", name: "Classic Oversized Tee", price: 799, originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "t-shirt", colors: ["#0f0f0f", "#ffffff", "#6C3CE1", "#ef4444"],
    sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.8, reviews: 234, badge: "Bestseller"
  },
  {
    id: "p2", name: "Premium Zip Hoodie", price: 1499, originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    category: "hoodie", colors: ["#18181b", "#334155", "#6C3CE1"],
    sizes: ["S", "M", "L", "XL"], rating: 4.9, reviews: 187, badge: "New"
  },
  {
    id: "p3", name: "Street Art Jacket", price: 2299, originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    category: "jacket", colors: ["#0f0f0f", "#1e3a5f"],
    sizes: ["M", "L", "XL"], rating: 4.7, reviews: 92
  },
  {
    id: "p4", name: "Minimalist Tee", price: 599, originalPrice: 999,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop",
    category: "t-shirt", colors: ["#ffffff", "#f5f5dc", "#d1d5db"],
    sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.6, reviews: 312
  },
  {
    id: "p5", name: "Drop Shoulder Oversized", price: 899, originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    category: "t-shirt", colors: ["#0f0f0f", "#6C3CE1", "#22c55e"],
    sizes: ["M", "L", "XL"], rating: 4.8, reviews: 156, badge: "Trending"
  },
  {
    id: "p6", name: "Canvas Tote Bag", price: 449, originalPrice: 699,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop",
    category: "tote", colors: ["#f5f5dc", "#0f0f0f"],
    sizes: ["One Size"], rating: 4.5, reviews: 89
  },
  {
    id: "p7", name: "Snapback Cap", price: 399, originalPrice: 599,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=500&fit=crop",
    category: "cap", colors: ["#0f0f0f", "#ffffff", "#ef4444"],
    sizes: ["One Size"], rating: 4.4, reviews: 201
  },
  {
    id: "p8", name: "Fleece Pullover Hoodie", price: 1299, originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop",
    category: "hoodie", colors: ["#334155", "#6C3CE1", "#22c55e"],
    sizes: ["S", "M", "L", "XL"], rating: 4.7, reviews: 143, badge: "Premium"
  },
];

export const mockAIDesigns: AIDesign[] = [
  {
    id: "ai1", prompt: "Cyberpunk samurai warrior with neon glow",
    imageUrl: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&h=400&fit=crop",
    creator: { name: "PixelNinja", avatar: "https://i.pravatar.cc/40?img=1" },
    likes: 342, remixes: 28, createdAt: "2026-03-10T10:30:00", productType: "Hoodie"
  },
  {
    id: "ai2", prompt: "Abstract galaxy wolf in watercolor style",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop",
    creator: { name: "ArtSoul", avatar: "https://i.pravatar.cc/40?img=2" },
    likes: 218, remixes: 15, createdAt: "2026-03-09T18:00:00", productType: "T-Shirt"
  },
  {
    id: "ai3", prompt: "Japanese wave with modern geometric patterns",
    imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d789a8ce?w=400&h=400&fit=crop",
    creator: { name: "WaveRider", avatar: "https://i.pravatar.cc/40?img=3" },
    likes: 567, remixes: 45, createdAt: "2026-03-11T06:00:00", productType: "Jacket"
  },
  {
    id: "ai4", prompt: "Retro 80s synthwave sunset with palm trees",
    imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=400&fit=crop",
    creator: { name: "SynthKing", avatar: "https://i.pravatar.cc/40?img=4" },
    likes: 891, remixes: 72, createdAt: "2026-03-08T14:00:00", productType: "T-Shirt"
  },
  {
    id: "ai5", prompt: "Minimalist botanical line art flowers",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop",
    creator: { name: "FloraDesign", avatar: "https://i.pravatar.cc/40?img=5" },
    likes: 453, remixes: 34, createdAt: "2026-03-10T22:00:00", productType: "Tote"
  },
  {
    id: "ai6", prompt: "Dark fantasy dragon with fire breath",
    imageUrl: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop",
    creator: { name: "DragonForge", avatar: "https://i.pravatar.cc/40?img=6" },
    likes: 1023, remixes: 89, createdAt: "2026-03-07T09:00:00", productType: "Hoodie"
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001", customerName: "Rahul Sharma", customerAvatar: "https://i.pravatar.cc/40?img=10",
    product: "Classic Oversized Tee", designType: "DTF Print", status: "todo",
    pincode: "560001", city: "Bangalore", amount: 1299, createdAt: "2026-03-11T08:00:00",
    designPreview: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=200&h=200&fit=crop",
    isSYOG: false
  },
  {
    id: "ORD-002", customerName: "Priya Patel", customerAvatar: "https://i.pravatar.cc/40?img=11",
    product: "Premium Zip Hoodie", designType: "Embroidery", status: "todo",
    pincode: "400001", city: "Mumbai", amount: 1899, createdAt: "2026-03-11T07:30:00",
    designPreview: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=200&h=200&fit=crop",
    isSYOG: false
  },
  {
    id: "ORD-003", customerName: "Amit Kumar", customerAvatar: "https://i.pravatar.cc/40?img=12",
    product: "Street Art Jacket", designType: "DTF Print", status: "in-production",
    pincode: "110001", city: "Delhi", amount: 2799, createdAt: "2026-03-10T15:00:00",
    designPreview: "https://images.unsplash.com/photo-1579762715118-a6f1d789a8ce?w=200&h=200&fit=crop",
    isSYOG: true
  },
  {
    id: "ORD-004", customerName: "Sneha Reddy", customerAvatar: "https://i.pravatar.cc/40?img=13",
    product: "Canvas Tote Bag", designType: "DTF Print", status: "in-production",
    pincode: "500001", city: "Hyderabad", amount: 849, createdAt: "2026-03-10T12:00:00",
    designPreview: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=200&h=200&fit=crop",
    isSYOG: false
  },
  {
    id: "ORD-005", customerName: "Vikram Singh", customerAvatar: "https://i.pravatar.cc/40?img=14",
    product: "Minimalist Tee", designType: "Embroidery", status: "ready",
    pincode: "302001", city: "Jaipur", amount: 999, createdAt: "2026-03-09T18:00:00",
    designPreview: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop",
    isSYOG: false
  },
  {
    id: "ORD-006", customerName: "Meera Iyer", customerAvatar: "https://i.pravatar.cc/40?img=15",
    product: "Fleece Pullover Hoodie", designType: "DTF Print", status: "ready",
    pincode: "600001", city: "Chennai", amount: 1799, createdAt: "2026-03-09T10:00:00",
    designPreview: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=200&h=200&fit=crop",
    isSYOG: true
  },
];

export const mockSellers: Seller[] = [
  {
    id: "s1", name: "Rajesh Verma", shopName: "PrintHub Studio", avatar: "https://i.pravatar.cc/40?img=20",
    city: "Bangalore", pincode: "560001", rating: 4.9, totalOrders: 456, revenue: 892000,
    commission: 20, status: "active", joinedAt: "2025-06-15",
    capabilities: ["DTF Printing", "Embroidery", "Screen Print"]
  },
  {
    id: "s2", name: "Fatima Sheikh", shopName: "StitchCraft", avatar: "https://i.pravatar.cc/40?img=21",
    city: "Mumbai", pincode: "400001", rating: 4.8, totalOrders: 312, revenue: 645000,
    commission: 18, status: "active", joinedAt: "2025-08-20",
    capabilities: ["Embroidery", "Hand Stitch"]
  },
  {
    id: "s3", name: "Karan Malhotra", shopName: "InkWorks", avatar: "https://i.pravatar.cc/40?img=22",
    city: "Delhi", pincode: "110001", rating: 4.7, totalOrders: 189, revenue: 378000,
    commission: 22, status: "active", joinedAt: "2025-10-05",
    capabilities: ["DTF Printing", "UV Printing"]
  },
  {
    id: "s4", name: "Ananya Das", shopName: "ThreadLine", avatar: "https://i.pravatar.cc/40?img=23",
    city: "Kolkata", pincode: "700001", rating: 4.6, totalOrders: 98, revenue: 196000,
    commission: 20, status: "pending", joinedAt: "2026-02-28",
    capabilities: ["Embroidery"]
  },
  {
    id: "s5", name: "Suresh Nair", shopName: "PrintMaster Pro", avatar: "https://i.pravatar.cc/40?img=24",
    city: "Chennai", pincode: "600001", rating: 4.5, totalOrders: 234, revenue: 468000,
    commission: 19, status: "active", joinedAt: "2025-07-10",
    capabilities: ["DTF Printing", "Embroidery", "Sublimation"]
  },
  {
    id: "s6", name: "Pooja Sharma", shopName: "FabPrint", avatar: "https://i.pravatar.cc/40?img=25",
    city: "Jaipur", pincode: "302001", rating: 3.2, totalOrders: 12, revenue: 24000,
    commission: 20, status: "suspended", joinedAt: "2026-01-15",
    capabilities: ["DTF Printing"]
  },
];

export const mockPayouts: Payout[] = [
  { id: "pay1", sellerName: "PrintHub Studio", amount: 89200, commission: 17840, netPayout: 71360, status: "completed", date: "2026-03-01" },
  { id: "pay2", sellerName: "StitchCraft", amount: 64500, commission: 11610, netPayout: 52890, status: "completed", date: "2026-03-01" },
  { id: "pay3", sellerName: "InkWorks", amount: 37800, commission: 8316, netPayout: 29484, status: "processing", date: "2026-03-10" },
  { id: "pay4", sellerName: "PrintMaster Pro", amount: 46800, commission: 8892, netPayout: 37908, status: "pending", date: "2026-03-11" },
  { id: "pay5", sellerName: "ThreadLine", amount: 19600, commission: 3920, netPayout: 15680, status: "pending", date: "2026-03-11" },
];

export const adminStats = {
  totalRevenue: 2_580_000,
  platformCommission: 502_000,
  totalOrders: 1289,
  activeSellers: 24,
  gmv: 3_200_000,
  totalCustomers: 8450,
  avgOrderValue: 1299,
  conversionRate: 3.8,
  monthlyRevenue: [
    { month: "Oct", revenue: 180000, commission: 36000 },
    { month: "Nov", revenue: 220000, commission: 44000 },
    { month: "Dec", revenue: 380000, commission: 76000 },
    { month: "Jan", revenue: 340000, commission: 68000 },
    { month: "Feb", revenue: 420000, commission: 84000 },
    { month: "Mar", revenue: 510000, commission: 102000 },
  ],
  ordersByCategory: [
    { name: "DTF Print", value: 58, color: "#8B5CF6" },
    { name: "Embroidery", value: 27, color: "#3B82F6" },
    { name: "Ready-Made", value: 15, color: "#22C55E" },
  ],
};
