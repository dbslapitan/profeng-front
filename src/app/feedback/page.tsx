import axios from "axios";
import style from "./feedbacks.module.scss";
import Link from "next/link";
import { WritingFeedback } from "@/models/writing-feedback.model";

const API = process.env.API;

export default async function Feedbacks() {

    const { data } = await axios.get<[ WritingFeedback ]>(`${API}/api/v1/feedback`);

    return(
        <>
            <h1>Feedbacks</h1>
            {
                data.map((feedback: WritingFeedback) => {

                    const segment = feedback.skill.toLowerCase();

                    return(
                        <Link key={feedback._id} href={`/feedback/${segment}/${feedback._id}`} className={style["card"]}>
                            <p>ID: {feedback._id}</p>
                            <p>Skill: {feedback.skill}</p>
                            <p>Prompt: {feedback.writingId.prompt}</p>
                        </Link>
                    );
                })
            }
        </>
    );
}