import express from "express";
import dotenv from "dotenv";
import stripePackage from "stripe";

dotenv.config();

const app = express();

const stripe = new stripePackage(process.env.STRIPE_SECRET);

app.use(express.json());

app.get("/", (req, res) => {
  const text = { data: "Welcome to the Node.js, Express.js and MongoDB API" };
  res.json(text);
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { data } = req.body;

  const lineItems = data.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [`http://localhost:5173/${product.image}`],
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  res.json({ id: session.id });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
