import React from "react";
import {Accordion, AccordionItem, User} from "@nextui-org/react";
import { useMyContext } from "@/context/MainContext";

export default function RegistrationDetail() {
  const { tournamentUsers } = useMyContext();

  return (
    <Accordion variant="splitted" className="max-w-full md:w-[42rem] lg:w-[58rem] my-16">
      {tournamentUsers.map((item) => (
        <AccordionItem key={item.id} aria-label={item.name} title={item.name}>
          {item.users.map((item) => (
            <User
              key={item.id}
              className="flex justify-start pb-4" 
              name={`${item.firstName} ${item.lastName}`}
              description={(
                <p className="text-small capitalize">
                  {item.email}
                </p>
              )}
              avatarProps={{
                src: `${item.profileImage}`,
                size: "md"
              }}
            />
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
