import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, X, DollarSign, Shield, AlertTriangle, Target, Calendar } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function InvestmentModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState('')
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [amount, setAmount] = useState('')
  const [investing, setInvesting] = useState(false)
  const { addTransaction, accounts, setAccounts } = useStore()

  const profiles = [
    { 
      id: 'conservative', 
      label: 'Conservador', 
      icon: Shield, 
      color: 'text-green-400',
      description: 'Baixo risco, retorno estável',
      risk: 'Baixo'
    },
    { 
      id: 'moderate', 
      label: 'Moderado', 
      icon: Target, 
      color: 'text-yellow-400',
      description: 'Risco médio, bom retorno',
      risk: 'Médio'
    },
    { 
      id: 'aggressive', 
      label: 'Arrojado', 
      icon: AlertTriangle, 
      color: 'text-red-400',
      description: 'Alto risco, alto retorno',
      risk: 'Alto'
    }
  ]

  const investments = {
    conservative: [
      { name: 'CDB Premium', rate: '13.2%', min: 100, term: '12 meses', risk: 'Baixo' },
      { name: 'Tesouro Selic', rate: '12.8%', min: 50, term: 'Flexível', risk: 'Baixo' },
      { name: 'LCI Banco', rate: '12.5%', min: 500, term: '18 meses', risk: 'Baixo' }
    ],
    moderate: [
      { name: 'Fundo Multimercado', rate: '15.5%', min: 200, term: '24 meses', risk: 'Médio' },
      { name: 'Debêntures', rate: '14.8%', min: 1000, term: '36 meses', risk: 'Médio' },
      { name: 'Fundo Imobiliário', rate: '16.2%', min: 300, term: 'Flexível', risk: 'Médio' }
    ],
    aggressive: [
      { name: 'Ações Growth', rate: '25.0%*', min: 500, term: 'Flexível', risk: 'Alto' },
      { name: 'Bitcoin ETF', rate: '45.0%*', min: 100, term: 'Flexível', risk: 'Alto' },
      { name: 'Startups', rate: '35.0%*', min: 2000, term: '60 meses', risk: 'Alto' }
    ]
  }

  const handleInvest = async () => {
    if (!selectedInvestment || !amount) return
    
    const investAmount = parseFloat(amount)
    const checkingAccount = accounts.find(acc => acc.type === 'checking')
    
    if (!checkingAccount || checkingAccount.balance < investAmount) {
      alert('Saldo insuficiente')
      return
    }

    setInvesting(true)

    try {
      // Simular investimento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Debitar da conta
      const updatedAccounts = accounts.map(acc => 
        acc.type === 'checking' 
          ? { ...acc, balance: acc.balance - investAmount }
          : acc
      )
      setAccounts(updatedAccounts)
      
      // Adicionar transação
      addTransaction({
        type: 'expense',
        amount: -investAmount,
        description: `Investimento em ${selectedInvestment.name}`,
        category: 'investment'
      })
      
      alert(`Investimento de R$ ${investAmount.toFixed(2)} em ${selectedInvestment.name} realizado com sucesso!`)
      onClose()
      
    } catch (error) {
      alert('Erro ao processar investimento')
    } finally {
      setInvesting(false)
    }
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
          className="glass rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Investimentos
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Qual seu perfil de investidor?</h4>
                <div className="space-y-3">
                  {profiles.map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => setProfile(prof.id)}
                      className={`w-full p-4 rounded-xl border transition text-left ${
                        profile === prof.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <prof.icon className={`w-6 h-6 ${prof.color}`} />
                        <div className="flex-1">
                          <h5 className="font-semibold">{prof.label}</h5>
                          <p className="text-sm text-gray-400">{prof.description}</p>
                          <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                            prof.risk === 'Baixo' ? 'bg-green-500/20 text-green-400' :
                            prof.risk === 'Médio' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            Risco {prof.risk}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!profile}
                className="w-full bg-primary hover:bg-indigo-600 disabled:opacity-50 rounded-xl py-3 font-semibold transition"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && profile && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Escolha seu investimento</h4>
                <div className="space-y-3">
                  {investments[profile].map((investment, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedInvestment(investment)}
                      className={`w-full p-4 rounded-xl border transition text-left ${
                        selectedInvestment?.name === investment.name 
                          ? 'border-green-400 bg-green-400/10' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold">{investment.name}</h5>
                        <span className="text-green-400 font-bold">{investment.rate}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                        <div>
                          <p>Mín: R$ {investment.min}</p>
                        </div>
                        <div>
                          <p>Prazo: {investment.term}</p>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full ${
                            investment.risk === 'Baixo' ? 'bg-green-500/20 text-green-400' :
                            investment.risk === 'Médio' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {investment.risk}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-semibold"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedInvestment}
                  className="flex-1 bg-primary hover:bg-indigo-600 disabled:opacity-50 rounded-xl py-3 font-semibold"
                >
                  Investir
                </button>
              </div>
            </div>
          )}

          {step === 3 && selectedInvestment && (
            <div className="space-y-4">
              <div className="bg-dark-light rounded-xl p-4">
                <h5 className="font-semibold mb-2">{selectedInvestment.name}</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Rentabilidade</p>
                    <p className="text-green-400 font-bold">{selectedInvestment.rate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Prazo</p>
                    <p>{selectedInvestment.term}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">Valor do Investimento (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min={selectedInvestment.min}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-dark-light border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-primary"
                  placeholder={`Mínimo: R$ ${selectedInvestment.min}`}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Saldo disponível: R$ {accounts.find(acc => acc.type === 'checking')?.balance?.toFixed(2) || '0,00'}
                </p>
              </div>

              {amount && parseFloat(amount) >= selectedInvestment.min && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h6 className="font-semibold text-green-400 mb-2">Projeção de Retorno</h6>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Em 12 meses</p>
                      <p className="font-bold">R$ {(parseFloat(amount) * 1.13).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Rendimento</p>
                      <p className="text-green-400 font-bold">+R$ {(parseFloat(amount) * 0.13).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-semibold"
                >
                  Voltar
                </button>
                <button
                  onClick={handleInvest}
                  disabled={!amount || parseFloat(amount) < selectedInvestment.min || investing}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                >
                  {investing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Investindo...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4" />
                      Confirmar
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}