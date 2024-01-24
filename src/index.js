import app from "./app.js";
import deeplTranslate from "./controllers/deepl.controller.js";
import openaiTranslate from "./controllers/openai.controller.js";

app.listen(3000);

// deeplTranslate();

// openaiTranslate();

console.log("Server listening on port", 3000);