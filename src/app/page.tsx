"use client"
import { getTokenCookie } from "@/utils/cookie.util";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    document.title = 'Tennis Match Up';

    const token = getTokenCookie();

    if (token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-3">
      <Image
        isBlurred
        width={200}
        alt="NextUI hero Image"
        src="https://res.cloudinary.com/dulkx1wtf/image/upload/v1700350396/logo_fdx7kd.png"
        className="m-1"
      />
      {
        isAuthenticated ? (
          <div className="flex justify-center flex-col container gap-3 sm:flex-row">
            <Link href="/login">
              <Button
                type="button"
                color="secondary"
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                type="button"
                color="secondary"
                variant="shadow"
                size="lg"
                className="w-full"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center flex-col container gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button
                type="button"
                color="secondary"
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        )
      }
    </main>
  );
};
