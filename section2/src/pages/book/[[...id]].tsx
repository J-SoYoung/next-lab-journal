import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;

  return (
    <div>
      <h1>BOOK - {id}</h1>
    </div>
  );
}
