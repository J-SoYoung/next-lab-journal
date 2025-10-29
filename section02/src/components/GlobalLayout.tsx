import Link from "next/link";
import { ReactNode } from "react";
import style from "./globalLayout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📒ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.header}>제작 @Sopang</footer>
    </div>
  );
}
