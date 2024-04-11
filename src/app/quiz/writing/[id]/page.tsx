import axios from "axios";

const API = process.env.API;

export default async function Writing({ params }: {params: {id: string}}) {

    const {data} = await axios.get(`${API}/api/v1/writing/${params.id}`);

    return(
        <form action="">
            <p>{data.prompt}</p>
            <textarea name="answer" id="answer"></textarea>
            <button>Submit</button>
        </form>
    );
}