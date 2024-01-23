import app from "./app.js";
import deeplTranslate from "./controllers/deepl.controller.js";

app.listen(3000);

deeplTranslate();

console.log("server on port ", 3000);