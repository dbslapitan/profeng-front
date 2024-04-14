'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink({ href, children, className, selected }: {href: string, children: ReactNode, className: string, selected: string}) {

    const path = usePathname();

    return(
        <Link className={ `${className} ${path.startsWith(href) ? selected : '' }`} href={href}>{children}</Link>
    );
}