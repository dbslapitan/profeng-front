'use client';

import { ReadingTemplate } from "@/models/reading.model";
import axios from "axios";
import { postReadingAnswer } from "@/utils/actions";
import style from './reading-quiz.module.scss';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useFormState } from "react-dom";
import Submit from "@/components/submit/Submit";

const API = process.env.NEXT_PUBLIC_API;

export default function Reading() {

    const [actionResponse, formAction] = useFormState(postReadingAnswer, null);

    const { id } = useParams();
        // const { data } = await axios.get<ReadingTemplate>(`${API}/api/v1/reading/${params.id}`);
    const [data, setData] = useState<ReadingTemplate | null>(null);

        useEffect(() => {
            (async () => {
                const response = await axios.get<ReadingTemplate>(`${API}/api/v1/reading/${id}`);
                setData(response.data);
            })();
        }, []);

        if(!data){
            return <Loading/>;
        }

    return (
        <section className={`${style["reading"]}`}>
            <h1 className={`page-header ${style["reading__title"]}`}>{data.title}</h1>
            {
                data.content.map((paragraph, index) => {
                    return (
                        <p className={`regular ${style["reading__paragraph"]}`} key={index}>{paragraph}</p>
                    );
                })
            }

            <form className={`${style["question"]}`} action={formAction}>
                <h2 className={`section-header ${style["question__title"]}`}>Questions: </h2>
                <input type="text" name="count" id="count" defaultValue={data.questions.length} hidden />
                <input type="text" name="reading" id="reading" defaultValue={data._id} hidden />
                <ol className={`regular ${style["question__prompts"]}`}>
                    {
                        data.questions.map((qnc, qncIndex) => {
                            return (
                                <li className={`${style["question__set"]}`} key={qncIndex}>
                                    <p>{qnc.question}{actionResponse?.errors.some(el => el === qncIndex) && <span className={style["question__error"]}> *Must be answered</span>}</p>
                                    <ul>
                                        {
                                            qnc.options.map((option, choiceIndex) => {
                                                return (
                                                    <li className={`${style["question__choice"]}`} key={choiceIndex}>
                                                        <input type="radio" name={`question-${qncIndex}`} id={`q${qncIndex}-option-${choiceIndex}`} defaultValue={option} /> <label htmlFor={`q${qncIndex}-option-${choiceIndex}`}>{option}</label>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>

                                </li>
                            );
                        })
                    }
                </ol>
                <Submit />
            </form>

        </section>
    );
}