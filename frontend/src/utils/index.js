import FileSaver from 'file-saver';
import { SurprisemePrompts } from "../constants";

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random()*SurprisemePrompts.length);

    const randomPrompt = SurprisemePrompts[randomIndex];

    if(randomPrompt === prompt) return getRandomPrompt(prompt)
    
    return randomPrompt
}

export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo , `download-${_id}.jpg`)
}