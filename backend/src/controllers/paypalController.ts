import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import type { Request, Response } from "express";
import Sale from "../models/saleModel.js";
import Course from "../models/courseModel.js";
import type { IUser } from "../models/userModel.js";
import mongoose from "mongoose";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID || "",
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);

class PaypalController {
  async createOrder(req: Request, res: Response) {
  const { courseId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    const collect = {
      body: {
        intent: "CAPTURE" as any,
        purchaseUnits: [{ amount: { currencyCode: "USD", value: course.price as string } }],
      },
      prefer: "return=minimal",
    };

    const { body, ...httpResponse } = await ordersController.createOrder(collect);
    const result = JSON.parse(body as string);

    // ← envolver en { data: ... } para que el request del frontend lo entienda
    res.status(httpResponse.statusCode).json({ data: result, message: "Order created" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error creando la orden" });
  }
}

async captureOrder(req: Request, res: Response) {
  const { orderID, courseId } = req.body;
  try {
    const { body, ...httpResponse } = await ordersController.captureOrder({
      id: orderID,
      prefer: "return=minimal",
    });
    const result = JSON.parse(body as string);

    if (result.status === "COMPLETED") {
      const course = await Course.findById(courseId);
      await Sale.create({
        user: new mongoose.Types.ObjectId((req.user as IUser)._id),
        course: new mongoose.Types.ObjectId(courseId),
        amount: typeof course?.price === 'number' ? course.price : null,
      });
    }

    // ← igual acá
    res.status(httpResponse.statusCode).json({ data: result, message: "Order captured" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error capturando el pago" });
  }
}
}

export default new PaypalController();