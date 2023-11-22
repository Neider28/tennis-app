"use client"
import Header from "@/components/Header";
import { UpdateProfile, UserData } from "@/interfaces/user";
import { MyProfile } from "@/services/Authentication";
import { useRouter } from "next/navigation";
import { EditMyProfile } from "@/services/Authentication";
import { getTokenCookie } from "@/utils/cookie.util";
import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { useMyContext } from "@/context/MainContext";
import EditUserAvatar from "@/components/EditUserAvatar";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {
  const { toggleEditUserAvatar } = useMyContext();
  const [user, setUser] = useState<UserData | null>();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedUser: UpdateProfile = {
      firstName,
      lastName,
      bio,
      email,
      password
    };

    const filter = (user: UpdateProfile) => {
      const filterAttributes: any = {};
    
      Object.entries(user).forEach(([key, value]) => {
        if (value !== '') {
          filterAttributes[key] = value;
        }
      });
    
      return filterAttributes;
    };

    const user = filter(updatedUser);

    try {
      const token = getTokenCookie();

      const data = await EditMyProfile(token, user);

      if (data) {
        router.push('/profile');
      }
    } catch (error) {
      toast.error('There was an error, please try again later');
    }
  };

  useEffect(() => {
    document.title = 'Edit My Profile';

    try {
      const getDataProfile = async (token: string) => {
        const data = await MyProfile(token);

        setUser(data);
      };

      const token = getTokenCookie();

      if(token) {
        getDataProfile(token);
      }
    } catch (error) {
      toast.error('There was an error, please try again later');
    }
  }, []);

  return (
    <IsNotAuth>{
      user ? (
        <>
          <Header user={user} />
          <main className="flex min-h-screen flex-col items-center justify-start px-3 pt-12 pb-20">
            <Card className="w-full md:w-[42rem] lg:w-[58rem] py-4 px-3">
              <CardHeader className="justify-between">
                <EditUserAvatar isActive={toggleEditUserAvatar} url={user.profileImage} />
              </CardHeader>
              <CardBody className="px-3 py-6 text-medium text-default-400">
                <form className="flex flex-col gap-4 lg:w-6/12" onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    label="First Name"
                    variant="bordered"
                    size="md"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    size="md"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Textarea
                    type="text"
                    label="Bio"
                    variant="bordered"
                    size="md"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    size="md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    label="Password"
                    variant="bordered"
                    minLength={5}
                    size="md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    color="secondary"
                    variant="shadow"
                    size="lg"
                    type="submit"
                  >
                    Save
                  </Button>
                </form>
              </CardBody>
            </Card>
            <ToastContainer theme="dark" autoClose={5000} />
          </main>
        </>
      ) : (<ToastContainer theme="dark" autoClose={5000} />)
    }</IsNotAuth>
  );
};
