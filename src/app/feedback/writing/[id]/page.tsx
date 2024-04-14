'use client';

import { WritingFeedback } from "@/models/writing-feedback.model";
import axios from "axios";
import style from "./writing-feedback.module.scss";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API;

export default function Feedback() {

    const { id } = useParams();
    const [feedback, setFeedback] = useState({});

    useEffect(() => {
        (async () => {
            const { data, status } = await axios.get<WritingFeedback>(`${API}/api/v1/feedback/writing/${id}`);
            setFeedback(data);
        })();
    }, []);

    if(!(feedback as WritingFeedback).writing){
        return <h1>Loading...</h1>
    }
    

    return (
        <section className={`${style["writing"]}`}>
            <h1 className={`${style["writing__prompt"]}`}>{(feedback as WritingFeedback).writing.prompt}</h1>
            <h2 className={`section-header ${style["writing__sub"]}`}>Essay:</h2>
            {
                (feedback as WritingFeedback).essay.map((paragraph, index) => {
                    return <p className={`regular ${style["writing__paragraph"]}`} key={index}>{paragraph}</p>;
                })
            }
            <h2 className={`section-header ${style["writing__sub"]}`}>Feedback:</h2>
            <ol className={`${style["writing__essay"]}`}>
                {
                    (feedback as WritingFeedback).feedback.map((paragraph, index) => {
                        return <li className={`regular ${style["writing__paragraph"]}`} key={index}>{paragraph}</li>;
                    })
                }
            </ol>

            <h2 className={`section-header ${style["writing__sub"]}`}>Sample:</h2>
            {
                (feedback as WritingFeedback).improvedVersion.map((paragraph, index) => {
                    return <p className={`regular ${style["writing__paragraph"]}`} key={index}>{paragraph}</p>;
                })
            }
        </section>
    );


}