'use client'
import { navigate } from "@/utils/actions";
import axios from "axios";
import style from "./writing-quiz.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API;

export default function Writing({ params }: {params: {id: string}}) {

    const [data, setData] = useState({prompt: ""});
    const {id} = useParams();

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async() => {
            const response = await axios.get(`${API}/api/v1/writing/${id}`);
            setData(response.data);
        })();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = {
            writing: (event.target as HTMLFormElement).writing.value,
            prompt: data.prompt,
            essay: (event.target as HTMLFormElement).essay.value,
        };

        if(!form.essay){
            setIsError(true);
            return;
        }
        const converted = form.essay.split(/[\r\n]/).filter((string: string) => !!string);
    
        const newForm = {
            writing: form.writing,
            essay: converted,
            prompt: form.prompt
        }
        const { data: id } = await axios.post(`${API}/api/v1/feedback/writing`, newForm);
            navigate(`/feedback/writing/${id}`);
        }

    const handleMouseDown = () => {
        setIsError(false);
    }

    if(!data.prompt){
        return <h1>Loading...</h1>
    }

    return(
        <form className={`${style["writing"]}`} onSubmit={handleSubmit}>
            <p className={`${style["writing__prompt"]}`}>{data.prompt}</p>
            <input type="text" name="writing" id="writing" defaultValue={id} hidden/>
            <input type="text" name="prompt" id="prompt" defaultValue={data.prompt} hidden/>
            <h1 className={`${style["writing__title"]}`}>Essay</h1>
            <textarea className={`${style["writing__essay"]}`} name="essay" id="essay" onKeyDown={handleMouseDown}></textarea>
            {!isError || <p>Input an essay</p>}
            <button className={`${style["writing__submit"]}`}>Submit</button>
        </form>
    );
}