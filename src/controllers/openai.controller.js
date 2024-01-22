import OpenAI from "openai";
import { openaiAPIKEY } from "../../config.js";

const authKey = openaiAPIKEY;
const openai = new OpenAI({ apiKey: authKey});

async function openaiTranslate(req, res){
    const completion = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content: "You are a helpful assistant.", 
        }],
        model: "gpt-3.5-turbo",
        max_tokens: 65,
      });

      res.json(
        completion.choices[0],
      )
    
      console.log(completion.choices[0]);


}

export default openaiTranslate;
