import { AuthStore, User } from "@/types/Data/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      access_Token: undefined,

      user: undefined,
      setAccess_Token: (accessToken: string | undefined) =>{
        set(() =>({access_Token: accessToken}))
      },
      setUser: (userr: User | undefined) => set(() => ({ user: userr })),
    }),
    {
      name: "auth-storage",
    }
  )
);
