# ⚡ Quick Start - Frontend Ultra Profissional

## 🚀 Iniciar em 3 Passos

### 1️⃣ Instalar Dependências
```bash
cd frontend
npm install
```

### 2️⃣ Iniciar Servidor
```bash
npm run dev
```

### 3️⃣ Acessar
```
http://localhost:3001
```

## 🎯 Ou Use o Script Automático

### Windows
```bash
cd frontend
start.bat
```

### Linux/Mac
```bash
cd frontend
chmod +x start.sh
./start.sh
```

## 🐳 Com Docker

### Iniciar Tudo (Backend + Frontend)
```bash
docker-compose up
```

### Apenas Frontend
```bash
docker-compose up frontend
```

## 📱 Primeiro Uso

### 1. Criar Conta
1. Clique em "Criar conta"
2. Preencha os dados:
   - Nome: João Silva
   - Email: joao@example.com
   - CPF: 12345678900
   - Telefone: +5511999999999
   - Senha: Senha123!
3. Clique em "Criar Conta"
4. Você será logado automaticamente

### 2. Explorar Dashboard
- Veja seu saldo (inicialmente $0)
- Observe as animações suaves
- Explore os cards com efeito glass
- Passe o mouse nos botões

### 3. Criar Conta Bancária
1. Clique no botão "Nova Conta" (roxo)
2. Aguarde 2 segundos
3. Conta criada! Aparece na lista

### 4. Emitir Cartão Virtual
1. Clique no botão "Novo Cartão" (roxo)
2. Instantâneo!
3. Cartão pronto para usar

### 5. Ver Gráficos
- Scroll até o gráfico de fluxo de caixa
- Passe o mouse para ver detalhes
- Observe o gradiente animado

## 🎨 Recursos para Testar

### ✅ Animações
- Hover nos botões (scale 1.02)
- Tap nos botões (scale 0.98)
- Transições entre páginas
- Background animado

### ✅ Glassmorphism
- Cards com efeito vidro
- Blur de 20px
- Transparência 70%
- Bordas sutis

### ✅ Interatividade
- Ocultar/mostrar saldo
- Criar conta em 1 clique
- Emitir cartão instantâneo
- Gráficos interativos

### ✅ Responsividade
- Redimensione a janela
- Teste em mobile (F12 > Device Toolbar)
- Veja adaptação automática

## 🔥 Atalhos de Teclado

- `Tab`: Navegar entre campos
- `Enter`: Submit formulário
- `Esc`: Fechar modais
- `Ctrl + K`: Busca rápida (futuro)

## 🎯 URLs Importantes

- **Frontend**: http://localhost:3001
- **API Gateway**: http://localhost:8080
- **API Docs**: http://localhost:8080/api/v1/docs
- **Grafana**: http://localhost:3000

## 💡 Dicas

1. **Performance**: Use Chrome/Edge para melhor experiência
2. **Animações**: Ative "Reduce motion" se preferir menos animações
3. **Dark Mode**: Já vem ativado por padrão
4. **Zoom**: Funciona perfeitamente em qualquer zoom

## 🐛 Troubleshooting

### Porta 3001 em uso?
```bash
# Mude a porta no vite.config.js
server: { port: 3002 }
```

### Erro ao conectar API?
```bash
# Verifique se o backend está rodando
curl http://localhost:8080/health
```

### Dependências não instalam?
```bash
# Limpe o cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Página em branco?
```bash
# Verifique o console (F12)
# Limpe o localStorage
localStorage.clear()
```

## 📊 Estrutura de Pastas

```
frontend/
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # API calls
│   ├── store/          # Estado global
│   ├── App.jsx         # App principal
│   └── main.jsx        # Entry point
├── public/             # Assets estáticos
├── package.json        # Dependências
└── vite.config.js      # Config Vite
```

## 🎨 Customização

### Mudar Cores
Edite `tailwind.config.js`:
```js
colors: {
  primary: '#6366f1',  // Sua cor
  dark: '#0f172a',
  'dark-light': '#1e293b'
}
```

### Mudar Animações
Edite componentes:
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

### Adicionar Páginas
1. Crie componente em `src/components/`
2. Importe no `App.jsx`
3. Adicione rota (se usar router)

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy Vercel
```bash
vercel deploy
```

### Deploy Netlify
```bash
netlify deploy --prod
```

## 📈 Próximos Passos

1. ✅ Explore todas as features
2. ✅ Teste responsividade
3. ✅ Crie múltiplas contas
4. ✅ Emita vários cartões
5. ✅ Veja os gráficos
6. ✅ Teste animações
7. ✅ Customize cores
8. ✅ Adicione features

## 🎓 Aprenda Mais

- **React**: https://react.dev
- **Framer Motion**: https://www.framer.com/motion
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev
- **Zustand**: https://zustand-demo.pmnd.rs

## 💬 Suporte

Problemas? Abra uma issue no GitHub!

---

**Divirta-se explorando o futuro do banking!** 🚀✨
