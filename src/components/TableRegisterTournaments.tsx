import { useCallback, useEffect, useState } from "react";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react";
import { TournamentData } from "@/interfaces/tournament";
import { stateTournamentColorMap } from "@/utils/statusColorMap";
import { EyeIcon } from "@/icons/EyeIcon";
import { EditIcon } from "@/icons/EditIcon";
import { useMyContext } from "@/context/MainContext";
import { GetTournaments } from "@/services/Tournament";
import { getTokenCookie } from "@/utils/cookie.util";
import DetailTournament from "./TournamentDetail";
import RegisterTournament from "./RegisterTournament";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function TableRegisterTournaments({ userId }: { userId: number }) {
  const [idTournament, setIdTournament] = useState<number>(0);
  const [tournamentDetail, setTournamentDetail] = useState<TournamentData | undefined>();
  
  const {
    tournaments,
    setTournaments,
    toggleRegisterTournament,
    setToggleRegisterTournament,
    toggleTournamentDetail,
    setToggleTournamentDetail,
  } = useMyContext();

  const columns = [
    {name: "NAME", uid: "name"},
    {name: "START DATE", uid: "startDate"},
    {name: "LOCATION", uid: "location"},
    {name: "STATE", uid: "state"},
    {name: "ACTIONS", uid: "actions"},
  ];

  const renderCell = useCallback((tournament: TournamentData, columnKey: React.Key) => {
    const cellValue = tournament[columnKey as keyof TournamentData];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: tournament.image}}
            name={tournament.name}
          >
            {tournament.name}
          </User>
        );
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm uppercase">{tournament.location}</p>
          </div>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm uppercase">{tournament.startDate.toString()}</p>
          </div>
        );
      case "state":
        return (
          <Chip className="capitalize" color={stateTournamentColorMap[tournament.state]} size="sm" variant="flat">
            {tournament.state}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {handleDetail(tournament)}}>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Register">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {handleEdit(tournament.id)}}>
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleDetail = (tournament: TournamentData) => {
    setToggleTournamentDetail(!toggleTournamentDetail);
    setTournamentDetail(tournament);
  };

  const handleEdit = (id: number) => {
    setIdTournament(id);
    setToggleRegisterTournament(!toggleRegisterTournament);
  };

  useEffect(() => {
    try {
      const getDataTournaments = async (token: string) => {
        const data = await GetTournaments(token);

        setTournaments(data);
      }

      const token = getTokenCookie();

      if(token) {
        getDataTournaments(token);
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  }, []);

  return (
    <><Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tournaments} emptyContent={"No tournaments"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    <DetailTournament tournament={tournamentDetail} isActive={toggleTournamentDetail} />
    <RegisterTournament isActive={toggleRegisterTournament} userId={userId} tournamentId={idTournament} />
    <ToastContainer theme="dark" autoClose={5000} /></>
  );
};
