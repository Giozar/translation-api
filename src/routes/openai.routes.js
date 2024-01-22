import { Router } from "express";
import openaiTranslate from "../controllers/openai.controller.js";

const openaiRoute = Router();

openaiRoute.get("/openia", openaiTranslate);

export default openaiRoute;