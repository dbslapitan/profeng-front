import { postWritingAnswer } from "@/utils/actions";
import axios from "axios";

const API = process.env.API;

export default async function Writing({ params }: {params: {id: string}}) {

    const {data} = await axios.get(`${API}/api/v1/writing/${params.id}`);

    return(
        <form action={postWritingAnswer}>
            <p>{data.prompt}</p>
            <input type="text" name="writing" id="writing" defaultValue={params.id} hidden/>
            <input type="text" name="prompt" id="promp" defaultValue={data.prompt} hidden/>
            <textarea name="essay" id="essay"></textarea>
            <button>Submit</button>
        </form>
    );
}