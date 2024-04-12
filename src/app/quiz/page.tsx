"use client";

import { MouseEvent } from "react";
import style from "./quiz.module.scss";
import axios from "axios";
import { navigate } from "@/utils/actions";

const API = process.env.NEXT_PUBLIC_API;

export default function Quiz() {

    const handleClick = async(e: MouseEvent) => {

        const skill = (e.target as HTMLButtonElement).textContent;

        if(skill === "Reading"){
            const { data } = await axios.get(`${API}/api/v1/reading`);
            navigate(`/quiz/reading/${data}`);
        }
        else{
            const { data } = await axios.get(`${API}/api/v1/writing`);
            navigate(`/quiz/writing/${data}`);
        }

    }

    return(
        <ul className={style["cta__list"]}>
            <li className={style["cta__item"]}><button onClick={handleClick} className={style["cta__link"]}>Reading</button></li>
            <li className={style["cta__item"]}><button onClick={handleClick} className={style["cta__link"]}>Writing</button></li>
        </ul>
    );
}