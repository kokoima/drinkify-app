const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.clicktodrink.es/api/v1';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; // Cambiado para usar mock por defecto

// Mock data
const mockEstablishment = {
  id: "123",
  name: "Bar Central",
  description: "El mejor bar de la ciudad",
  images: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    "https://images.unsplash.com/photo-1538488881038-e252a119ace7",
  ],
};

const mockProducts = [
  {
    id: "1",
    name: "Mojito",
    description: "Ron, lima, menta y soda",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
    category: "cocktails",
    variants: [
      {
        name: "Tipo de ron",
        options: ["Bacardi", "Havana Club", "Captain Morgan"],
      },
    ],
  },
  // ... más productos mock
];

export interface Establishment {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: ProductVariant[];
}

export interface Order {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    variants?: Record<string, string>;
  }>;
  status: 'pending' | 'confirmed' | 'ready' | 'delivered';
  total: number;
}

const api = {
  getEstablishment: async (id: string): Promise<Establishment> => {
    if (USE_MOCK) return mockEstablishment;
    
    const response = await fetch(`${API_BASE_URL}/establishments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch establishment');
    return response.json();
  },

  getProducts: async (establishmentId: string): Promise<Product[]> => {
    if (USE_MOCK) return mockProducts;
    
    const response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  createOrder: async (order: Omit<Order, 'id' | 'status'>): Promise<Order> => {
    if (USE_MOCK) {
      return {
        ...order,
        id: Math.random().toString(36).substr(2, 9),
        status: 'confirmed',
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  getOrder: async (orderId: string): Promise<Order> => {
    if (USE_MOCK) {
      return {
        id: orderId,
        items: [],
        status: 'pending',
        total: 0,
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },
};

export default api;
