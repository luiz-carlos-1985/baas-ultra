import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, X, Zap, Wifi, Smartphone, Car, CreditCard, Calendar, DollarSign } from 'lucide-react'

export default function BillPaymentModal({ isOpen, onClose, billType = 'luz' }) {
  const [step, setStep] = useState(1)
  const [billData, setBillData] = useState({
    code: '',
    amount: '',
    dueDate: '',
    description: ''
  })
  const [scanning, setScanning] = useState(false)

  const billTypes = {
    luz: { icon: Zap, label: 'Conta de Luz', color: 'bg-yellow-500', company: 'Enel' },
    agua: { icon: Home, label: 'Conta de Água', color: 'bg-blue-500', company: 'Sabesp' },
    internet: { icon: Wifi, label: 'Internet', color: 'bg-purple-500', company: 'Vivo Fibra' },
    celular: { icon: Smartphone, label: 'Celular', color: 'bg-green-500', company: 'Tim' },
    ipva: { icon: Car, label: 'IPVA', color: 'bg-red-500', company: 'Detran-SP' },
    cartao: { icon: CreditCard, label: 'Cartão', color: 'bg-indigo-500', company: 'Nubank' }
  }

  const currentBill = billTypes[billType]

  const scanBarcode = () => {
    setScanning(true)
    // Simular escaneamento
    setTimeout(() => {
      setBillData({
        code: '23793.38128 60007.772589 64000.000000 1 95630000012500',
        amount: '125.50',
        dueDate: '2024-02-15',
        description: `${currentBill.company} - ${currentBill.label}`
      })
      setScanning(false)
      setStep(2)
    }, 2000)
  }

  const payBill = () => {
    // Simular pagamento
    alert(`Conta ${currentBill.label} de R$ ${billData.amount} paga com sucesso!`)
    onClose()
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
          className="glass rounded-2xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <currentBill.icon className={`w-5 h-5 text-${currentBill.color.split('-')[1]}-400`} />
              {currentBill.label}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className={`w-20 h-20 ${currentBill.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <currentBill.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{currentBill.company}</h4>
                <p className="text-sm text-gray-400">Como deseja pagar sua conta?</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={scanBarcode}
                  disabled={scanning}
                  className="w-full bg-primary hover:bg-indigo-600 disabled:opacity-50 rounded-xl py-4 font-semibold transition flex items-center justify-center gap-2"
                >
                  {scanning ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Escaneando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h3a1 1 0 000-2H4a3 3 0 00-3 3v3a1 1 0 002 0V4zM16 3a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM3 16a1 1 0 01-1-1v-3a1 1 0 10-2 0v3a3 3 0 003 3h3a1 1 0 100-2H4a1 1 0 01-1-1zM17 14a1 1 0 011 1v1a1 1 0 01-1 1h-3a1 1 0 110-2h3v-1a1 1 0 011-1z"/>
                      </svg>
                      Escanear Código de Barras
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-gray-700 hover:bg-gray-600 rounded-xl py-4 font-semibold transition"
                >
                  Digitar Código Manualmente
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Código de Barras</label>
                <input
                  type="text"
                  value={billData.code}
                  onChange={(e) => setBillData({...billData, code: e.target.value})}
                  className="w-full bg-dark-light border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-primary font-mono text-sm"
                  placeholder="Digite ou cole o código"
                />
              </div>

              {billData.code && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-dark-light rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-400">Empresa:</span>
                    <span className="font-semibold">{billData.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor:</span>
                    <span className="font-bold text-green-400">R$ {billData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vencimento:</span>
                    <span className={`font-semibold ${
                      new Date(billData.dueDate) < new Date() ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {new Date(billData.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-semibold transition"
                >
                  Voltar
                </button>
                <button
                  onClick={payBill}
                  disabled={!billData.code}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl py-3 font-semibold transition flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Pagar
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}