🚀 Node.js Microservice SLO Simulator
This project simulates real-world microservices (user-service, order-service, inventory-service, api-gateway) and sends metrics, traces, and logs to Datadog to monitor and calculate SLOs (Service Level Objectives).

📦 Services Overview
Service Name	Port	Description
user-service	3001	Handles user-related actions
order-service	3002	Manages order creation and status
inventory-service	3003	Tracks inventory and stock levels
api-gateway	3000	Central entry point for APIs
simulator	—	Generates traffic across services
datadog-agent	8126	Collects metrics/APM for Datadog

⚙️ Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/slo-simulator.git
cd slo-simulator
2. Create a .env file
env
Copy
Edit
DD_API_KEY=your_datadog_api_key
Do not commit .env. It is ignored by .gitignore.

3. Build and run with Docker
bash
Copy
Edit
docker-compose up --build
All services and the simulator will start and automatically send traces/metrics to Datadog.

📈 Metrics and SLOs in Datadog
Go to your Datadog Dashboard

Navigate to APM → Services and Metrics → Explorer

Look for metrics like:

user.login.success

order.create.failed

inventory.check.success

You can create monitors and SLOs from these metrics (availability, latency, error rate, etc.).

🧪 API Testing
Test any route like:

bash
Copy
Edit
curl -X POST http://localhost:3001/user/login
curl -X POST http://localhost:3002/order/create
curl -X POST http://localhost:3003/inventory/check
The simulator automatically performs these for testing.

🛠 Local Development
Run an individual service using nodemon:

bash
Copy
Edit
cd services/user-service
npm install
npm run start:dev
📁 Project Structure
pgsql
Copy
Edit
.
├── services/
│   ├── user-service/
│   ├── order-service/
│   ├── inventory-service/
│   └── api-gateway/
├── simulator/
│   └── load-generator.js
├── lib/
│   └── datadog/
│       ├── tracer.js
│       └── metrics.js
├── dashboard/
│   └── slo-dashboard.json
├── docker-compose.yml
├── .env
└── README.md
🧹 TODO
 Add retry logic to simulator

 Add latency and error budget calculations in Datadog

 Optional UI to view custom dashboards

