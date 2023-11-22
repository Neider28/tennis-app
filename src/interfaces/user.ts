export interface CreateUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
};

export interface LoginUser {
  email: string,
  password: string,
};

export interface UpdateUser {
  firstName: string,
  lastName: string,
  state: string,
  bio: string,
  role: string,
  email: string,
  password: string,
}

export interface UpdateProfile {
  firstName: string,
  lastName: string,
  bio: string,
  email: string,
  password: string,
}

export interface UserData {
  id: number,
  profileImage: string,
  firstName: string,
  lastName: string,
  state: string,
  bio: string,
  role: string,
  email: string,
  password: string,
  created_at: string,
  updated_at: string,
}
