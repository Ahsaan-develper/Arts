import express from "express";
import { connectDB } from "./config/db.js";
import _config from "./config/config.js";
import cookieParser from "cookie-parser";
import user_router from "./routes/user.routes.js";
import admin_router from "./routes/admin.routes.js";
import post_router from "./routes/posts.routes.js";
import country_router from "./routes/country.routes.js";
import category_router from "./routes/category.routes.js";
import event_router from "./routes/events.routes.js";
import slider_router from "./routes/slider.routes.js";
import { refresh_handler } from "./middleware/jwt.middleware.js";
import subscriber_router from "./routes/subscriber.routes.js";
import ticket_router from "./routes/tickets.routes.js";
import payment_router from "./routes/payment.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect DB once (Vercel reuses warm instances)
connectDB();

// refresh token
app.use("/refresh", refresh_handler);

// routes
app.use("/user", user_router);
app.use("/admin", admin_router);
app.use("/posts", post_router);
app.use("/country", country_router);
app.use("/category", category_router);
app.use("/events", event_router);
app.use("/sliders", slider_router);
app.use("/subscriber", subscriber_router);
app.use("/tickets", ticket_router);
app.use("/payments", payment_router);

// local dev only
if (_config.env !== "production") {
  app.listen(_config.port, () => {
    console.log("Server is running on port:", _config.port);
  });
}

export default app;