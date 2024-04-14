import { ReadingFeedback } from "@/models/reading-feedback.model";
import axios from "axios";
import style from "./reading-feedback.module.scss";
import { notFound } from "next/navigation";

const API = process.env.API;

export default async function Reading({ params }: { params: { id: string } }) {

    try{
        const { data } = await axios.get<ReadingFeedback>(`${API}/api/v1/feedback/reading/${params.id}`);
        
        return (
            <section className={`${style["reading"]}`}>
                <h1 className={`page-header ${style["reading__title"]}`}>{data.reading.title}</h1>
                {
                    data.reading.content.map((paragraph, index) => {
                        return (
                            <p className={`regular ${style["reading__paragraph"]}`} key={index}>{paragraph}</p>
                        );
                    })
                }
    
                <h2  className={`section-header ${style["question__title"]}`}>Questions: </h2>
                <ol className={`regular ${style["question__prompts"]}`}>
                    {
                        data.reading.questions.map((qnc, qncIndex) => {
    
                            const isCorrect = qnc.answer === data.answers[qncIndex];
    
                            return (
                            <li className={`${style["question__set"]}`} key={qncIndex}>
                                <p>{qnc.question}</p>
                                <ul className={`${style["question__choices"]}`}>
                                    {
                                        qnc.options.map((option, choiceIndex) => {
    
                                            const isSelected = option === data.answers[qncIndex];
                                            const checkStyle = isCorrect && isSelected ? 'question__choice--check' 
                                            : option === data.answers[qncIndex] ? 'question__choice--wrong' 
                                            : option === qnc.answer ? 'question__choice--correct' : '';
    
                                            return (
                                                <li className={`${style["question__choice"]} ${ !!checkStyle ? style[checkStyle] : ''}`} key={choiceIndex}>
                                                    {option}
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
    
            </section>
        );
    }
    catch(error){
        notFound();
    }

    
}