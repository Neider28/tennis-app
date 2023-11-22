"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { UserData } from "@/interfaces/user";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsUser from "@/middlewares/isUser.middleware";
import Loading from "@/components/Loading";
import { MyProfile } from "@/services/Authentication";
import { getTokenCookie } from "@/utils/cookie.util";
import TableRegisterTournaments from "@/components/TableRegisterTournaments";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>();
  
  useEffect(() => {
    document.title = 'Dashboard';

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
      user ? (<IsUser>
        <Header user={user} />
        <main className="flex min-h-screen flex-col items-center justify-start p-3 pt-12">
          <div className="flex flex-col w-full items-center justify-center">
            <Card className="max-w-full md:w-[42rem] lg:w-[58rem]">
              <CardBody className="overflow-hidden">
                <TableRegisterTournaments userId={user.id} />
              </CardBody>
            </Card>
          </div>
          <ToastContainer theme="dark" autoClose={5000} />
        </main>
      </IsUser>) : <Loading />}
    </IsNotAuth>
  );
};
