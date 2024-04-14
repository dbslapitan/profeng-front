import Link from "next/link";
import NavLink from "../nav-link/NavLink";
import style from "./HeaderNav.module.scss";
import { usePathname } from "next/navigation";

export default function HeaderNav() {

    return(
        <header className={style["header"]}>
            <Link href="/quiz">
                <div className={style["logo"]}>
                    <span className={style["logo__left"]}>Prof</span>
                    <span className={style["logo__right"]}>Eng</span>
                </div>
            </Link>
            <nav className={style["nav"]}>
                <ul className={style["nav__list"]}>
                    <li className={style["nav__item"]}><NavLink selected={style["nav__link--selected"]} className={style["nav__link"]} href="/quiz">Quizzes</NavLink></li>
                    <li className={style["nav__item"]}><NavLink selected={style["nav__link--selected"]} className={style["nav__link"]} href="/feedback">Feedbacks</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}