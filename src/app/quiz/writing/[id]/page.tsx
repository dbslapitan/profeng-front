import { postWritingAnswer } from "@/utils/actions";
import axios from "axios";
import style from "./writing-quiz.module.scss";

const API = process.env.API;

export default async function Writing({ params }: {params: {id: string}}) {

    const {data, status} = await axios.get(`${API}/api/v1/writing/${params.id}`);

    return(
        <form className={`${style["writing"]}`} action={postWritingAnswer}>
            <p className={`${style["writing__prompt"]}`}>{data.prompt}</p>
            <input type="text" name="writing" id="writing" defaultValue={params.id} hidden/>
            <input type="text" name="prompt" id="promp" defaultValue={data.prompt} hidden/>
            <h1 className={`${style["writing__title"]}`}>Essay</h1>
            <textarea className={`${style["writing__essay"]}`} name="essay" id="essay"></textarea>
            <button className={`${style["writing__submit"]}`}>Submit</button>
        </form>
    );
}