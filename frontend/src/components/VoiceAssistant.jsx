import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Bot, User } from 'lucide-react'

export default function VoiceAssistant({ isOpen, onClose }) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [conversation, setConversation] = useState([
    { type: 'bot', message: 'Olá! Sou sua assistente de voz. Como posso ajudar?' }
  ])

  const startListening = () => {
    setIsListening(true)
    // Simular reconhecimento de voz
    setTimeout(() => {
      setTranscript('Qual é o meu saldo atual?')
      setIsListening(false)
      handleVoiceCommand('Qual é o meu saldo atual?')
    }, 2000)
  }

  const handleVoiceCommand = (command) => {
    setConversation(prev => [...prev, { type: 'user', message: command }])
    
    // Simular resposta da IA
    setTimeout(() => {
      let response = ''
      if (command.toLowerCase().includes('saldo')) {
        response = 'Seu saldo total é de $24,170.75. Você tem $15,420 na conta corrente e $8,750 na poupança.'
      } else if (command.toLowerCase().includes('gastos')) {
        response = 'Seus gastos este mês foram de $3,210. A maior categoria foi alimentação com $1,200.'
      } else {
        response = 'Desculpe, não entendi. Pode repetir?'
      }
      
      setConversation(prev => [...prev, { type: 'bot', message: response }])
      speak(response)
    }, 1000)
  }

  const speak = (text) => {
    setIsSpeaking(true)
    // Simular síntese de voz
    setTimeout(() => {
      setIsSpeaking(false)
    }, 3000)
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
          className="glass rounded-3xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ 
                scale: isListening ? [1, 1.2, 1] : isSpeaking ? [1, 1.1, 1] : 1,
                rotate: isSpeaking ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: isListening ? 1 : isSpeaking ? 0.5 : 0,
                repeat: isListening || isSpeaking ? Infinity : 0
              }}
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                isListening ? 'bg-red-500' : isSpeaking ? 'bg-blue-500' : 'bg-purple-500'
              }`}
            >
              {isListening ? (
                <Mic className="w-12 h-12 text-white" />
              ) : isSpeaking ? (
                <Volume2 className="w-12 h-12 text-white" />
              ) : (
                <Bot className="w-12 h-12 text-white" />
              )}
            </motion.div>
            
            <h3 className="text-xl font-bold mb-2">Assistente de Voz</h3>
            <p className="text-sm text-gray-400">
              {isListening ? 'Escutando...' : 
               isSpeaking ? 'Falando...' : 
               'Toque no microfone para falar'}
            </p>
          </div>

          {/* Conversation */}
          <div className="max-h-40 overflow-y-auto mb-6 space-y-3">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-2xl text-sm ${
                  msg.type === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-light text-gray-300'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="bg-dark-light rounded-xl p-3 mb-4">
              <p className="text-sm text-gray-300">{transcript}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startListening}
              disabled={isListening || isSpeaking}
              className={`p-4 rounded-full ${
                isListening ? 'bg-red-500' : 'bg-primary hover:bg-indigo-600'
              } disabled:opacity-50 transition`}
            >
              {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <VolumeX className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Quick Commands */}
          <div className="mt-6">
            <p className="text-xs text-gray-400 text-center mb-3">Comandos rápidos:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Meu saldo', 'Últimos gastos', 'Investimentos'].map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => handleVoiceCommand(cmd)}
                  className="text-xs bg-dark-light hover:bg-gray-600 px-3 py-1 rounded-full transition"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}