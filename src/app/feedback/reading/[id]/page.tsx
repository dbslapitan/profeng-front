import { ReadingFeedback } from "@/models/reading-feedback.model";
import axios from "axios";

const API = process.env.API;

export default async function Reading({ params }: { params: { id: string } }) {

    const { data } = await axios.get<ReadingFeedback>(`${API}/api/v1/feedback/reading/${params.id}`);

    return (
        <>
            <h1>Reading</h1>
            <h2>{data.reading.title}</h2>
            {
                data.reading.content.map((paragraph, index) => {
                    return (
                        <p key={index}>{paragraph}</p>
                    );
                })
            }

            <h3>Questions: </h3>
            <ol>
                {
                    data.reading.questions.map((qnc, qncIndex) => {
                        return (<li key={qncIndex}>
                            <p>{qnc.question}</p>
                            <ul>
                                {
                                    qnc.options.map((option, choiceIndex) => {
                                        return (
                                            <li key={choiceIndex}>
                                                {option} {option === data.answers[qncIndex] ? "correct" : "wrong"}
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

        </>
    );
}