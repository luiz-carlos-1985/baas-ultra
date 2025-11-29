import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, X, Plus, Calendar, DollarSign, TrendingUp, Car, Home, Plane, GraduationCap } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function GoalsModal({ isOpen, onClose }) {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Carro Novo', target: 50000, current: 12500, deadline: '2024-12-31', icon: Car, color: 'bg-blue-500' },
    { id: 2, name: 'Casa Própria', target: 200000, current: 45000, deadline: '2026-06-30', icon: Home, color: 'bg-green-500' },
    { id: 3, name: 'Viagem Europa', target: 15000, current: 8200, deadline: '2024-08-15', icon: Plane, color: 'bg-purple-500' }
  ])
  
  const [showNewGoal, setShowNewGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
    icon: Target,
    color: 'bg-primary'
  })

  const goalIcons = [
    { icon: Car, label: 'Carro', color: 'bg-blue-500' },
    { icon: Home, label: 'Casa', color: 'bg-green-500' },
    { icon: Plane, label: 'Viagem', color: 'bg-purple-500' },
    { icon: GraduationCap, label: 'Educação', color: 'bg-yellow-500' },
    { icon: Target, label: 'Outro', color: 'bg-primary' }
  ]

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) return
    
    const goal = {
      id: Date.now(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline,
      icon: newGoal.icon,
      color: newGoal.color
    }
    
    setGoals([...goals, goal])
    setNewGoal({ name: '', target: '', deadline: '', icon: Target, color: 'bg-primary' })
    setShowNewGoal(false)
  }

  const addToGoal = (goalId, amount) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
        : goal
    ))
  }

  const getProgress = (current, target) => (current / target) * 100
  
  const getDaysLeft = (deadline) => {
    const today = new Date()
    const end = new Date(deadline)
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-400" />
              Metas Financeiras
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewGoal(true)}
                className="p-2 bg-primary rounded-lg hover:bg-indigo-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Goals List */}
          <div className="space-y-4 mb-6">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-light rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 ${goal.color} rounded-lg`}>
                    <goal.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{goal.name}</h4>
                    <p className="text-sm text-gray-400">
                      {getDaysLeft(goal.deadline)} dias restantes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {goal.current.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">de R$ {goal.target.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{getProgress(goal.current, goal.target).toFixed(1)}%</span>
                    <span>Meta: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgress(goal.current, goal.target)}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 rounded-full ${goal.color.replace('bg-', 'bg-gradient-to-r from-').replace('-500', '-400 to-' + goal.color.split('-')[1] + '-600')}`}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToGoal(goal.id, 100)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-lg py-2 text-sm font-semibold transition"
                  >
                    +R$ 100
                  </button>
                  <button
                    onClick={() => addToGoal(goal.id, 500)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-lg py-2 text-sm font-semibold transition"
                  >
                    +R$ 500
                  </button>
                  <button
                    onClick={() => {
                      const amount = prompt('Quanto deseja adicionar?')
                      if (amount && !isNaN(amount)) {
                        addToGoal(goal.id, parseFloat(amount))
                      }
                    }}
                    className={`flex-1 ${goal.color} hover:opacity-80 rounded-lg py-2 text-sm font-semibold transition text-white`}
                  >
                    Personalizar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Goal Form */}
          {showNewGoal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-dark-light rounded-xl p-4 space-y-4"
            >
              <h4 className="font-semibold">Nova Meta</h4>
              
              <div>
                <label className="block text-sm mb-2">Nome da Meta</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-primary"
                  placeholder="Ex: Carro novo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Valor Meta (R$)</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-primary"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Data Limite</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Ícone</label>
                <div className="flex gap-2">
                  {goalIcons.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setNewGoal({...newGoal, icon: item.icon, color: item.color})}
                      className={`p-3 rounded-lg border-2 transition ${
                        newGoal.icon === item.icon 
                          ? 'border-primary bg-primary/20' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewGoal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-lg py-2 font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={addGoal}
                  className="flex-1 bg-primary hover:bg-indigo-600 rounded-lg py-2 font-semibold transition"
                >
                  Criar Meta
                </button>
              </div>
            </motion.div>
          )}

          {/* Summary */}
          <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl p-4 border border-primary/30">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Resumo das Metas
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{goals.length}</p>
                <p className="text-xs text-gray-400">Metas Ativas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">
                  R$ {goals.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">Total Poupado</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">
                  {goals.filter(goal => getProgress(goal.current, goal.target) >= 100).length}
                </p>
                <p className="text-xs text-gray-400">Concluídas</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}