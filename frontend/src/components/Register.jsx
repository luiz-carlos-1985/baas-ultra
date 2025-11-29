import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, User, Mail, Lock, Phone, FileText } from 'lucide-react'
import { api } from '../services/api'
import { useStore } from '../store/useStore'

export default function Register({ onSwitch }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    document_number: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await api.register(formData)
      if (data.token) {
        setToken(data.token)
        setUser(data.user)
      }
    } catch (error) {
      alert('Erro ao criar conta')
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
        
        <h1 className="text-3xl font-bold text-center mb-2">Criar Conta</h1>
        <p className="text-gray-400 text-center mb-8">Junte-se ao futuro do banking</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="w-full bg-dark-light border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-dark-light border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">CPF</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.document_number}
                onChange={(e) => setFormData({...formData, document_number: e.target.value})}
                className="w-full bg-dark-light border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            {loading ? 'Criando...' : 'Criar Conta'}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Já tem conta?{' '}
          <button onClick={onSwitch} className="text-primary hover:underline">
            Fazer login
          </button>
        </p>
      </div>
    </motion.div>
  )
}
