Quick Start Guide - BaaS Ultra

Get Started in 5 Minutes

BaaS Ultra is a complete Banking as a Service platform with:

1. **Ultra Professional Frontend** - Modern React UI with glassmorphism and AI
2. **RESTful APIs** - Complete backend services
3. **Interactive API Docs** - http://localhost:8080/api/v1/docs

You can use BaaS Ultra in two ways:
- **With Frontend**: Full banking experience at http://localhost:3001
- **API Only**: Integrate with your own applications

Prerequisites

Before you begin, ensure you have the following installed:
- Docker and Docker Compose (for full stack)
- Node.js 20+ (for frontend only)
- curl or Postman (for API testing)
- Go 1.21+ (optional for local development)
- Python 3.11+ (optional for local development)

Starting All Services

Option 1: Full Stack (Backend + Frontend)

cd baas-ultra
docker-compose up -d

Wait approximately 30 seconds for all services to initialize.

Option 2: Frontend Only (Quick Start)

cd baas-ultra/frontend
start.bat  # Windows
# or
npm install && npm run dev  # Linux/Mac

Frontend will start at http://localhost:3001

Accessing the Platform

Once all services are running, you can access:

1. **Frontend UI (NEW!)**: http://localhost:3001
   - Modern React interface with glassmorphism
   - AI-powered dashboard
   - Instant account/card creation
   - Interactive charts and analytics

2. API Documentation (Interactive): http://localhost:8080/api/v1/docs
   - Explore and test all API endpoints

3. Direct API Access: http://localhost:8080/api/v1/
   - Use curl, Postman, or your application

4. Monitoring Dashboards:
   - Grafana: http://localhost:3000 (admin/admin)
   - Prometheus: http://localhost:9090
   - Neo4j Browser: http://localhost:7474 (neo4j/password)

Health Check Verification

Verify that all services are running correctly:

API Gateway:
curl http://localhost:8080/health

Auth Service:
curl http://localhost:8081/health

Account Service:
curl http://localhost:8082/health

Card Service:
curl http://localhost:8083/health

Payment Service:
curl http://localhost:8084/health

KYC Service:
curl http://localhost:8085/health

Risk Service:
curl http://localhost:8086/health

Ledger Service:
curl http://localhost:8087/health

Analytics Service:
curl http://localhost:8088/health

Notification Service:
curl http://localhost:8089/health

AI Orchestrator:
curl http://localhost:8090/health

Quantum Security:
curl http://localhost:8091/health

Frontend:
curl http://localhost:3001

Using the Frontend (Easiest Way)

1. Access http://localhost:3001
2. Click "Criar conta" (Create Account)
3. Fill in your details:
   - Full Name: John Doe
   - Email: john.doe@example.com
   - CPF: 12345678900
   - Phone: +15551234567
   - Password: SecurePassword123!
4. Click "Criar Conta"
5. You're automatically logged in!

From the dashboard you can:
- Create bank accounts with 1 click
- Issue virtual cards instantly
- View interactive charts
- Get AI-powered insights
- Transfer money with risk analysis

Using the API (Advanced)

Step 1: Register a New User

curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "full_name": "John Doe",
    "document_number": "12345678900",
    "phone": "+15551234567"
  }'

Expected Response:

{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@example.com",
    "full_name": "John Doe",
    "kyc_status": "pending",
    "risk_level": "low",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Account created successfully"
}

Save the token and user ID for subsequent requests.

Step 2: Create a Bank Account

curl -X POST http://localhost:8080/api/v1/accounts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "user_id": "YOUR_USER_ID_HERE",
    "currency": "USD",
    "type": "checking"
  }'

Expected Response:

{
  "account": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "account_number": "12345678-9",
    "currency": "USD",
    "balance": 0,
    "status": "active",
    "type": "checking",
    "created_at": "2024-01-15T10:31:00Z"
  },
  "message": "Account created in 2 seconds"
}

