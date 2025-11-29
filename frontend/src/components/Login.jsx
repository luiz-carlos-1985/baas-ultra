import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Lock, Mail } from 'lucide-react'
import { api } from '../services/api'
import { useStore } from '../store/useStore'

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api.login(email, password)
      if (data.token) {
        setToken(data.token)
        setUser(data.user)
      }
    } catch (error) {
      alert('Erro ao fazer login')
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="glass rounded-3xl p-8 glow">
        <div className="flex items-center justify-center mb-8">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">Bem-vindo de volta</h1>
        <p className="text-gray-400 text-center mb-8">Banking reimagined</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-light border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-light border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-indigo-600 rounded-xl py-3 font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Não tem conta?{' '}
          <button onClick={onSwitch} className="text-primary hover:underline">
            Criar conta
          </button>
        </p>
      </div>
    </motion.div>
  )
}
