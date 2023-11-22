import { useMyContext } from "@/context/MainContext";
import { UpdateUser } from "@/interfaces/user";
import { EditAdminUser } from "@/services/User";
import { getTokenCookie } from "@/utils/cookie.util";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
  id: number,
};

const EditUser: React.FC<Props> = ({ isActive, id }) => {
  const { toggleEditUser, setToggleEditUser } = useMyContext();
  const { onClose } = useDisclosure();

  const { users, setUsers} = useMyContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedUser: UpdateUser = {
      firstName,
      lastName,
      bio,
      state,
      role,
      email,
      password
    }

    const filter = (user: UpdateUser) => {
      const filterAttributes: any = {};
    
      Object.entries(user).forEach(([key, value]) => {
        if (value !== '') {
          filterAttributes[key] = value;
        }
      });
    
      return filterAttributes;
    };

    try {
      const token = getTokenCookie();
      const user = filter(updatedUser);

      const data = await EditAdminUser(token, id, user);

      if (data) {
        const newUsers = users.map(objeto => {
          if (objeto.id === id) {
            return { ...objeto, ...user };
          }
          return objeto;
        });

        setUsers(newUsers);
        setToggleEditUser(!toggleEditUser);
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleEditUser(!toggleEditUser);
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
            <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
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
                <Select 
                  label="Select Role" 
                  className="w-full"
                  variant="bordered"
                  size="md"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <SelectItem key="user" value="user">
                    User
                  </SelectItem>
                </Select>
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

export default EditUser;