Step 3: Issue a Virtual Card

curl -X POST http://localhost:8080/api/v1/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "account_id": "YOUR_ACCOUNT_ID_HERE",
    "type": "virtual",
    "limit": 500000
  }'

Expected Response:

{
  "card": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "card_number": "5199 1234 5678 9012",
    "cvv": "123",
    "expiry_date": "12/29",
    "status": "active",
    "type": "virtual",
    "limit": 500000,
    "spent_amount": 0,
    "created_at": "2024-01-15T10:32:00Z"
  },
  "message": "Virtual card created instantly - ready to use"
}

Step 4: Complete KYC Verification with AI

curl -X POST http://localhost:8080/api/v1/kyc/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "user_id": "YOUR_USER_ID_HERE",
    "document_type": "passport",
    "document_number": "AB1234567",
    "face_image": "base64_encoded_face_image",
    "document_image": "base64_encoded_document_image"
  }'

Expected Response:

{
  "verification": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "status": "approved",
    "face_match": 0.95,
    "liveness_score": 0.92,
    "aml_check": true,
    "verified_at": "2024-01-15T10:33:00Z"
  },
  "message": "KYC verification completed with AI",
  "details": {
    "face_match": 0.95,
    "liveness_score": 0.92,
    "aml_check": true,
    "processing_time_ms": 150
  }
}

Step 5: Execute a Transfer with Risk Analysis

curl -X POST http://localhost:8080/api/v1/accounts/transfer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "from_account_id": "SOURCE_ACCOUNT_ID",
    "to_account_id": "DESTINATION_ACCOUNT_ID",
    "amount": 10000,
    "description": "Payment for services"
  }'

Expected Response:

{
  "transaction": {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "from_account_id": "660e8400-e29b-41d4-a716-446655440001",
    "to_account_id": "660e8400-e29b-41d4-a716-446655440005",
    "amount": 10000,
    "currency": "USD",
    "type": "transfer",
    "status": "completed",
    "created_at": "2024-01-15T10:34:00Z"
  },
  "risk_assessment": {
    "risk_score": 0.15,
    "risk_level": "low",
    "action": "approve",
    "processing_time_ms": 45
  },
  "message": "Transfer completed instantly"
}

Advanced Features

Biometric Authentication

Authenticate users using biometric data:

curl -X POST http://localhost:8080/api/v1/auth/biometric \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID",
    "biometric_data": "base64_encoded_biometric_data"
  }'

Real-Time Fraud Detection

Analyze transactions for potential fraud:

curl -X POST http://localhost:8080/api/v1/risk/fraud-detection \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "transaction": {
      "amount": 50000,
      "from_account": "account_id_1",
      "to_account": "account_id_2"
    }
  }'

ML-Powered Credit Scoring

Calculate credit scores using machine learning:

curl -X POST http://localhost:8080/api/v1/risk/credit-score \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "user_id": "YOUR_USER_ID"
  }'

Liveness Detection (Anti-Deepfake)

Verify user presence and prevent deepfake attacks:

curl -X POST http://localhost:8080/api/v1/kyc/liveness \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "video_data": "base64_encoded_video_data"
  }'

PIX Payment (Brazilian Instant Payment)

curl -X POST http://localhost:8084/payments/pix \
  -H "Content-Type: application/json" \
  -d '{
    "from_account_id": "YOUR_ACCOUNT_ID",
    "pix_key": "recipient@email.com",
    "amount": 5000,
    "description": "Payment description"
  }'

Generate PIX QR Code

curl -X POST http://localhost:8084/payments/pix/qrcode \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": "YOUR_ACCOUNT_ID",
    "amount": 5000,
    "description": "Payment description"
  }'

Blockchain Ledger Operations

Add Transaction to Blockchain

