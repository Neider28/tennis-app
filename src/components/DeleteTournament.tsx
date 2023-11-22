import { useMyContext } from "@/context/MainContext";
import { RemoveTournament } from "@/services/Tournament";
import { getTokenCookie } from "@/utils/cookie.util";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
  id: number,
};

const DeleteTournament: React.FC<Props> = ({ isActive, id }) => {
  const { tournamentUsers, setTournamentUsers, tournaments, setTournaments, toggleDeleteTournament, setToggleDeleteTournament } = useMyContext();
  const { onClose } = useDisclosure();

  const handleDeleteTournament = async (id: number) => {
    const token = getTokenCookie();

    try {
      const response = await RemoveTournament(token, id);

      if (response) {
        const newTournaments = tournaments.filter(item => item.id !== id);
        const newTournamentUsers = tournamentUsers.filter(item => item.id !== id);
        setTournaments(newTournaments);
        setTournamentUsers(newTournamentUsers);
        handleClose();
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleDeleteTournament(!toggleDeleteTournament);
  };

  return (
    <Modal backdrop="blur" isOpen={isActive} onClose={handleClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete Tournament</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to eliminate this tournament?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="secondary" onPress={() => {handleDeleteTournament(id)}}>
                Delete
              </Button>
            </ModalFooter>
            <ToastContainer theme="dark" autoClose={5000} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteTournament;
