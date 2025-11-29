# 🪟 Instalação no Windows - Guia Completo

## 📋 Pré-requisitos

### 1. Node.js
```bash
# Baixe e instale Node.js 20+
https://nodejs.org/

# Verifique a instalação
node --version
npm --version
```

### 2. Git (Opcional)
```bash
# Baixe e instale Git
https://git-scm.com/download/win

# Verifique
git --version
```

### 3. Docker Desktop (Opcional - para backend)
```bash
# Baixe e instale Docker Desktop
https://www.docker.com/products/docker-desktop/

# Verifique
docker --version
docker-compose --version
```

---

## 🚀 Instalação Rápida

### Opção 1: Apenas Frontend (Recomendado para testar)

#### Passo 1: Navegue até a pasta
```cmd
cd c:\PROJETOS\Nova pasta\baas-ultra\frontend
```

#### Passo 2: Execute o script automático
```cmd
start.bat
```

Pronto! O frontend vai:
1. Instalar dependências automaticamente
2. Iniciar o servidor
3. Abrir no navegador

**Acesse**: http://localhost:3001

---

### Opção 2: Frontend + Backend Completo

#### Passo 1: Inicie o backend com Docker
```cmd
cd c:\PROJETOS\Nova pasta\baas-ultra
docker-compose up -d
```

#### Passo 2: Aguarde os serviços iniciarem (~30s)
```cmd
# Verifique se está tudo rodando
docker-compose ps
```

#### Passo 3: Inicie o frontend
```cmd
cd frontend
start.bat
```

**Acesse**:
- Frontend: http://localhost:3001
- API Gateway: http://localhost:8080
- API Docs: http://localhost:8080/api/v1/docs

---

### Opção 3: Manual (Controle Total)

#### Passo 1: Instale as dependências
```cmd
cd c:\PROJETOS\Nova pasta\baas-ultra\frontend
npm install
```

#### Passo 2: Inicie o servidor de desenvolvimento
```cmd
npm run dev
```

#### Passo 3: Acesse
```
http://localhost:3001
```

---

## 🔧 Configuração Avançada

### Mudar a Porta

Edite `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: { 
    port: 3002  // Sua porta aqui
  }
})
```

### Configurar API URL

Crie `.env` na pasta frontend:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 🐛 Solução de Problemas

### Erro: "npm não é reconhecido"

**Solução**: Node.js não está instalado ou não está no PATH

```cmd
# Reinstale Node.js
# Marque a opção "Add to PATH" durante instalação
```

### Erro: "Porta 3001 já está em uso"

**Solução 1**: Feche o processo que está usando a porta
```cmd
# Encontre o processo
netstat -ano | findstr :3001

# Mate o processo (substitua PID)
taskkill /PID <PID> /F
```

**Solução 2**: Mude a porta (veja Configuração Avançada)

### Erro: "Cannot find module"

**Solução**: Reinstale as dependências
```cmd
# Delete node_modules e package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstale
npm install
```

### Erro: "EACCES: permission denied"

**Solução**: Execute como Administrador
```cmd
# Clique com botão direito no CMD
# Selecione "Executar como administrador"
```

### Erro ao conectar com API

**Solução**: Verifique se o backend está rodando
```cmd
# Teste a API
curl http://localhost:8080/health

# Se não funcionar, inicie o backend
cd ..
docker-compose up -d
```

### Página em branco

**Solução 1**: Limpe o cache do navegador
```
Ctrl + Shift + Delete
```

**Solução 2**: Limpe o localStorage
```javascript
// No console do navegador (F12)
localStorage.clear()
location.reload()
```

**Solução 3**: Verifique o console
```
F12 > Console
# Veja se há erros
```

---

## 📦 Estrutura de Pastas