curl -X POST http://localhost:8087/ledger/transaction \
  -H "Content-Type: application/json" \
  -d '{
    "from_account": "account_1",
    "to_account": "account_2",
    "amount": 1000,
    "currency": "USD"
  }'

Mine Pending Transactions

curl -X POST http://localhost:8087/ledger/mine \
  -H "Content-Type: application/json"

Validate Blockchain Integrity

curl -X GET http://localhost:8087/ledger/validate

View Blockchain

curl -X GET http://localhost:8087/ledger/chain

Analytics and Insights

Financial Dashboard

curl -X GET "http://localhost:8088/analytics/dashboard?user_id=YOUR_USER_ID"

Cash Flow Forecast

curl -X POST http://localhost:8088/analytics/cash-flow-forecast \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID",
    "days": 30
  }'

Financial Health Score

curl -X POST http://localhost:8088/analytics/financial-health-score \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID"
  }'

Notifications

Send Email Notification

curl -X POST http://localhost:8089/notifications/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Transaction Alert",
    "body": "Your transaction was completed successfully"
  }'

Send SMS Notification

curl -X POST http://localhost:8089/notifications/sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+15551234567",
    "message": "Your verification code is 123456"
  }'

Revolutionary AI Features

Conversational Banking with GPT-4

Interact with your bank using natural language:

curl -X POST http://localhost:8090/ai/conversational-banking \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID",
    "message": "Transfer 500 dollars to John Smith",
    "context": {}
  }'

Expected Response:

{
  "conversation_id": "conv-123",
  "intent": "transfer",
  "response": "I can help you transfer money. Who would you like to send it to?",
  "suggested_actions": ["initiate_transfer", "select_recipient"],
  "confidence": 0.96,
  "model": "GPT-4-Banking-Specialized"
}

Predictive Financial Assistant

Get AI predictions about your financial future:

curl -X POST http://localhost:8090/ai/predictive-assistance \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID"
  }'

Expected Response:

{
  "predictions": {
    "next_likely_action": {
      "action": "transfer_money",
      "probability": 0.78,
      "suggested_recipient": "John Smith",
      "suggested_amount": 250.00
    },
    "upcoming_bills": [
      {"name": "Electricity", "amount": 120.50, "due_date": "2024-01-25"}
    ],
    "savings_opportunity": {
      "category": "Subscriptions",
      "potential_savings": 45.00
    }
  }
}

Autonomous Financial Advisor

Get AI-powered financial advice and portfolio optimization:

curl -X POST http://localhost:8090/ai/autonomous-financial-advisor \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID",
    "goals": ["retirement", "home_purchase"]
  }'

Expected Response:

{
  "advice": {
    "portfolio_optimization": {
      "current_allocation": {"stocks": 60, "bonds": 30, "cash": 10},
      "recommended_allocation": {"stocks": 55, "bonds": 35, "cash": 10},
      "expected_return_improvement": "2.3%"
    },
    "tax_optimization": {
      "potential_savings": 1250.00,
      "strategies": ["Harvest tax losses", "Maximize retirement contributions"]
    }
  }
}

Sentiment-Driven Market Analysis

Real-time market sentiment analysis:

curl -X POST http://localhost:8090/ai/sentiment-market-analysis \
  -H "Content-Type: application/json" \
  -d '{}'

Expected Response:

{
  "analysis": {
    "market_sentiment": {
      "overall": "bullish",
      "confidence": 0.72,
      "sources_analyzed": 15000
    },
    "sector_insights": [
      {"sector": "Technology", "sentiment": "very_bullish", "score": 0.82}
    ],
    "recommendations": ["Consider increasing tech sector exposure"]
  }
}

Voice Banking with Biometric Authentication

Execute banking operations through voice:

curl -X POST http://localhost:8090/ai/voice-banking \
  -H "Content-Type: application/json" \
  -d '{
    "audio_data": "base64_encoded_audio",
    "user_id": "YOUR_USER_ID"
  }'

Expected Response:

