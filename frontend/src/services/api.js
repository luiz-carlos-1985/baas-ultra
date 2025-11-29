const API_URL = 'http://localhost:8080/api/v1'

export const api = {
  async register(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return res.json()
  },

  async createAccount(token, data) {
    const res = await fetch(`${API_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async getAccounts(token) {
    const res = await fetch(`${API_URL}/accounts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  async createCard(token, data) {
    const res = await fetch(`${API_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async transfer(token, data) {
    const res = await fetch(`${API_URL}/accounts/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async getDashboard(token, userId) {
    const res = await fetch(`http://localhost:8088/analytics/dashboard?user_id=${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  }
}
