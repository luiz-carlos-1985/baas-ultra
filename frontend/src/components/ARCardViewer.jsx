import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, RotateCcw, Zap, Eye, X, Smartphone } from 'lucide-react'

export default function ARCardViewer({ isOpen, onClose, card }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [arMode, setArMode] = useState(false)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* AR Mode Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Visualização 3D</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setArMode(!arMode)}
                className={`p-2 rounded-xl ${arMode ? 'bg-green-500' : 'bg-gray-700'}`}
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-gray-700 rounded-xl"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* 3D Card */}
          <div className="perspective-1000 mb-6">
            <motion.div
              className="relative w-full h-56 preserve-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden">
                <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-sm opacity-80">BaaS Ultra</p>
                        <p className="text-xs opacity-60">Premium Card</p>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-8 bg-white/20 rounded-full" />
                        <div className="w-8 h-8 bg-white/30 rounded-full -ml-4" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-2xl font-mono tracking-wider">
                        **** **** **** {card?.number?.slice(-4) || '1234'}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-60">TITULAR</p>
                        <p className="font-semibold">{card?.holder || 'USUARIO TESTE'}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60">VÁLIDO ATÉ</p>
                        <p className="font-semibold">{card?.expiry || '12/28'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Holographic effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className="w-full h-full bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="h-12 bg-black rounded mb-6 mt-4" />
                  <div className="flex justify-between items-center mb-8">
                    <div className="bg-white/20 rounded px-3 py-1">
                      <p className="text-sm font-mono">{card?.cvv || '123'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-60">LIMITE</p>
                      <p className="font-bold">${(card?.limit || 5000).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-xs opacity-60 space-y-1">
                    <p>Este cartão é propriedade do BaaS Ultra</p>
                    <p>Em caso de perda, ligue: 0800-123-4567</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-white"
            >
              <RotateCcw className="w-4 h-4" />
              Virar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 bg-purple-600 rounded-xl px-4 py-2 text-white"
            >
              <Zap className="w-4 h-4" />
              Ativar
            </motion.button>
          </div>

          {/* AR Preview */}
          {arMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur rounded-2xl p-4 text-center"
            >
              <Smartphone className="w-12 h-12 text-white mx-auto mb-3" />
              <p className="text-white text-sm mb-2">Modo AR Ativado</p>
              <p className="text-gray-300 text-xs">
                Aponte a câmera para uma superfície plana para visualizar seu cartão em realidade aumentada
              </p>
            </motion.div>
          )}

          {/* Card Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-400">95%</p>
              <p className="text-xs text-gray-300">Limite Usado</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">12</p>
              <p className="text-xs text-gray-300">Transações</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-yellow-400">$250</p>
              <p className="text-xs text-gray-300">Cashback</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}