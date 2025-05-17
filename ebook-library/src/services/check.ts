import { getRole } from "./api";

interface Role {
    name: string;
    permissions: string[];
  };

export const checkPermissions = async (permission: string): Promise<boolean> => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) throw new Error();

      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000)
      );
  
      const role: Role = await Promise.race([
        getRole(userEmail),
        timeout
      ]);
      console.log(role);
      return role.permissions.includes(permission);
    } catch (err) {
      console.error(err);
      return false;
    }
  };