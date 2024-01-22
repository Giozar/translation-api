import * as deepl from "deepl-node";
import { deeplAPIKEY } from "../../config.js";
const authKey = deeplAPIKEY;
const translator = new deepl.Translator(authKey);

async function deeplTranslate(req, res){

    const languageToTranslate = "es";  

    const inputText = 'Hellos, world';

    const result = await translator.translateText( inputText, null, languageToTranslate);
    res.json({
        message: inputText,
        translation: result.text,
    })
}

export default deeplTranslate;