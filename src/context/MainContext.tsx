import React, { useContext, createContext, useState} from "react";
import { TournamentData, TournamentUsersData } from "@/interfaces/tournament";
import { UserData } from "@/interfaces/user";

type ContextType = {
  tournaments: TournamentData[],
  setTournaments: React.Dispatch<React.SetStateAction<TournamentData[]>>,
  tournamentUsers: TournamentUsersData[],
  setTournamentUsers: React.Dispatch<React.SetStateAction<TournamentUsersData[]>>,
  users: UserData[],
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>,
  toggleRegisterTournament: boolean,
  setToggleRegisterTournament: React.Dispatch<React.SetStateAction<boolean>>,
  toggleAddTournament: boolean,
  setToggleAddTournament: React.Dispatch<React.SetStateAction<boolean>>,
  toggleTournamentDetail: boolean,
  setToggleTournamentDetail: React.Dispatch<React.SetStateAction<boolean>>,
  toggleEditTournament: boolean,
  setToggleEditTournament: React.Dispatch<React.SetStateAction<boolean>>,
  toggleDeleteTournament: boolean,
  setToggleDeleteTournament: React.Dispatch<React.SetStateAction<boolean>>,
  toggleUserDetail: boolean,
  setToggleUserDetail: React.Dispatch<React.SetStateAction<boolean>>,
  toggleEditUser: boolean,
  setToggleEditUser: React.Dispatch<React.SetStateAction<boolean>>,
  toggleEditUserAvatar: boolean,
  setToggleEditUserAvatar: React.Dispatch<React.SetStateAction<boolean>>,
  toggleDeleteUser: boolean,
  setToggleDeleteUser: React.Dispatch<React.SetStateAction<boolean>>,
};

const MyContext = createContext<ContextType | undefined>(undefined);

export interface ContextProps {
	children: React.ReactNode,
};

export function MainContext({ children }: ContextProps) {
  const [tournaments, setTournaments] = useState<TournamentData[]>([]);
  const [tournamentUsers, setTournamentUsers] = useState<TournamentUsersData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  
  const [toggleRegisterTournament, setToggleRegisterTournament] = useState<boolean>(false);
  const [toggleAddTournament, setToggleAddTournament] = useState<boolean>(false);
  const [toggleTournamentDetail, setToggleTournamentDetail] = useState<boolean>(false);
  const [toggleEditTournament, setToggleEditTournament] = useState<boolean>(false);
  const [toggleDeleteTournament, setToggleDeleteTournament] = useState<boolean>(false);
  
  const [toggleUserDetail, setToggleUserDetail] = useState<boolean>(false);
  const [toggleEditUser, setToggleEditUser] = useState<boolean>(false);
  const [toggleEditUserAvatar, setToggleEditUserAvatar] = useState<boolean>(false);
  const [toggleDeleteUser, setToggleDeleteUser] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{
      tournaments,
      setTournaments,
      tournamentUsers,
      setTournamentUsers,
      users,
      setUsers,
      toggleRegisterTournament,
      setToggleRegisterTournament,
      toggleAddTournament,
      setToggleAddTournament,
      toggleTournamentDetail,
      setToggleTournamentDetail,
      toggleEditTournament,
      setToggleEditTournament,
      toggleDeleteTournament,
      setToggleDeleteTournament,
      toggleUserDetail,
      setToggleUserDetail,
      toggleEditUser,
      setToggleEditUser,
      toggleEditUserAvatar,
      setToggleEditUserAvatar,
      toggleDeleteUser,
      setToggleDeleteUser,
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useYourContext debe usarse dentro de un YourContextProvider');
  }

  return context;
};
