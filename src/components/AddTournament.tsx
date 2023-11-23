import React, { FormEvent, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Avatar, Textarea} from "@nextui-org/react";
import { useMyContext } from "@/context/MainContext";
import { CreateTournament } from "@/interfaces/tournament";
import { format } from 'date-fns';
import { AddNewTournament, GetTournaments } from "@/services/Tournament";
import { getTokenCookie } from "@/utils/cookie.util";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
};

const AddTournament: React.FC<Props> = ({ isActive }) => {
  const { tournaments, setTournaments, setTournamentUsers, toggleAddTournament, setToggleAddTournament } = useMyContext();
  const { onClose } = useDisclosure();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tournament: CreateTournament = {
      name,
      description,
      location,
      startDate,
      finishDate
    };

    try {
      const token = getTokenCookie();
      const data = await AddNewTournament(token, tournament);
      const newTournaments = await GetTournaments(token);

      if (data && newTournaments) {
        setTournaments(newTournaments);
        setTournamentUsers(newTournaments);
        setToggleAddTournament(!toggleAddTournament);
        setName('');
        setDescription('');
        setLocation('');
        setStartDate(new Date());
        setFinishDate(new Date());
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleAddTournament(!toggleAddTournament);
  };

  return (
    <Modal 
      isOpen={isActive}
      onClose={handleClose}
      placement="center"
      scrollBehavior="outside"
    >
      <ModalContent>
        {(handleClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add a Tournament</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  label="Name"
                  variant="bordered"
                  size="md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                />
                <Textarea
                  type="text"
                  label="Description"
                  variant="bordered"
                  size="md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={5}
                  isRequired
                />
                <Select
                  className="w-full"
                  label="Select location"
                  variant="bordered"
                  size="md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  isRequired
                >
                  <SelectItem
                    key="argentina"
                    startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
                  >
                    Argentina
                  </SelectItem>
                  <SelectItem
                    key="venezuela"
                    startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
                  >
                    Venezuela
                  </SelectItem>
                  <SelectItem
                    key="brazil"
                    startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
                  >
                    Brazil
                  </SelectItem>
                  <SelectItem
                    key="switzerland"
                    startContent={
                      <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
                    }
                  >
                    Switzerland
                  </SelectItem>
                  <SelectItem
                    key="germany"
                    startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
                  >
                    Germany
                  </SelectItem>
                  <SelectItem
                    key="spain"
                    startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
                  >
                    Spain
                  </SelectItem>
                  <SelectItem
                    key="france"
                    startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
                  >
                    France
                  </SelectItem>
                  <SelectItem
                    key="italy"
                    startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
                  >
                    Italy
                  </SelectItem>
                  <SelectItem
                    key="mexico"
                    startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
                  >
                    Mexico
                  </SelectItem>
                </Select>
                <Input
                  type="Date"
                  label="Start Date"
                  variant="bordered"
                  size="md"
                  value={format(startDate, 'yyyy-MM-dd')}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  isRequired
                />
                <Input
                  type="Date"
                  label="Finish Date"
                  variant="bordered"
                  size="md"
                  value={format(finishDate, 'yyyy-MM-dd')}
                  onChange={(e) => setFinishDate(new Date(e.target.value))}
                  isRequired
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleClose}>
                Close
              </Button>
            </ModalFooter>
            <ToastContainer theme="dark" autoClose={5000} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTournament;
