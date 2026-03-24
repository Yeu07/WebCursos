'use client'
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import request from "@/src/services/request";

interface Props {
  courseId: string;
  price: string;
}

export default function PayPalCheckout({ courseId, price }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        components: "buttons",
      }}>
        <PayPalButtons
          style={{ shape: "rect", layout: "vertical", color: "gold", label: "pay" }}

          createOrder={async () => {
            try {
              const res = await request<{ id: string }>("/paypal/create-order", {
                method: "POST",
                body: JSON.stringify({ courseId }),
              });
              if (!res.data?.id) throw new Error("No se pudo crear la orden");
              return res.data.id;
            } catch (error) {
              setMessage("No se pudo iniciar el pago. Intentá de nuevo.");
              throw error;
            }
          }}

          onApprove={async (data) => {
            try {
              const res = await request<any>("/paypal/capture-order", {
                method: "POST",
                body: JSON.stringify({ orderID: data.orderID, courseId }),
              });

              const errorDetail = res.data?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                setMessage("Pago declinado. Intentá con otro método.");
                return;
              }

              if (errorDetail) {
                throw new Error(errorDetail.description);
              }

              setSuccess(true);
              setMessage("¡Pago exitoso! Ya podés ver el curso.");
              router.refresh();
            } catch (error) {
              setMessage("No se pudo procesar el pago. Intentá de nuevo.");
            }
          }}

          onError={() => {
            setMessage("Ocurrió un error con PayPal. Intentá de nuevo.");
          }}
        />
      </PayPalScriptProvider>

      {message && (
        <p className={`mt-3 text-sm text-center ${success ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}