{
  "transcription": "Transfer 500 dollars to John Smith",
  "intent": "money_transfer",
  "entities": {"amount": 500, "recipient": "John Smith"},
  "voice_authentication": {
    "verified": true,
    "confidence": 0.98
  },
  "action_executed": true
}

Document Intelligence

AI-powered document analysis and data extraction:

curl -X POST http://localhost:8090/ai/document-intelligence \
  -H "Content-Type: application/json" \
  -d '{
    "document": "base64_encoded_document"
  }'

Expected Response:

{
  "analysis": {
    "document_type": "invoice",
    "extracted_data": {
      "invoice_number": "INV-2024-001",
      "amount": 1250.00,
      "vendor": "Acme Corp"
    },
    "validation": {"authentic": true, "confidence": 0.97},
    "suggested_actions": [{"action": "schedule_payment"}]
  }
}

Behavioral Insights

Deep psychological analysis of financial behavior:

curl -X POST http://localhost:8090/ai/behavioral-insights \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID"
  }'

Expected Response:

{
  "insights": {
    "spending_personality": {
      "type": "Balanced Spender",
      "traits": ["Planned purchases", "Budget conscious"]
    },
    "financial_stress_level": {"level": "moderate", "score": 5.2},
    "personalization_suggestions": ["Offer budgeting tools"]
  }
}

Quantum Security Features

Generate Quantum-Resistant Keypair

Create cryptographic keys resistant to quantum attacks:

curl -X POST http://localhost:8091/quantum/generate-keypair \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "Kyber-1024",
    "key_size": 1024
  }'

Expected Response:

{
  "keypair": {
    "public_key": "base64_encoded_public_key",
    "private_key": "base64_encoded_private_key",
    "algorithm": "Kyber-1024"
  },
  "security_level": "Post-Quantum",
  "algorithm_family": "Lattice-based cryptography"
}

Quantum Encryption

Encrypt data with post-quantum cryptography:

curl -X POST http://localhost:8091/quantum/encrypt \
  -H "Content-Type: application/json" \
  -d '{
    "data": "sensitive_data",
    "public_key": "your_public_key"
  }'

Expected Response:

{
  "encrypted_data": "base64_encrypted_data",
  "nonce": "random_nonce",
  "algorithm": "Kyber-1024",
  "quantum_resistant": true,
  "encryption_time_ms": 12
}

Quantum Digital Signature

Sign data with quantum-resistant signatures:

curl -X POST http://localhost:8091/quantum/sign \
  -H "Content-Type: application/json" \
  -d '{
    "data": "data_to_sign",
    "private_key": "your_private_key"
  }'

Expected Response:

{
  "signature": "quantum_resistant_signature",
  "algorithm": "Dilithium-5",
  "quantum_resistant": true,
  "signature_size_bytes": 4595
}

Zero-Knowledge Proof

Prove statements without revealing data:

curl -X POST http://localhost:8091/quantum/zero-knowledge-proof \
  -H "Content-Type: application/json" \
  -d '{
    "statement": "I am over 18",
    "witness": "birthdate_proof"
  }'

Expected Response:

{
  "proof": "zk_proof_data",
  "verified": true,
  "zero_knowledge": true,
  "privacy_preserved": true,
  "protocol": "zk-SNARK"
}

Quantum Random Number Generation

Generate true random numbers from quantum sources:

curl -X GET http://localhost:8091/quantum/entropy

Expected Response:

{
  "entropy": "base64_random_data",
  "entropy_bits": 256,
  "source": "Hardware Random Number Generator",
  "quality": "True Random",
  "quantum_source": true
}

Establish Secure Quantum Channel

Create quantum-resistant secure communication:

curl -X POST http://localhost:8091/quantum/secure-channel \
  -H "Content-Type: application/json" \
  -d '{
    "client_public_key": "your_public_key"
  }'

Expected Response:

