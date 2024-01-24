import * as deepl from "deepl-node";
import { deeplAPIKEY } from "../../config.js";
import * as fs from "fs";
import categories from "../db/desumex.categories.json" assert { type: "json" };
import tools from "../db/desumex.tools.json" assert { type: "json" };

const authKey = deeplAPIKEY;
const translator = new deepl.Translator(authKey);

function saveTranslation(data) {
    const fileName = "tools.json";
    const filePath = "src/db/translated/" + fileName; 
    const jsonData = JSON.stringify(data);

    fs.access( filePath, fs.constants.F_OK, (err) => {
        if (err) {
            //Si el archivo no existe, crea el archivo y lo escribe
            fs.writeFile(filePath, jsonData, "utf-8" , (err) => {
                if (err) throw err;
                console.log("File created and first object written");
            });
        } else {
            fs.appendFile(filePath, jsonData, "utf-8", (err) => {
                if (err) throw err;
                console.log("Data writed");
            });
        }
    });
}

async function dataTranslateWithDeepl() {
    const newData = [];
    const dataToTranslate = tools;
    const languageToTranslate = "es";

    // const inputText = 'Hellos, world';
    // const result = await translator.translateText( inputText, null, languageToTranslate);
    // res.json({
    //     message: inputText,
    //     translation: result.text,
    // });

    await Promise.all(dataToTranslate.map(async (data) => {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = String(data[key]);
                if (
                    (
                        key === "Descripción"
                        || key === "Caracteristicas"
                        || key === "Beneficios"
                        || key === "Tipo de herramienta"
                        || key === "exactitud"
                        || key === "fluidos"
                    )
                && element.length > 0 && element !== null) {
                    const result = await translator.translateText(element, null, languageToTranslate);
                    data[key] = result.text;
                }
            }
        }        
        newData.push(data);
    }));
    
    return newData;
}

async function deeplTranslate() {
    const data = await dataTranslateWithDeepl();
    // console.log(data);
    await saveTranslation( data );
}

export default deeplTranslate;