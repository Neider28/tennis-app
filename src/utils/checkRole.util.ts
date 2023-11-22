import { MyProfile } from "@/services/Authentication";

export const checkUserRole = async (token: string) => {
  const user = await MyProfile(token);
  const role = user.role;
  
  return role;
};
