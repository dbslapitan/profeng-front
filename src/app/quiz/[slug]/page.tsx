import { AppProps } from "next/app";

export default function Home({params}: {params: {slug: string}}) {
    return (
        <>
            <h1 className="page-header">Quiz {params.slug}</h1>
        </>
    );
}
