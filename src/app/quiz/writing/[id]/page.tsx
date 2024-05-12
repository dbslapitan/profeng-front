'use client';

import { postWritingAnswer } from "@/utils/actions";
import axios from "axios";
import style from "./writing-quiz.module.scss";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Writing as WritingModel } from "@/models/writing.model";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";

const API = process.env.NEXT_PUBLIC_API;

export default function Writing() {
    const { id } = useParams(); 
    const [error, formAction] = useFormState(postWritingAnswer, null);

    const [data, setData] = useState<WritingModel>({});

    useEffect(() => {
        (async() => {
            try{
                const response = await axios.get(`${API}/api/v1/writing/${id}`);
                setData(response.data);
            }
            catch(error){
                console.log(error);
            }
        })();
    }, []);

    if(!data.prompt){
        return <Loading />;
    }

    return(
        <form className={`${style["writing"]}`} action={formAction}>
            <p className={`${style["writing__prompt"]}`}>{data.prompt}</p>
            <input type="text" name="writing" id="writing" defaultValue={id} hidden/>
            <input type="text" name="prompt" id="promp" defaultValue={data.prompt} hidden/>
            <h1 className={`${style["writing__title"]}`}>Essay</h1>
            <textarea className={`${style["writing__essay"]}`} name="essay" id="essay"></textarea>
            <p className={`${style["writing__error"]} ${error?.writing ? style["writing__error--show"] : ''}`}>Cannot be empty</p>
            <button className={`${style["writing__submit"]}`}>Submit</button>
        </form>
    );
}