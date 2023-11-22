"use client"
import { FormEvent, useEffect, useState } from "react";
import { Register } from "@/services/Authentication";
import { Button, Input, Image, Card, CardBody } from "@nextui-org/react";
import { CreateUser } from "@/interfaces/user";
import { useRouter } from "next/navigation";
import IsAuth from "@/middlewares/isAuth.middleware";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user: CreateUser = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const data = await Register(user);

      if (data) {
        router.push('/login');
      }
    } catch (error) {
      toast.error('There was an error registering, please try again later or change your email');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up';
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
                type="text"
                label="First Name"
                variant="bordered"
                size="md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                isRequired
              />
              <Input
                type="text"
                label="Last Name"
                variant="bordered"
                size="md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                isRequired
              />
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
                variant="ghost"
                size="lg"
                type="submit"
              >
                Sign Up
              </Button>  
            </form>
          </CardBody>
        </Card>
        <ToastContainer theme="dark" autoClose={5000} />
      </main>
    </IsAuth>
  );
};
