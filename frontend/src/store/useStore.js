import { create } from 'zustand'

export const useStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  accounts: [],
  cards: [],
  transactions: [],
  
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },
  setAccounts: (accounts) => set({ accounts }),
  setCards: (cards) => set({ cards }),
  setTransactions: (transactions) => set({ transactions }),
  
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, accounts: [], cards: [], transactions: [] })
  }
}))
