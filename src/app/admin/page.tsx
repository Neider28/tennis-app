"use client"
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Header from "@/components/Header";
import { MyProfile } from "@/services/Authentication";
import { getTokenCookie } from "@/utils/cookie.util";
import { UserData } from "@/interfaces/user";
import Loading from "@/components/Loading";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import TableTournaments from "@/components/TableTournaments";
import TableUser from "@/components/TableUser";
import IsAdmin from "@/middlewares/isAdmin.middleware";
import RegistrationDetail from "@/components/RegistrationDetail";

export default function Admin() {
  const [selected, setSelected] = React.useState(1);
  const [user, setUser] = React.useState<UserData | null>();

  const handleSelectionChange = (key: any) => {
    setSelected(key);
  };

  useEffect(() => {
    document.title = 'Admin Dashboard';

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
      setUser(null);
    }
  }, []);

  return (
    <IsNotAuth>
      {user ? (
        <IsAdmin>
          <Header user={user} />
          <main className="flex min-h-screen flex-col items-center justify-start p-3 pt-12">
            <div className="flex flex-col w-full items-center justify-center">
              <Card className="max-w-full md:w-[42rem] lg:w-[58rem]">
                <CardBody className="overflow-hidden">
                  <Tabs
                    fullWidth
                    size="lg"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={handleSelectionChange}
                  >
                    <Tab key={1} title="Tournaments">
                      <TableTournaments />
                    </Tab>
                    <Tab key={2} title="Users">
                      <TableUser />
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </div>
            <RegistrationDetail />
          </main>
        </IsAdmin>
      ) : <Loading />}
    </IsNotAuth>
  );
};
