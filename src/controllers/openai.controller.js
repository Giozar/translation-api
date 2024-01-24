import OpenAI from "openai";
import { openaiAPIKEY } from "../../config.js";
import tools from "../db/desumex.tools.json" assert { type: "json" };

const authKey = openaiAPIKEY;
const openai = new OpenAI({ apiKey: authKey});


async function dataTranslateWithOpenia(){

  const newData = [];
  const dataToTranslate = tools;
  
  // const data = "Hi";
  // const completion = await openai.chat.completions.create({
  //   messages: [{ 
  //     role: "system", 
  //     content: `Translates the following into Spanish.: ${data}`, 
  //   }],
  //   model: "gpt-3.5-turbo",
  //   max_tokens: 200,
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
                && (element.length > 0 && element !== null)) {

                  const completion = await openai.chat.completions.create({
                      messages: [{ 
                          role: "system", 
                          content: `Translates the following into Spanish.: ${element}`, 
                      }],
                      model: "gpt-3.5-turbo",
                      max_tokens: 200,
                    });
                    data[key] = completion.choices[0].message.content;
                    console.log(data[key]);
                }
            }
        }
        newData.push(data);
    }));
    
    return newData;
}

async function openaiTranslate(req, res){
  const data = await dataTranslateWithOpenia();
  console.log(data);
}

export default openaiTranslate;
