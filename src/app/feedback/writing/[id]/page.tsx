import { WritingFeedback } from "@/models/writing-feedback.model";
import axios from "axios";

const API = process.env.API;

export default async function Feedback({ params } : {params: {id: string}}) {

    const { data: feedback } = await axios.get<WritingFeedback>(`${API}/api/v1/feedback/${params.id}`);

    return(
        <div>
            <div>
                <p>ID: {feedback._id}</p>
                <p>Skill: { feedback.skill }</p>
            </div>
            <div>
                <p>Prompt: {feedback.writingId.prompt}</p>
                <h2>Essay:</h2>
                {
                    feedback.essay.map(paragraph => {
                        return <p>{paragraph}</p>;
                    })
                }
                <h2>Feedback:</h2>
                <ol>
                {
                    feedback.feedback.map(paragraph => {
                        return <li>{paragraph}</li>;
                    })
                }
                </ol>
                
                <h2>Improved Version:</h2>
                {
                    feedback.improvedVersion.map(paragraph => {
                        return <p>{paragraph}</p>;
                    })
                }
            </div>
        </div>
    );
}