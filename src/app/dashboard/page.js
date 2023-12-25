import { Button } from "@nextui-org/react";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export default function Page() {
  //ambil cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  // console.log(token.value);

  //decode token
  const payload = verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
  // console.log(payload);

  return (
    <div>
      <header className="flex justify-between items-center p-8">
        <div>Eventmakers</div>
        <nav className="flex items-center gap-4">
          <div>{payload.name}</div>
          <Button>Logout</Button>
        </nav>
      </header>
    </div>
  );
}
