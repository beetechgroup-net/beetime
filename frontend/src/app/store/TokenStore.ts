import { create } from "zustand"

type Store = {
  token: string
  setToken: (title: string) => void
}

export const useTokenStore = create<Store>((set) => ({
  token: "",
  setToken: (token) => set(() => ({ token: token })),
}))
