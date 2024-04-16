'use client';

import axios from "axios";
import style from "./feedbacks.module.scss";
import { WritingFeedback } from "@/models/writing-feedback.model";
import { ReadingFeedback } from "@/models/reading-feedback.model";
import { useEffect, useState } from "react";
import { navigate } from "@/utils/actions";
import Loading from "../loading";

const API = process.env.NEXT_PUBLIC_API;

export default function Feedbacks() {

    const array: (WritingFeedback | ReadingFeedback)[] = [];
    const [feedbacks, setFeedbacks] = useState(array);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async() => {
            const { data } = await axios.get<[WritingFeedback | ReadingFeedback]>(`${API}/api/v1/feedback`);
            setFeedbacks(data);
        })();
    }, []);

    const clickHandler = (href: string) => {
        setIsLoading(true);
        navigate(href);
    };

    if(isLoading){
        return <Loading/>
    }

    return (
        <section className={`${style["feedbacks"]}`}>
            <h1 className={`page-header ${style["feedbacks__title"]}`}>Feedbacks</h1>
            {
                feedbacks.map((feedback: WritingFeedback | ReadingFeedback) => {

                    const segment = feedback.skill!.toLowerCase();
                    const statusColor = feedback.status!.toLowerCase() === 'evaluated' ? 'feedback__status--green' : 'feedback__status--yellow';

                    if (feedback.skill === "Writing") {

                        const writingFeedback = feedback as WritingFeedback;

                        const dateTaken = new Date(feedback.createdAt!);
                        const dataString = dateTaken.toString();
                        const  href= `/feedback/${segment}/${writingFeedback._id}`;
                        return (
                            <button className={`${style["feedback"]}`} key={writingFeedback._id} onClick={() => clickHandler(href)}>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>ID: </span>{writingFeedback._id}</p>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>Skill: </span>{writingFeedback.skill}</p>
                                <p className={`${style["feedback__info"]} ${style["feedback__status"]} ${style[statusColor]}`}><span className={`${style["feedback__label"]}`}>Status: </span>{writingFeedback.status}</p>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>Taken On: </span>{dataString}</p>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>Prompt: </span>{writingFeedback.writing.prompt}</p>
                            </button>
                        );
                    }
                    else{

                        const readingFeedback = feedback as ReadingFeedback;

                        const dateTaken = new Date(feedback.createdAt!);
                        const dataString = dateTaken.toString();

                        const href=`/feedback/${segment}/${readingFeedback._id}`;

                        return (
                            <button className={`${style["feedback"]}`} key={readingFeedback._id} onClick={() => clickHandler(href)}>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>ID: </span>{readingFeedback._id}</p>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>Skill: </span>{readingFeedback.skill}</p>
                                <p className={`${style["feedback__info"]} ${style["feedback__status"]} ${style[statusColor]}`}><span className={`${style["feedback__label"]}`}>Status: </span>{readingFeedback.status}</p>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>Taken On: </span>{dataString}</p>
                                <p className={`${style["feedback__info"]}`}><span className={`${style["feedback__label"]}`}>Title: </span>{readingFeedback.reading!.title}</p>
                            </button>
                        );
                    }
                })
            }
        </section>
    );
}