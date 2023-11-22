"use client"
import Header from "@/components/Header";
import { TournamentData } from "@/interfaces/tournament";
import { UserData } from "@/interfaces/user";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { MyProfile } from "@/services/Authentication";
import { getTokenCookie } from "@/utils/cookie.util";
import { stateUserColorMap } from "@/utils/statusColorMap";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Divider, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const [user, setUser] = useState<UserData | null>();
  const [userTournaments, setUserTournaments] = useState<TournamentData[] | null>();

  useEffect(() => {
    document.title = 'My Profile';

    try {
      const getDataProfile = async (token: string) => {
        const data = await MyProfile(token);

        setUser(data);
        setUserTournaments(data.tournaments);
      };

      const token = getTokenCookie();

      if(token) {
        getDataProfile(token);
      }
    } catch (error) {
      toast.error('There was an error registering, please try again later');
    }
  }, []);

  return (
    <IsNotAuth>{
      user ? (<>
        <Header user={user} />
        <main className="flex min-h-screen flex-col items-center justify-start p-3 pt-12">
          <Card className="w-full md:w-[42rem] lg:w-[58rem] py-4 px-3">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered color="success" radius="full" size="lg" src={user.profileImage} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-medium font-semibold leading-none text-default-600">{`${user.firstName} ${user.lastName}`}</h4>
                  <h5 className="text-small tracking-tight text-default-400">{user.email}</h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 text-medium text-default-400">
              <div className="flex h-5 items-center space-x-4 text-small">
              {user && (
                <Chip color={stateUserColorMap[user.state]} variant="bordered" className="capitalize">{user?.state}</Chip>
              )}
              <Divider orientation="vertical" />
              <Chip color="success" variant="flat" className="uppercase">{user?.role}</Chip>
              </div>
              <p className="py-4">
                {user.bio}
              </p>
            </CardBody>
            <CardFooter className="gap-3">
              {user.role === 'user' && (
                <div className="flex flex-col gap-1">
                  <Chip color="warning" variant="faded" size="md">{userTournaments?.length} Tournaments</Chip>
                  <div className="flex flex-col items-start justify-center mt-4 gap-4">
                  {userTournaments?.map((item) => (
                    <User
                      key={item.id} 
                      name={item.name}
                      description={(
                        <p className="text-small capitalize">
                          {item.location}
                        </p>
                      )}
                      avatarProps={{
                        src: `${item.image}`,
                        size: "md",
                      }}
                    />
                  ))}
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </main>
      </>) : (<ToastContainer theme="dark" autoClose={5000} />)
    }</IsNotAuth>
  );
};
