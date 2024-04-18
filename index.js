import express from "express";
import dotenv from "dotenv";
import stripePackage from "stripe";
import cors from "cors";

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Use the provided PORT by Heroku or default to 3000
const PORT = process.env.PORT || 3000;

const stripe = new stripePackage(process.env.STRIPE_SECRET);

app.use(express.json());

app.get("/", (req, res) => {
  const text = { data: "Welcome to the Node.js, Express.js Stripe Integration" };
  res.json(text);
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { data } = req.body;

  const lineItems = data.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
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

app.listen( PORT, () => {
  console.log("Server is running on port 3000");
});
