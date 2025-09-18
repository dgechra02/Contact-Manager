import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";



export default function Header() {
  return (
    <>
      <div className="px-5 py-2 flex justify-between border-b-2">
        <h1 className="text-2xl font-bold">Contact Manager</h1>
        <div className="flex gap-2"> <LoginButton /> <RegisterButton /></div>
      </div>
    </>
  );
}