```
c:\PROJETOS\Nova pasta\baas-ultra\
├── frontend\
│   ├── src\
│   │   ├── components\
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services\
│   │   │   └── api.js
│   │   ├── store\
│   │   │   └── useStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public\
│   ├── node_modules\
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── start.bat
│   └── README.md
├── services\
├── api-gateway\
├── docker-compose.yml
└── README.md
```

---

## 🎯 Comandos Úteis

### Desenvolvimento
```cmd
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Limpar cache
npm cache clean --force
```

### Docker (Backend)
```cmd
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Reiniciar um serviço
docker-compose restart frontend

# Ver status
docker-compose ps
```

### Git
```cmd
# Clonar repositório
git clone <url>

# Ver status
git status

# Commit
git add .
git commit -m "mensagem"

# Push
git push
```

---

## 🔥 Dicas de Performance

### 1. Use SSD
- Instale o projeto em um SSD
- Muito mais rápido que HDD

### 2. Desabilite Antivírus Temporariamente
- Antivírus pode deixar npm install lento
- Adicione exceção para pasta node_modules

### 3. Use Terminal Moderno
- Windows Terminal é mais rápido
- PowerShell 7+ também

### 4. Feche Programas Pesados
- Chrome com muitas abas
- IDEs pesadas
- Jogos

### 5. Aumente RAM Virtual
```
Painel de Controle > Sistema > Configurações Avançadas
> Desempenho > Configurações > Avançado > Memória Virtual
```

---

## 🎨 Editores Recomendados

### VS Code (Recomendado)
```
https://code.visualstudio.com/

Extensões úteis:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- Auto Rename Tag
- Path Intellisense
```

### WebStorm
```
https://www.jetbrains.com/webstorm/

Já vem com tudo integrado
```

### Sublime Text
```
https://www.sublimetext.com/

Leve e rápido
```

---

## 🌐 Navegadores Recomendados

### Chrome (Melhor para desenvolvimento)
- DevTools poderoso
- React DevTools
- Performance profiling

### Edge (Baseado em Chromium)
- Mesmas ferramentas do Chrome
- Integrado com Windows

### Firefox Developer Edition
- Ótimas ferramentas de CSS
- Bom para testar compatibilidade

---

## 📱 Testar em Mobile

### Opção 1: DevTools
```
F12 > Toggle Device Toolbar (Ctrl + Shift + M)
Selecione um dispositivo
```

### Opção 2: Ngrok (Acesso externo)
```cmd
# Instale ngrok
https://ngrok.com/download

# Execute
ngrok http 3001

# Use a URL fornecida no seu celular
```

### Opção 3: Mesmo WiFi
```cmd
# Descubra seu IP local
ipconfig

# Acesse do celular
http://<SEU_IP>:3001
```

---

## 🚀 Deploy

### Vercel (Recomendado)
```cmd
# Instale Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Production
vercel --prod
```

### Netlify
```cmd
# Instale Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
netlify deploy

# Production
netlify deploy --prod
```

### GitHub Pages
```cmd
# Build
npm run build

# Deploy (manual)
# Copie pasta dist/ para gh-pages branch
```

---

## 📊 Monitoramento

### Ver uso de recursos
```cmd
# Task Manager
Ctrl + Shift + Esc

# Veja uso de CPU/RAM do Node.js
```

### Ver logs do frontend
```
F12 > Console
```

### Ver logs do backend
```cmd
docker-compose logs -f
```

---

## 🎓 Próximos Passos

1. ✅ Instale o frontend
2. ✅ Explore a interface
3. ✅ Crie uma conta
4. ✅ Teste as features
5. ✅ Veja o código
6. ✅ Customize as cores
7. ✅ Adicione features
8. ✅ Deploy em produção

---

## 💬 Suporte

### Problemas?
1. Veja a seção "Solução de Problemas"
2. Verifique os logs
3. Pesquise no Google
4. Abra uma issue no GitHub

### Dúvidas?
1. Leia a documentação
2. Veja os exemplos
3. Pergunte na comunidade

---

**Boa sorte e divirta-se! 🚀✨**
