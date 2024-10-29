import { ShoppingBag } from 'lucide-react';
import { Product } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

interface CartItem {
  product: Product;
  quantity: number;
  variants?: Record<string, string>;
}

interface CartProps {
  items: CartItem[];
  onCheckout: () => void;
}

const Cart = ({ items, onCheckout }: CartProps) => {
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  if (items.length === 0) return null;

  const handleCheckout = async () => {
    try {
      const order = await api.createOrder({
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          variants: item.variants
        })),
        total
      });

      toast({
        title: "Pedido realizado",
        description: `Tu pedido #${order.id} ha sido confirmado`,
      });

      onCheckout();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar tu pedido. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg card-shadow p-4 animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span className="font-medium">{items.length} productos</span>
        </div>
        <span className="font-medium">{total.toFixed(2)}€</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
      >
        Realizar pedido
      </button>
    </div>
  );
};

export default Cart;