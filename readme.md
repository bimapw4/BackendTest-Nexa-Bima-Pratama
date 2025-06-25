# Nexa API

> A simple **Node.js + Express** REST API with **MySQL**, built with modular architecture including authentication, employee management, AES encryption, API transaction logging, and Docker support.

## 📁 Project Structure
<pre>
├── bootstrap/
│ └── db.js # Database connection setup
├── controller/ # Controller layer
│ ├── auth/
│ │ └── auth.js
│ └── employes/
│ └── employee.js
├── entity/ # Data input for validation
│ ├── auth.js
│ └── employee.js
├── middleware/
│ ├── validate_token.js # JWT validation middleware
│ └── log_trx_api.js # Middleware for API transaction logging
├── repositories/ # Data access layer
│ ├── auth/
│ │ └── auth.js
│ ├── employe/
│ │ └── employe.js
│ └── repo.js # Combines all repositories
├── routes/
│ ├── authRoute.js
│ ├── employeeRoute.js
│ └── routes.js # Main route entry
├── services/ # Business logic layer
│ ├── auth/
│ │ └── auth.js
│ └── employee/
│ └── employee.js
├── utils/
│ ├── aes.js # AES encryption/decryption helper
│ └── generate_nip.js # NIP (employee ID) generator
├── Dockerfile
├── docker-compose.yml
├── .env
├── index.js # Server entry point
└── README.md
<pre>

## 🚀 Features

- 🔐 **Admin Authentication (Login)**
- 👤 **Employee CRUD Management**
- 🔒 **AES-256 Encryption (ECB mode)**
- 📋 **API Transaction Logging Middleware**
- 🐳 **Docker & Docker Compose** for deployment


## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/bimapw4/BackendTest-Nexa-Bima-Pratama.git
cd BackendTest-Nexa-Bima-Pratama
```

### 2. Install Dependencies
```
npm install
```

### 3. Create a .env file

you can follow or copy the example of env ```.env.example``` or you can fill with 

```bash
PORT=3000
APP_NAME=NexaAPI
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=nexa_db
```

### 4. Run the Project

Without Docker
```
node index.js
```
#### or

with docker
```
docker compose up -d
```

## 📚 API Endpoints
### 🔐 Authentication
```POST /login```
Authenticate admin user and return a JWT token.
* body 
```
{
  "username": "dataadmin",
  "password": "databaru"
}
```
* response 
```
{
  "token": "<jwt_token>"
}
```

### 👥 Employee Management
All endpoints below require ```Authorization: Bearer <token>```

##### ```GET /employee```
Get paginated list of employees.

* Query Params:

keyword (optional): filter by name

start (optional): starting index (default: 0)

count (optional): number of records (default: 10)

##### ```POST /employee```
Register a new employee.

* body request
```
{
    "nama" : "",
    "alamat" : "",
    "gend": "",
    "photo": "",
    "status" : 1,
    "tgl_lahir": "",
    "id": 
}
```

##### ```PUT /employee/:nip```
Update employee data by NIP.

* params
```
nip
```
* body request
```
{
    "nama" : "",
    "alamat" : "",
    "gend": "",
    "photo": "",
    "status" : 1,
    "tgl_lahir": "",
    "id": 
}
```

##### ```DELETE /employee/:nip```
delete employee data by NIP.

* params
```
nip
```


### 📄 API Logging
All API requests and responses are logged to the log_trx_api table using logTransaction middleware.

### 📦 AES Encryption
AES encryption and decryption (ECB mode) is handled in /utils/aes.js.



