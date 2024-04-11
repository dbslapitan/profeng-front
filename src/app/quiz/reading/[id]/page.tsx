import axios from "axios";

const API = process.env.API;

export default async function Reading({ params }: {params: {id: string}}) {

    const {data} = await axios.get(`${API}/api/v1/reading/${params.id}`);

    return(
        <>

        </>
    );
}