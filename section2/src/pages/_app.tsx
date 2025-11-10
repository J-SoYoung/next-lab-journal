import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
  };
  useEffect(() => {
    router.prefetch("/test");
  }, []);
  return (
    <>
      <header>
        <Link href={"/"}>Home</Link>
        &nbsp;
        <Link href={"/search"} prefetch={false}>
          Search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>Book</Link>
        <div>
          <button onClick={onClickButton}> /test로 이동 </button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
