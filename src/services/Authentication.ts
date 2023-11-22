import { CreateUser, LoginUser, UpdateProfile } from "@/interfaces/user";

export const Register = async (user: CreateUser) => {
  try {
    const response = await fetch(`${process.env.API}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const SignIn = async (user: LoginUser) => {
  try {
    const response = await fetch(`${process.env.API}/auth/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const MyProfile = async (token: String | undefined) => {
  try {
    const response = await fetch(`${process.env.API}/auth/profile`, {
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

export const EditMyProfile = async (token: String | undefined, body: UpdateProfile) => {
  try {
    const response = await fetch(`${process.env.API}/auth/profile/edit`, {
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

export const EditProfileAvatar = async (token: String | undefined, image: File) => {
  try {
    const formImage = new FormData();

    formImage.append('profileImage', image);

    const response = await fetch(`${process.env.API}/auth/profile/edit/image`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formImage,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