{
  "session_id": "secure_session_id",
  "server_public_key": "server_public_key",
  "shared_secret": "quantum_safe_secret",
  "algorithm": "Kyber-1024 Key Exchange",
  "perfect_forward_secrecy": true,
  "quantum_resistant": true
}

Monitoring and Observability Notification

curl -X POST http://localhost:8089/notifications/sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+15551234567",
    "message": "Your verification code is 123456"
  }'

Send Push Notification

curl -X POST http://localhost:8089/notifications/push \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "YOUR_USER_ID",
    "title": "Payment Received",
    "body": "You received $100.00"
  }'

Monitoring and Observability

Prometheus Metrics

Access Prometheus metrics at:
http://localhost:9090

Key metrics to monitor:
- Request rate and latency
- Error rates by service
- Model prediction latency
- Database connection pool usage
- Cache hit rates

Grafana Dashboards

Access Grafana dashboards at:
http://localhost:3000

Default credentials:
Username: admin
Password: admin

Pre-configured dashboards include:
- Service health overview
- API Gateway performance
- ML model performance
- Blockchain metrics
- Database performance

Neo4j Graph Database

Access Neo4j browser at:
http://localhost:7474

Credentials:
Username: neo4j
Password: password

Use for:
- Fraud network analysis
- Transaction pattern visualization
- Risk relationship mapping

Local Development

Running Individual Services

Auth Service (Go)

cd services/auth-service
go mod download
go run main.go

The service will start on port 8081.

Account Service (Go)

cd services/account-service
go mod download
go run main.go

The service will start on port 8082.

KYC Service (Python)

cd services/kyc-service
pip install -r requirements.txt
python main.py

The service will start on port 8085.

Risk Service (Python)

cd services/risk-service
pip install -r requirements.txt
python main.py

The service will start on port 8086.

Ledger Service (Rust)

cd services/ledger-service
cargo build
cargo run

The service will start on port 8087.

API Gateway (Node.js)

cd api-gateway
npm install
npm start

The gateway will start on port 8080.

Environment Configuration

Create a .env file in the project root:

DATABASE_URL=postgres://postgres:postgres@localhost:5432/baas?sslmode=disable
REDIS_URL=redis://localhost:6379
MONGODB_URL=mongodb://admin:admin@localhost:27017
NEO4J_URL=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
NATS_URL=nats://localhost:4222
JWT_SECRET=ultra-secret-key-change-in-production
AUTH_SERVICE_URL=http://localhost:8081
ACCOUNT_SERVICE_URL=http://localhost:8082
CARD_SERVICE_URL=http://localhost:8083
PAYMENT_SERVICE_URL=http://localhost:8084
KYC_SERVICE_URL=http://localhost:8085
RISK_SERVICE_URL=http://localhost:8086
LEDGER_SERVICE_URL=http://localhost:8087
ANALYTICS_SERVICE_URL=http://localhost:8088
NOTIFICATION_SERVICE_URL=http://localhost:8089
ENVIRONMENT=development
NODE_ENV=development

Testing the Platform

Run the complete test suite:

docker-compose -f docker-compose.test.yml up

Run individual service tests:

Go services:
cd services/auth-service && go test ./...

Python services:
cd services/kyc-service && pytest

Node.js services:
cd api-gateway && npm test

Troubleshooting

Common Issues and Solutions

Services not starting:
- Ensure Docker is running
- Check port availability (8080-8089)
- Verify Docker Compose version (3.8+)

Database connection errors:
- Wait for database initialization (30 seconds)
- Check DATABASE_URL configuration
- Verify PostgreSQL container is running

Authentication failures:
- Verify JWT_SECRET is set
- Check token expiration
- Ensure Authorization header format: "Bearer TOKEN"

Model prediction errors:
- Verify Python dependencies are installed
- Check ML model files are present
- Review service logs for detailed errors

Next Steps

