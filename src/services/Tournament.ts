import { CreateTournament, UpdateTournament } from "@/interfaces/tournament";

export const AddNewTournament = async (token: String | undefined, tournament: CreateTournament) => {
  try {
    const response = await fetch(`${process.env.API}/tournament`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(tournament),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const GetTournaments = async (token: String | undefined) => {
  try {
    const response = await fetch(`${process.env.API}/tournament`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const GetTournament = async (token: String | undefined, id: number) => {
  try {
    const response = await fetch(`${process.env.API}/tournament/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const EditAdminTournament = async (token: String | undefined, id: number, body: UpdateTournament) => {
  try {
    const response = await fetch(`${process.env.API}/tournament/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const RemoveTournament = async (token: String | undefined, id: number) => {
  try {
    const response = await fetch(`${process.env.API}/tournament/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
