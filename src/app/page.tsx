import { redirect } from "next/navigation";
import styles from "./page.module.scss";

export default function Home() {

    redirect('/quiz');

    return (
        <>

            <h1 className="page-header">Homepage</h1>
        </>
    );
}
