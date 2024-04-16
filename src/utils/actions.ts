'use server';

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

const API = process.env.API;

export async function navigate(route: string){
    redirect(route);
}

export async function postWritingAnswer(prevState: any, formData: FormData) {

    const converted = (formData.get("essay") as string).split(/[\r\n]/).filter(string => !!string);
    
    const newForm = {
        writing: formData.get("writing"),
        essay: converted,
        prompt: formData.get("prompt")
    }

if(!newForm.essay.length){
    console.log("ere")
    return {writing: 'Cannot be empty'};
}

    const { data: id } = await axios.post(`${API}/api/v1/feedback/writing`, newForm);
    revalidatePath(`/feedback/writing/[id]`, "page");
    redirect(`/feedback/writing/${id}`);

}

export async function postReadingAnswer(prevState: any, formData: FormData) {
    noStore();

    const count = formData.get("count") as string;
    const parsed = parseInt(count);
    const reading = formData.get("reading");
    const answers = [];
    const errors = [];
    
    for(let i = 0; i < parsed; i++){
        answers.push(formData.get(`question-${i}`));
        if(!formData.get(`question-${i}`)){
            errors.push(i);
        }
    }

    const body = {
        reading,
        answers
    };

    if(errors.length){
        return {errors};
    }

    const { data: id } = await axios.post(`${API}/api/v1/feedback/reading`, body);
    revalidatePath(`/feedback/reading/[id]`, "page");
    redirect(`/feedback/reading/${id}`);
}