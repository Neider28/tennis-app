import { useMyContext } from "@/context/MainContext";
import { RegisterUserTournament } from "@/services/User";
import { getTokenCookie } from "@/utils/cookie.util";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
  userId: number,
  tournamentId: number,
};

const RegisterTournament: React.FC<Props> = ({ isActive, userId, tournamentId }) => {
  const { toggleRegisterTournament, setToggleRegisterTournament } = useMyContext();
  const { onClose } = useDisclosure();

  const handleRegister = async (userId: number, tournamentId: number) => {
    const token = getTokenCookie();

    try {
      const response = await RegisterUserTournament(token, userId, tournamentId);

      if (response) {
        handleClose();
      } 
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleRegisterTournament(!toggleRegisterTournament);
  };

  return (
    <Modal backdrop="blur" isOpen={isActive} onClose={handleClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to register for this tournament?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="secondary" onPress={() => {handleRegister(userId, tournamentId)}}>
                Register
              </Button>
            </ModalFooter>
            <ToastContainer theme="dark" autoClose={5000} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RegisterTournament;
