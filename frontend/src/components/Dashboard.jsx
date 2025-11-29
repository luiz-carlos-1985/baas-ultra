import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Send, TrendingUp, Wallet, LogOut, Plus, Eye, EyeOff, Zap, Shield, Brain } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../store/useStore'
import { api } from '../services/api'

export default function Dashboard() {
  const { user, token, accounts, cards, setAccounts, setCards, logout } = useStore()
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const accountsData = await api.getAccounts(token)
      if (accountsData.accounts) setAccounts(accountsData.accounts)
    } catch (error) {
      console.error('Erro ao carregar dados')
    }
  }

  const handleCreateAccount = async () => {
    setLoading(true)
    try {
      const data = await api.createAccount(token, {
        user_id: user.id,
        currency: 'USD',
        type: 'checking'
      })
      if (data.account) {
        setAccounts([...accounts, data.account])
        alert('Conta criada com sucesso!')
      }
    } catch (error) {
      alert('Erro ao criar conta')
    }
    setLoading(false)
  }

  const handleCreateCard = async () => {
    if (accounts.length === 0) {
      alert('Crie uma conta primeiro')
      return
    }
    setLoading(true)
    try {
      const data = await api.createCard(token, {
        account_id: accounts[0].id,
        type: 'virtual',
        limit: 500000
      })
      if (data.card) {
        setCards([...cards, data.card])
        alert('Cartão criado com sucesso!')
      }
    } catch (error) {
      alert('Erro ao criar cartão')
    }
    setLoading(false)
  }

  const mockChartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Abr', value: 4500 },
    { name: 'Mai', value: 6000 },
    { name: 'Jun', value: 5500 }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Olá, {user?.full_name?.split(' ')[0]} 👋</h1>
            <p className="text-gray-400">Bem-vindo ao futuro do banking</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="glass rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-red-500/20 transition"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 glow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Saldo Total</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">
                    {showBalance ? `$${accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0).toLocaleString()}` : '••••••'}
                  </h2>
                  <button onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              <Wallet className="w-10 h-10 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% este mês</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Contas Ativas</p>
                <h2 className="text-3xl font-bold">{accounts.length}</h2>
              </div>
              <Shield className="w-10 h-10 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">Protegidas com IA</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Cartões</p>
                <h2 className="text-3xl font-bold">{cards.length}</h2>
              </div>
              <CreditCard className="w-10 h-10 text-purple-400" />
            </div>
            <p className="text-sm text-gray-400">Virtuais e físicos</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateAccount}
              disabled={loading}
              className="bg-primary hover:bg-indigo-600 rounded-xl p-4 flex flex-col items-center gap-2 transition disabled:opacity-50"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm font-semibold">Nova Conta</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateCard}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 rounded-xl p-4 flex flex-col items-center gap-2 transition disabled:opacity-50"
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-sm font-semibold">Novo Cartão</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 rounded-xl p-4 flex flex-col items-center gap-2 transition"
            >
              <Send className="w-6 h-6" />
              <span className="text-sm font-semibold">Transferir</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 hover:bg-orange-700 rounded-xl p-4 flex flex-col items-center gap-2 transition"
            >
              <Brain className="w-6 h-6" />
              <span className="text-sm font-semibold">IA Insights</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-6">Fluxo de Caixa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Accounts List */}
        {accounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4">Minhas Contas</h3>
            <div className="space-y-4">
              {accounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-dark-light rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{account.type === 'checking' ? 'Conta Corrente' : 'Poupança'}</p>
                    <p className="text-sm text-gray-400">{account.account_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${account.balance?.toLocaleString() || '0'}</p>
                    <p className="text-sm text-gray-400">{account.currency}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
