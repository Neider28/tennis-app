import { FormEvent, useState } from "react";
import { useMyContext } from "@/context/MainContext";
import { UpdateTournament } from "@/interfaces/tournament";
import { EditAdminTournament } from "@/services/Tournament";
import { getTokenCookie } from "@/utils/cookie.util";
import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
  id: number,
};

const EditTournament: React.FC<Props> = ({ isActive, id }) => {
  const { tournaments, setTournaments, toggleEditTournament, setToggleEditTournament } = useMyContext();
  const { onClose } = useDisclosure();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedTournament: UpdateTournament = {
      name,
      description,
      location,
      state,
      startDate,
      finishDate,
    };

    const filter = (tournament: UpdateTournament) => {
      const filterAttributes: any = {};
      const date = new Date().toISOString().slice(0, 10);
    
      Object.entries(tournament).forEach(([key, value]) => {
        if (value !== '' && !(value instanceof Date && value.toISOString().slice(0, 10) === date)) {
          filterAttributes[key] = value;
        }
      });
    
      return filterAttributes;
    };

    try {
      const token = getTokenCookie();
      const tournament = filter(updatedTournament);

      const data = await EditAdminTournament(token, id, tournament);

      if (data) {
        const newTournaments = tournaments.map(item => {
          if (item.id === id) {
            return { ...item, ...tournament };
          }
          return item;
        });

        setTournaments(newTournaments);
        setToggleEditTournament(!toggleEditTournament);
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleEditTournament(!toggleEditTournament);
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
            <ModalHeader className="flex flex-col gap-1">Edit Tournament</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  label="Name"
                  variant="bordered"
                  size="md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  type="text"
                  label="Description"
                  variant="bordered"
                  size="md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={5}
                />
                <Select
                  className="w-full"
                  label="Select Location"
                  variant="bordered"
                  size="md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                <Select 
                  label="Select State" 
                  className="w-full"
                  variant="bordered"
                  size="md"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <SelectItem key="active" value="active">
                    Active
                  </SelectItem>
                </Select>
                <Input
                  type="Date"
                  label="Start Date"
                  variant="bordered"
                  size="md"
                  value={format(startDate, 'yyyy-MM-dd')}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
                <Input
                  type="Date"
                  label="Finish Date"
                  variant="bordered"
                  size="md"
                  value={format(finishDate, 'yyyy-MM-dd')}
                  onChange={(e) => setFinishDate(new Date(e.target.value))}
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

export default EditTournament;
