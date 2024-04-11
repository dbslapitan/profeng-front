import Link from "next/link";
import NavLink from "../nav-link/NavLink";
import style from "./HeaderNav.module.scss";

export default function HeaderNav() {
    return(
        <header className={style["header"]}>
            <Link href="/quiz">Profeng</Link>
            <nav className={style["nav"]}>
                <ul className={style["nav__list"]}>
                    <li className={style["nav__item"]}><NavLink className={style["nav__link"]} href="/quiz">Take Quiz</NavLink></li>
                    <li className={style["nav__item"]}><NavLink className={style["nav__link"]} href="/feedbacks">Feedbacks</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}