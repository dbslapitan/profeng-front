'use server';

import axios from "axios";
import { redirect } from "next/navigation";

const API = process.env.API;

export async function navigate(route: string){
    redirect(route);
}

export async function postWritingAnswer(formData: FormData) {

    const converted = (formData.get("essay") as string).split(/[\r\n]/).filter(string => !!string);
    
    const newForm = {
        writing: formData.get("writing"),
        essay: converted,
        prompt: formData.get("prompt")
    }
    await axios.post(`${API}/api/v1/feedback/writing`, newForm);
    redirect('/feedback');

}

export async function postReadingAnswer(formData: FormData) {

    const count = formData.get("count") as string;
    const parsed = parseInt(count);
    const reading = formData.get("reading");
    const answers = [];
    
    for(let i = 0; i < parsed; i++){
        answers.push(formData.get(`question-${i}`));
    }

    const body = {
        reading,
        answers
    };

    await axios.post(`${API}/api/v1/feedback/reading`, body);
    redirect('/feedback');
}