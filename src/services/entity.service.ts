import EntityRepository from "../repositories/entity.repository";
import Entity from "../models/entity.model";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

class EntityService {
  public requestVerification = async (
    phone: string
  ): Promise<Entity | null> => {
    let entity = await EntityRepository.findByPhone(phone);
    if (!entity) {
      entity = await EntityRepository.create(phone);
    }
    const code = await this.sendVerificationRequest(phone);
    if (code) {
      await EntityRepository.updateCode(entity.id, code);
      return entity;
    }
    return null;
  };

  public async verify(phone: string, code: string): Promise<Entity | null> {
    const entity = await EntityRepository.findByPhone(phone);
    if (!entity || entity.code !== code) {
      return null;
    }
    return await EntityRepository.verify(entity.id);
  }

  public async sendVerificationRequest(phone: string): Promise<string> {
    dotenv.config();
    let ret = "";
    var data = new FormData();
    data.append("public_key", process.env.VERIFICATION_API_PUBLIC_KEY);
    data.append("phone", phone);
    data.append("campaign_id", process.env.VERIFICATION_API_CAMPAIGN_ID);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.VERIFICATION_API_URL,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    try {
      const response = await axios(config);
      ret = response.data.data.pincode;
    } catch (error) {
      console.error("Error sending verification request:", error);
      throw new Error("Failed to send verification request");
    }

    return ret;
  }
}

export default new EntityService();
