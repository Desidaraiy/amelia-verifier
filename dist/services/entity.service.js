"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_repository_1 = __importDefault(require("../repositories/entity.repository"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const dotenv_1 = __importDefault(require("dotenv"));
class EntityService {
    constructor() {
        this.requestVerification = (phone) => __awaiter(this, void 0, void 0, function* () {
            let entity = yield entity_repository_1.default.findByPhone(phone);
            if (!entity) {
                entity = yield entity_repository_1.default.create(phone);
            }
            const code = yield this.sendVerificationRequest(phone);
            if (code) {
                yield entity_repository_1.default.updateCode(entity.id, code);
                return entity;
            }
            return null;
        });
    }
    verify(phone, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield entity_repository_1.default.findByPhone(phone);
            if (!entity || entity.code !== code) {
                return null;
            }
            return yield entity_repository_1.default.verify(entity.id);
        });
    }
    sendVerificationRequest(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            dotenv_1.default.config();
            let ret = "";
            var data = new form_data_1.default();
            data.append("public_key", process.env.VERIFICATION_API_PUBLIC_KEY);
            data.append("phone", phone);
            data.append("campaign_id", process.env.VERIFICATION_API_CAMPAIGN_ID);
            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: process.env.VERIFICATION_API_URL,
                headers: Object.assign({}, data.getHeaders()),
                data: data,
            };
            try {
                const response = yield (0, axios_1.default)(config);
                ret = response.data.data.pincode;
            }
            catch (error) {
                console.error("Error sending verification request:", error);
                throw new Error("Failed to send verification request");
            }
            return ret;
        });
    }
}
exports.default = new EntityService();
