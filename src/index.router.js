import authRouter from "./modules/auth/auth.router.js";
import brandRouter from "./modules/brand/brand.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import categoryRouter from "./modules/category/category.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import orderRouter from "./modules/order/order.router.js";
import productRouter from "./modules/product/product.router.js";
import subcategoryRouter from "./modules/subcategory/subcategory.router.js";
import { connectDB } from "../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import cors from "cors";
import requestIp from "request-ip";
const config = process.env;

const whitelist = [
  "http://127.0.0.1:5500",
  "http://197.33.200.142:5000",
  "http://197.33.200.142:3000",
  "http://197.33.200.142ecommerce-test-ochre.vercel.app",
  "https://197.33.200.142:5000",
  "https://197.33.200.142:3000",
];

// Allow CORS
export const initApp = (app, express) => {
  // app.use((req, res, next) => {
  //   console.log("client IP: ", requestIp.getClientIp(req));
  //   console.log("req: ", req);
  //   console.log("originalURL: ", req.originalUrl);
  //   console.log("baseURL: ", req.baseUrl);
  //   console.log("url: ", req.url);
  //   console.log("parsed: ", req._parsedUrl);
  //   return res.json({ request: Object.keys(req) });

  //   // console.log(req.headers.host);
  //   if (req.originalUrl.includes("/api/auth/confirmEmail/")) {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.setHeader("Access-Control-Allow-Methods", "GET");
  //     return next();
  //   }
  //   if (!whitelist.includes(req.header("origin"))) {
  //     return next(new Error("Not Allowed by CORS!"));
  //   }
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "*");
  //   res.setHeader("Access-Control-Allow-Private-Network", "true");
  //   res.setHeader("Access-Control-Allow-Methods", "*");
  //   return next();
  // });

  // app.use(cors());

  // Parsing buffer data to json object

  app.use(cors());
  app.use(express.json({}));

  // Application routes
  app.use(`${config.BASE_URL}/auth`, authRouter);
  app.use(`${config.BASE_URL}/product`, productRouter);
  app.use(`${config.BASE_URL}/category`, categoryRouter);
  app.use(`${config.BASE_URL}/subCategory`, subcategoryRouter);
  app.use(`${config.BASE_URL}/coupon`, couponRouter);
  app.use(`${config.BASE_URL}/cart`, cartRouter);
  app.use(`${config.BASE_URL}/order`, orderRouter);
  app.use(`${config.BASE_URL}/brand`, brandRouter);

  app.all("*", (req, res, next) => {
    res.send("invalid route!");
  });

  app.use(globalErrorHandling);

  // Connect database
  connectDB();
};
