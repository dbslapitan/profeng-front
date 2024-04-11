import axios from "axios";
import style from "./feedbacks.module.scss";
import Link from "next/link";

const API = process.env.API;

export default async function Feedbacks() {

    const { data } = await axios.get<[ { writingId: {"_id": string, prompt: string}, "_id": string, feedback: [string], improvedVersion: [string] } ]>(`${API}/api/v1/feedback`);

    return(
        <>
            <h1>Feedbacks</h1>
            {
                data.map((feedback: { writingId: {"_id": string, prompt: string}, "_id": string, feedback: [string], improvedVersion: [string] }) => {

                    return(
                        <Link href={`/feedback/${feedback._id}`} className={style["card"]}>
                            <p>id: {feedback._id}</p>
                            <p>Prompt: {feedback.writingId.prompt}</p>
                        </Link>
                    );
                })
            }
        </>
    );
}