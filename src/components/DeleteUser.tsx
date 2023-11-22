import { useMyContext } from "@/context/MainContext";
import { RemoveUser } from "@/services/User";
import { getTokenCookie } from "@/utils/cookie.util";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
  id: number,
};

const DeleteUser: React.FC<Props> = ({ isActive, id }) => {
  const { users, setUsers, toggleDeleteUser, setToggleDeleteUser } = useMyContext();
  const { onClose } = useDisclosure();

  const handleDeleteTournament = async (id: number) => {
    const token = getTokenCookie();

    try {
      const response = await RemoveUser(token, id);

      if (response) {
        const newUsers = users.filter(item => item.id !== id);
        setUsers(newUsers);
        handleClose();
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleDeleteUser(!toggleDeleteUser);
  };

  return (
    <Modal backdrop="blur" isOpen={isActive} onClose={handleClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete User</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to eliminate this user?</p>
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

export default DeleteUser;
