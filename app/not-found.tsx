// app/not-found.tsx

// import Link from "next/link";
// import css from "../components/Home/Home.module.css";

// export default function NotFound() {
//   return (
//     <div>
//       <h1 className={css.title}>404 - Page not found</h1>
//       <p className={css.description}>
//         Sorry, the page you are looking for does not exist.
//       </p>
//       <Link href="/">Go back home</Link>
//     </div>
//   );
// };

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => { 
      clearTimeout(timerId);
    }
  }, [router]);

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>You will be redirected to the home page automatically.</p>
    </div>
  );
}
