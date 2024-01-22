import { Router } from "express";
import deeplTranslate from "../controllers/deepl.controller.js";

const deeplRoute = Router();

deeplRoute.get("/deepl", deeplTranslate);

export default deeplRoute;