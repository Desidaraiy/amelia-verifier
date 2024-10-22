import { Router } from "express";
import entityController from "../controllers/entity.controller";

class PublicRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/test", (req, res) => {
      res.send("Hello World!");
    });

    this.router.post("/verify", entityController.requestVerification);
  }
}

export default new PublicRoutes().router;
