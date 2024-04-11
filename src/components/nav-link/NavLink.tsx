'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink({ href, children, className }: {href: string, children: ReactNode, className: string}) {

    const path = usePathname();

    return(
        <Link className={className} href={href}>{children}</Link>
    );
}