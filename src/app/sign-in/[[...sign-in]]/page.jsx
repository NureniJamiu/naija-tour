import { SignIn } from "@clerk/nextjs";

const page = () => {
  return <div className="h-screen flex items-center justify-center">
    <SignIn />
  </div>
};

export default page;
