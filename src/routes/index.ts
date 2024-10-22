import { Application } from "express";
import publicRoutes from "./public.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/v1", publicRoutes);
  }
}
