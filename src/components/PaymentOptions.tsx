import { Button } from "@/components/ui/button";
import { AppleIcon, CreditCard, Wallet, Banknote } from "lucide-react";

interface PaymentOptionsProps {
  total: number;
  onSelectPayment: (method: string) => void;
  onBack: () => void;
}

const PaymentOptions = ({ total, onSelectPayment, onBack }: PaymentOptionsProps) => {
  return (
    <div className="py-6 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        ← Volver
      </button>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Total a pagar</span>
          <span className="font-medium">{total.toFixed(2)}€</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start h-16 text-lg"
          onClick={() => onSelectPayment("card")}
        >
          <CreditCard className="mr-4 h-6 w-6" />
          Pagar con tarjeta
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-16 text-lg"
          onClick={() => onSelectPayment("apple-pay")}
        >
          <AppleIcon className="mr-4 h-6 w-6" />
          Apple Pay
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-16 text-lg"
          onClick={() => onSelectPayment("google-wallet")}
        >
          <Wallet className="mr-4 h-6 w-6" />
          Google Wallet
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-16 text-lg"
          onClick={() => onSelectPayment("bizum")}
        >
          <CreditCard className="mr-4 h-6 w-6" />
          Bizum
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-16 text-lg"
          onClick={() => onSelectPayment("cash")}
        >
          <Banknote className="mr-4 h-6 w-6" />
          Pagar en caja
        </Button>
      </div>
    </div>
  );
};

export default PaymentOptions;