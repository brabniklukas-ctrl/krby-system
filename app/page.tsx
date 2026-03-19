"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  customerName: string;
  productId: string;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  }

  async function startProduction(order: Order) {
    await fetch("/api/orders", {
      method: "PUT",
      body: JSON.stringify({
        orderId: order.id,
        productId: order.productId,
      }),
    });

    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Objednávky</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>Zákazník: {order.customerName}</p>
          <p>Produkt: {order.productId}</p>
          <p>Stav: {order.status}</p>

          {order.status === "new" && (
            <button onClick={() => startProduction(order)}>
              Zahájit výrobu
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
