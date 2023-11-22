"use client"
import { FormEvent, useEffect, useState } from "react";
import { Button, Input, Image, CardBody, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/interfaces/user";
import { setTokenCookie } from "@/utils/cookie.util";
import IsAuth from "@/middlewares/isAuth.middleware";
import { checkUserRole } from "@/utils/checkRole.util";
import { SignIn } from "@/services/Authentication";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user: LoginUser = {
      email,
      password,
    };

    try {
      const data = await SignIn(user);

      if (data) {
        const token = data.access_token;

        setTokenCookie(token, 360);

        const role = await checkUserRole(token);

        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      toast.error("Incorrect user or password");
    }
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <IsAuth>
      <main className="flex min-h-screen flex-col items-center justify-center p-3">
        <Card className="w-full md:w-[24rem]" shadow="sm">
          <CardBody className="overflow-hidden flex flex-col items-center justify-center py-6 px-4">
            <Image
              isBlurred
              width={150}
              alt="NextUI hero Image"
              src="https://res.cloudinary.com/dulkx1wtf/image/upload/v1700350396/logo_fdx7kd.png"
              className="m-1"
            />
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
              <Input
                type="email"
                label="Email"
                variant="bordered"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />
              <Input
                type="password"
                label="Password"
                variant="bordered"
                size="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={5}
                isRequired
              />
              <Button
                color="secondary"
                variant="shadow"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
        <ToastContainer theme="dark" autoClose={5000} />
      </main>
    </IsAuth>
  );
};
