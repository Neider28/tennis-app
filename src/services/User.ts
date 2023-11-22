import { UpdateUser } from "@/interfaces/user";

export const GetUsers = async (token: String | undefined) => {
  try {
    const response = await fetch(`${process.env.API}/user`, {
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

export const EditAdminUser = async (token: String | undefined, id: number, body: UpdateUser) => {
  try {
    const response = await fetch(`${process.env.API}/user/super/${id}`, {
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

export const RegisterUserTournament = async (token: String | undefined, userId: number, tournamentId: number) => {
  try {
    const response = await fetch(`${process.env.API}/user/${userId}/register/${tournamentId}`, {
      method: 'POST',
      headers: {
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


export const RemoveUser = async (token: String | undefined, id: number) => {
  try {
    const response = await fetch(`${process.env.API}/user/${id}`, {
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
