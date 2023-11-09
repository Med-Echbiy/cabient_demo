import { create } from "zustand";

interface Store {
  users: { fullName: string }[];
  addUser: (user: { fullName: string }) => void;
  initialUsers: (users: { fullName: string }[]) => void;
}

const useUserStore = create<Store>((set) => ({
  users: [],
  addUser: (user: { fullName: string }) =>
    set((state) => ({ users: [...state.users, user] })),
  initialUsers: (users) => set((state) => ({ ...state, users: users })),
}));

export default useUserStore;
