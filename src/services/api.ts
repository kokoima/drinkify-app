const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.clicktodrink.es/api/v1';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

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
  {
    id: "2",
    name: "Margarita",
    description: "Tequila, triple sec y lima",
    price: 9.00,
    image: "https://images.unsplash.com/photo-1556855810-ac404aa91e85",
    category: "cocktails",
    variants: [
      {
        name: "Tipo de tequila",
        options: ["José Cuervo", "Patrón", "Don Julio"],
      },
    ],
  },
  {
    id: "3",
    name: "Cerveza Artesanal",
    description: "IPA local de barril",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13",
    category: "cervezas",
    variants: [
      {
        name: "Tamaño",
        options: ["Caña", "Pinta", "Jarra"],
      },
    ],
  },
  {
    id: "4",
    name: "Heineken",
    description: "Cerveza lager holandesa",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9",
    category: "cervezas",
  },
  {
    id: "7",
    name: "Coca-Cola",
    description: "Refresco de cola",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7",
    category: "refrescos",
    variants: [
      {
        name: "Tamaño",
        options: ["Pequeña", "Mediana", "Grande"],
      },
    ],
  },
  {
    id: "8",
    name: "Agua Mineral",
    description: "Agua mineral natural",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea30",
    category: "refrescos",
    variants: [
      {
        name: "Tipo",
        options: ["Con gas", "Sin gas"],
      },
    ],
  },
  {
    id: "9",
    name: "Café Espresso",
    description: "Café espresso italiano",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04",
    category: "cafes",
    variants: [
      {
        name: "Extras",
        options: ["Normal", "Doble", "Con leche"],
      },
    ],
  },
  {
    id: "10",
    name: "Cappuccino",
    description: "Café con leche espumosa y cacao",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c00e",
    category: "cafes",
  },
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
