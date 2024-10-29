import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentSheetProps {
  total: number;
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentSheet = ({ total, onBack, onSuccess }: PaymentSheetProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos el proceso de pago
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Pago completado",
      description: "Tu pedido ha sido procesado correctamente",
    });

    setLoading(false);
    onSuccess();
  };

  return (
    <div className="py-6">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </button>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total a pagar</span>
            <span className="font-medium">{total.toFixed(2)}€</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número de tarjeta</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                setCardNumber(formatted);
              }}
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Fecha de caducidad</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 2) {
                    setExpiry(value);
                  } else {
                    setExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
                  }
                }}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCvc(value);
                }}
                maxLength={3}
                required
              />
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            <CreditCard className="h-4 w-4 mr-2" />
            {loading ? "Procesando..." : "Pagar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentSheet;