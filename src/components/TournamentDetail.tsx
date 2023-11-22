import { useMyContext } from "@/context/MainContext";
import { TournamentData } from "@/interfaces/tournament";
import { stateTournamentColorMap } from "@/utils/statusColorMap";
import {
  Button,
  Chip,
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
  tournament: TournamentData | undefined,
};

const TournamentDetail: React.FC<Props> = ({ isActive, tournament }) => {
  const { toggleTournamentDetail, setToggleTournamentDetail } = useMyContext();
  const { onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
    setToggleTournamentDetail(!toggleTournamentDetail);
  };

  return (
    <Modal backdrop="blur" isOpen={isActive} onClose={handleClose} placement="center">
      <ModalContent>
        {(handleClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
            <ModalBody>
              <div className="flex h-5 items-center space-x-4 text-small">
                <Chip color="default" variant="flat" className="capitalize">{tournament?.startDate.toString()} to {tournament?.finishDate.toString()}</Chip>
              </div>
              <User
                className="flex justify-start" 
                name={tournament?.name}
                description={(
                  <p className="text-small capitalize">
                    {tournament?.location}
                  </p>
                )}
                avatarProps={{
                  src: `${tournament?.image}`,
                  size: "lg"
                }}
              />
              <div className="flex h-5 items-center space-x-4 text-small">
                {tournament && (
                  <Chip color={stateTournamentColorMap[tournament.state]} variant="bordered" className="capitalize">{tournament?.state}</Chip>
                )}
              </div>
              <p>{tournament?.description}</p>
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

export default TournamentDetail;
