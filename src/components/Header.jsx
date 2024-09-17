'use client';
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Header = () => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-24 py-3 bg-white shadow-sm z-10">
            <a href="/" className="text-green-600 text-xl font-semibold">
                9ja<span className="text-black">Tour</span>
            </a>
            <div className="flex items-center justify-between gap-1">
                {!user ? (
                    <>
                        <a href="/sign-in" className="text-gray-600">Login</a>
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => router.push("/sign-up")}
                        >
                            Signup
                        </Button>
                    </>
                ) : (
                    <>
                        <span className="capitalize">{user?.username} | </span>
                        <UserButton />
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