Explore the complete documentation:
1. API Reference - Detailed endpoint documentation
2. Integration Guide - Step-by-step integration examples
3. Security Best Practices - Security implementation guide
4. Architecture Overview - System design and patterns
5. ML Models Documentation - Model details and performance

Additional Resources

API Documentation:
http://localhost:8080/api/v1/docs

GitHub Repository:
https://github.com/your-org/baas-ultra

Support Channels:
- GitHub Issues for bug reports
- Documentation at /docs
- Community forum for discussions

Performance Benchmarks

Expected performance metrics:
- P50 Latency: <20ms
- P95 Latency: <40ms
- P99 Latency: <50ms
- Throughput: 100,000+ TPS
- Availability: 99.99%

Security Considerations

Always follow these security practices:
- Change default passwords immediately
- Use strong JWT secrets in production
- Enable TLS/SSL for all communications
- Implement rate limiting
- Regular security audits
- Keep dependencies updated
- Monitor for suspicious activities
- Implement proper access controls

Scaling Guidelines

For production deployments:
- Use Kubernetes for orchestration
- Implement horizontal pod autoscaling
- Configure database replication
- Set up multi-region deployment
- Implement CDN for static assets
- Use managed services for databases
- Configure proper backup strategies
- Implement disaster recovery plans

Building a Frontend Application

To create a user interface for BaaS Ultra, you need to build a frontend application that consumes the APIs. Here are recommended approaches:

Option 1: React/Next.js Frontend

Create a new React application:
npx create-react-app baas-frontend
cd baas-frontend
npm install axios

Example API integration:

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

const getAccounts = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/accounts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

Option 2: Vue.js Frontend

Create a Vue application:
npm create vue@latest baas-frontend
cd baas-frontend
npm install axios

Option 3: Mobile App (React Native)

Create a mobile app:
npx react-native init BaaSMobile
cd BaaSMobile
npm install axios

Option 4: Use API Documentation Interface

For quick testing without building a frontend:

1. Open http://localhost:8080/api/v1/docs in your browser
2. Use the interactive interface to test endpoints
3. View request/response examples
4. Generate code snippets for your language

Example Frontend Features to Build

Your frontend should include:

1. Authentication Pages:
   - Login form
   - Registration form
   - Password reset
   - Biometric authentication

2. Dashboard:
   - Account balance display
   - Recent transactions
   - Quick actions (transfer, pay)
   - Financial health score

3. Account Management:
   - View accounts
   - Create new accounts
   - Account details
   - Transaction history

4. Card Management:
   - View cards
   - Create virtual cards
   - Block/unblock cards
   - Set limits

5. Payments:
   - Transfer money
   - PIX payments
   - International transfers
   - Payment history

6. Analytics:
   - Spending charts
   - Cash flow forecast
   - Category breakdown
   - Financial insights

Sample Frontend Repository Structure

baas-frontend/
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   ├── accounts.js
│   │   ├── cards.js
│   │   └── payments.js
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── AccountList.jsx
│   │   ├── TransactionHistory.jsx
│   │   └── PaymentForm.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   └── Accounts.jsx
│   └── App.jsx
└── package.json

API Integration Best Practices

1. Store JWT tokens securely (httpOnly cookies or secure storage)
2. Implement token refresh logic
3. Handle API errors gracefully
4. Show loading states during API calls
5. Implement retry logic for failed requests
6. Use environment variables for API URLs
7. Implement request/response interceptors
8. Add request timeout handling

Testing Your Integration

Use Postman or curl to test APIs before building frontend:

1. Import the OpenAPI specification from http://localhost:8080/api/v1/docs
2. Create a Postman collection
3. Test all endpoints
4. Save example requests
5. Share with your team

Congratulations! You now understand that BaaS Ultra is a backend API platform. You can integrate it into your applications by building a custom frontend or using the interactive API documentation for testing. Explore the advanced features and integrate the platform into your applications.
