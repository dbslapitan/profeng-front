import { ReadingTemplate } from "@/models/reading.model";
import axios from "axios";
import { postReadingAnswer } from "@/utils/actions";

const API = process.env.API;

export default async function Reading({ params }: { params: { id: string } }) {

    const { data } = await axios.get<ReadingTemplate>(`${API}/api/v1/reading/${params.id}`);

    return (
        <>
            <h1>Reading</h1>
            <h2>{data.title}</h2>
            {
                data.content.map((paragraph, index) => {
                    return (
                        <p key={index}>{paragraph}</p>
                    );
                })
            }

            <h3>Questions: </h3>

            <form action={postReadingAnswer}>
                <input type="text" name="count" id="count" defaultValue={data.questions.length} hidden />
                <input type="text" name="readingId" id="readingId" defaultValue={data._id} hidden />
                <ol>
                    {
                        data.questions.map((qnc, qncIndex) => {
                            return (<li key={qncIndex}>
                                <p>{qnc.question}</p>
                                <ul>
                                    {
                                        qnc.options.map((option, choiceIndex) => {
                                            return (
                                                <li key={choiceIndex}>
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
                <button>Submit</button>
            </form>

        </>
    );
}