import { useMyContext } from "@/context/MainContext";
import { UserData } from "@/interfaces/user";
import { stateUserColorMap } from "@/utils/statusColorMap";
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";

interface Props {
  isActive: boolean,
  user: UserData | undefined
};

const UserDetail: React.FC<Props> = ({ isActive, user }) => {
  const { toggleUserDetail, setToggleUserDetail } = useMyContext();
  const { onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
    setToggleUserDetail(!toggleUserDetail);
  };

  return (
    <Modal backdrop="blur" isOpen={isActive} onClose={handleClose} placement="center">
      <ModalContent>
        {(handleClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
            <ModalBody>
              <User
                className="flex justify-start" 
                name={`${user?.firstName} ${user?.lastName}`}
                description={(
                  <p className="text-small">
                    {user?.email}
                  </p>
                )}
                avatarProps={{
                  src: `${user?.profileImage}`,
                  size: "lg"
                }}
              />
              <div className="flex h-5 items-center space-x-4 text-small">
                {user && (
                  <Chip color={stateUserColorMap[user.state]} variant="bordered" className="capitalize">{user?.state}</Chip>
                )}
                
                <Divider orientation="vertical" />
                <Chip color="success" variant="flat" className="uppercase">{user?.role}</Chip>
              </div>
              <p>{user?.bio}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserDetail;
