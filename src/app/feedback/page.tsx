import axios from "axios";
import style from "./feedbacks.module.scss";
import Link from "next/link";
import { WritingFeedback } from "@/models/writing-feedback.model";
import { ReadingFeedback } from "@/models/reading-feedback.model";

const API = process.env.API;

export default async function Feedbacks() {

    const { data: feedbacks } = await axios.get<[WritingFeedback | ReadingFeedback]>(`${API}/api/v1/feedback`);

    return (
        <>
            <h1>Feedbacks</h1>
            {
                feedbacks.map((feedback: WritingFeedback | ReadingFeedback) => {

                    const segment = feedback.skill.toLowerCase();

                    if (feedback.skill === "Writing") {

                        const writingFeedback = feedback as WritingFeedback;

                        const dateTaken = new Date(feedback.createdAt);
                        const dataString = dateTaken.toString();

                        return (
                            <Link key={writingFeedback._id} href={`/feedback/${segment}/${writingFeedback._id}`} className={style["card"]}>
                                <p>ID: {writingFeedback._id}</p>
                                <p>Skill: {writingFeedback.skill}</p>
                                <p>Taken On: {dataString}</p>
                                <p>Prompt: {writingFeedback.writing.prompt}</p>
                            </Link>
                        );
                    }
                    else{

                        const readingFeedback = feedback as ReadingFeedback;

                        const dateTaken = new Date(feedback.createdAt);
                        const dataString = dateTaken.toString();

                        return (
                            <Link key={readingFeedback._id} href={`/feedback/${segment}/${readingFeedback._id}`} className={style["card"]}>
                                <p>ID: {readingFeedback._id}</p>
                                <p>Skill: {readingFeedback.skill}</p>
                                <p>Taken On: {dataString}</p>
                                <p>Title: {readingFeedback.reading.title}</p>
                            </Link>
                        );
                    }
                })
            }
        </>
    );
}