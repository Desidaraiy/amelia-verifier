import { Request, Response } from "express";
import EntityService from "../services/entity.service";

class EntityController {
  public async requestVerification(req: Request, res: Response): Promise<void> {
    try {
      const { phone, code } = req.body;
      if (code) {
        const entity = await EntityService.verify(phone, code);
        if (entity) {
          res
            .status(200)
            .json({ state: "success", data: "Phone successfully verified" });
        } else {
          res
            .status(400)
            .json({ state: "error", data: "Invalid phone or code" });
        }
      } else {
        const entity = await EntityService.requestVerification(phone);
        if (entity) {
          res
            .status(200)
            .json({ state: "success", data: "Verification code sent" });
        } else {
          res
            .status(400)
            .json({ state: "error", data: "Failed to send verification code" });
        }
      }
    } catch (error) {
      res.status(500).json({ state: "error", data: "Internal server error" });
    }
  }
}
export default new EntityController();
