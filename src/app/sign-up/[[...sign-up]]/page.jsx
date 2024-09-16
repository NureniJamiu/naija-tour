import { SignUp } from "@clerk/nextjs";

const page = () => {
  return <div className="h-screen flex items-center justify-center">
    <SignUp />
  </div>;
};

export default page;
