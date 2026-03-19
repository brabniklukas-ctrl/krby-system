import { db } from "@/lib/firebaseAdmin";

// 🔹 GET – načtení objednávek
export async function GET() {
  try {
    const snapshot = await db.collection("orders").get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(orders);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// 🔹 POST – vytvoření objednávky
export async function POST(req) {
  try {
    const data = await req.json();

    const docRef = await db.collection("orders").add({
      customerName: data.customerName,
      productId: data.productId,
      quantity: data.quantity,
      status: "new",
      createdAt: new Date(),
    });

    return Response.json({ id: docRef.id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// 🔹 PUT – zahájení výroby
export async function PUT(req) {
  try {
    const { orderId } = await req.json();

    await db.collection("orders").doc(orderId).update({
      status: "in_production",
    });

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}