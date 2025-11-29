import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, X, Copy, Check, Camera, User, CreditCard, Building, Smartphone } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function PIXModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [pixType, setPixType] = useState('')
  const [pixKey, setPixKey] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const { addTransaction, accounts, setAccounts } = useStore()

  const pixTypes = [
    { id: 'cpf', label: 'CPF', icon: User, placeholder: '000.000.000-00' },
    { id: 'email', label: 'Email', icon: User, placeholder: 'email@exemplo.com' },
    { id: 'phone', label: 'Telefone', icon: Smartphone, placeholder: '(11) 99999-9999' },
    { id: 'random', label: 'Chave Aleatória', icon: CreditCard, placeholder: 'Chave gerada automaticamente' }
  ]

  const generateQR = () => {
    if (!pixKey || !amount) return
    
    const pixData = {
      key: pixKey,
      amount: parseFloat(amount),
      description,
      timestamp: new Date().toISOString()
    }
    
    // Simular recebimento PIX
    setTimeout(() => {
      addTransaction({
        type: 'income',
        amount: parseFloat(amount),
        description: `PIX recebido - ${description || 'Sem descrição'}`,
        category: 'pix'
      })
      
      // Atualizar saldo
      const updatedAccounts = accounts.map(acc => 
        acc.type === 'checking' 
          ? { ...acc, balance: (acc.balance || 0) + parseFloat(amount) }
          : acc
      )
      setAccounts(updatedAccounts)
      
      setQrGenerated(true)
    }, 2000)
  }

  const copyPixCode = () => {
    const pixCode = `00020126580014BR.GOV.BCB.PIX0136${pixKey}520400005303986540${amount}5802BR5925${description}6009SAO PAULO62070503***6304`
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              <QrCode className="w-5 h-5 text-green-400" />
              PIX QR Code
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Tipo de Chave PIX</label>
                <div className="grid grid-cols-2 gap-2">
                  {pixTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setPixType(type.id)
                        if (type.id === 'random') {
                          setPixKey(`${Math.random().toString(36).substr(2, 9)}@random.pix`)
                        }
                      }}
                      className={`p-3 rounded-xl border transition flex flex-col items-center gap-2 ${
                        pixType === type.id 
                          ? 'border-green-400 bg-green-400/10' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <type.icon className="w-5 h-5" />
                      <span className="text-xs">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {pixType && pixType !== 'random' && (
                <div>
                  <label className="block text-sm mb-2 font-medium">Chave PIX</label>
                  <input
                    type="text"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    className="w-full bg-dark-light border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-green-400"
                    placeholder={pixTypes.find(t => t.id === pixType)?.placeholder}
                  />
                </div>
              )}

              {pixType === 'random' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                  <p className="text-sm text-green-400">Chave aleatória gerada:</p>
                  <p className="text-xs font-mono mt-1">{pixKey}</p>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!pixKey}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl py-3 font-semibold transition"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 font-medium">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-dark-light border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-green-400"
                  placeholder="0,00"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">Descrição (opcional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-dark-light border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-green-400"
                  placeholder="Ex: Venda produto"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-semibold"
                >
                  Voltar
                </button>
                <button
                  onClick={generateQR}
                  disabled={!amount}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl py-3 font-semibold"
                >
                  Gerar QR
                </button>
              </div>
            </div>
          )}

          {qrGenerated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-48 h-48 bg-white rounded-xl mx-auto flex items-center justify-center">
                <div className="text-black text-xs p-4">
                  <QrCode className="w-32 h-32 mx-auto mb-2" />
                  <p>QR Code PIX</p>
                  <p>R$ {parseFloat(amount).toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-dark-light rounded-xl p-4">
                <p className="text-sm mb-2">Código PIX:</p>
                <p className="text-xs font-mono break-all text-gray-400">
                  00020126580014BR.GOV.BCB.PIX0136{pixKey}...
                </p>
              </div>

              <button
                onClick={copyPixCode}
                className="w-full bg-green-600 hover:bg-green-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Código'}
              </button>

              <p className="text-xs text-gray-400">
                Compartilhe este QR Code para receber o pagamento
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}