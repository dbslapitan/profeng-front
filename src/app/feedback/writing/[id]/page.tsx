import { WritingFeedback } from "@/models/writing-feedback.model";
import axios from "axios";
import style from "./writing-feedback.module.scss";
import { notFound, redirect } from "next/navigation";
import { revalidatePath, unstable_noStore } from "next/cache";

const API = process.env.API;

export default async function Feedback({ params } : {params: {id: string}}) {
    unstable_noStore();

    try{
        const { data: feedback, status } = await axios.get<WritingFeedback>(`${API}/api/v1/feedback/writing/${params.id}`);
        
        return(
            <section className={`${style["writing"]}`}>
                <h1 className={`${style["writing__prompt"]}`}>{feedback.writing.prompt}</h1>
                <h2 className={`section-header ${style["writing__sub"]}`}>Essay:</h2>
                {
                    feedback.essay.map((paragraph, index) => {
                        return <p className={`regular ${style["writing__paragraph"]}`} key={index}>{paragraph}</p>;
                    })
                }
                <h2 className={`section-header ${style["writing__sub"]}`}>Feedback:</h2>
                <ol className={`${style["writing__essay"]}`}>
                {
                    feedback.feedback.map((paragraph, index) => {
                        return <li className={`regular ${style["writing__paragraph"]}`} key={index}>{paragraph}</li>;
                    })
                }
                </ol>
                
                <h2 className={`section-header ${style["writing__sub"]}`}>Sample:</h2>
                {
                    feedback.improvedVersion.map((paragraph, index) => {
                        return <p className={`regular ${style["writing__paragraph"]}`} key={index}>{paragraph}</p>;
                    })
                }
            </section>
        );
    }
    catch(error){
        notFound();
    }

    
}