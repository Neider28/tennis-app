import { UserData } from "./user"

export interface CreateTournament {
  name: string,
  description: string,
  location: string,
  startDate: Date,
  finishDate: Date
};

export interface UpdateTournament {
  name?: string,
  description?: string,
  location?: string,
  state?: string,
  startDate?: Date,
  finishDate?: Date
}

export interface TournamentData {
  id: number,
  image: string,
  name: string,
  description: string,
  location: string,
  startDate: string,
  finishDate: string
  state: string,
  created_at: string,
  updated_at: string,
}

export interface TournamentUsersData {
  id: number,
  image: string,
  name: string,
  description: string,
  location: string,
  startDate: string,
  finishDate: string
  state: string,
  users: UserData[],
  created_at: string,
  updated_at: string,
}
