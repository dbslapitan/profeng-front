import axios from "axios";

const API = process.env.API;

export default async function Reading({ params }: {params: {id: string}}) {

    const {data} = await axios.get(`${API}/api/v1/reading/${params.id}`);
    console.log(data);

    return(
        <>
            <h1>Reading</h1>
            <h2>data.title</h2>
        </>
    );
}