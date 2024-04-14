import { ReadingTemplate } from "@/models/reading.model";
import axios from "axios";
import { postReadingAnswer } from "@/utils/actions";
import style from './reading-quiz.module.scss';

const API = process.env.API;

export default async function Reading({ params }: { params: { id: string } }) {

        const { data } = await axios.get<ReadingTemplate>(`${API}/api/v1/reading/${params.id}`);

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

            <form className={`${style["question"]}`} action={postReadingAnswer}>
                <h2 className={`section-header ${style["question__title"]}`}>Questions: </h2>
                <input type="text" name="count" id="count" defaultValue={data.questions.length} hidden />
                <input type="text" name="reading" id="reading" defaultValue={data._id} hidden />
                <ol className={`regular ${style["question__prompts"]}`}>
                    {
                        data.questions.map((qnc, qncIndex) => {
                            return (<li className={`${style["question__set"]}`} key={qncIndex}>
                                <p>{qnc.question}</p>
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
                <button className={`${style["question__submit"]}`}>Submit</button>
            </form>

        </section>
    );
}