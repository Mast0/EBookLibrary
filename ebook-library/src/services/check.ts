import { rejects } from "assert";
import { getRole } from "./api";
import { time } from "console";

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
    } catch {
      alert('You are not authorized!');
      return false;
    }
  };