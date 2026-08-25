# Keystone Field Service Management System

A full-stack **Field Service Management (FSM)** application designed to manage the complete lifecycle of customer service requests — from work-order creation to technician assignment, service execution, completion, time tracking, inventory usage, and management analysis.

The system follows a role-based workflow involving **Customers, Dispatchers, Technicians, and Managers**.

---

## 📌 Project Overview

Keystone Field Service Management helps organizations coordinate field-service operations through a centralized platform.

The application allows:

* Customers to create service work orders
* Dispatchers to review and assign work orders
* Dispatchers to assign technicians
* Technicians to manage and complete assigned work
* Track work-order status history
* Track technician time logs
* Track inventory and parts used for work orders
* Manage customer sites
* Manage authentication and role-based access
* Provide management-level visibility into service operations

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Frontend       │
                    │   React / TypeScript │
                    └──────────┬───────────┘
                               │ REST APIs
                               ▼
                    ┌──────────────────────┐
                    │       Backend        │
                    │ Spring Boot / Java   │
                    └──────────┬───────────┘
                               │ JPA / Hibernate
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │      Database        │
                    └──────────────────────┘
```

---

## 👥 User Roles

### Customer

Customers can:

* Create service requests
* Create work orders
* View their work orders
* View work-order status
* Manage customer/site information

### Dispatcher

Dispatchers are responsible for operational coordination.

They can:

* View incoming work orders
* Review work-order details
* Assign technicians
* Change work-order status
* Monitor technician assignments
* Track work-order progress

### Technician

Technicians can:

* View assigned work orders
* Accept/handle assigned work
* Start service work
* Update work-order status
* Complete work orders
* Record time spent
* Record parts/inventory usage

### Manager

Managers can:

* Monitor overall work-order activity
* Analyze completed and active work
* Review technician performance
* Review service history
* Monitor inventory usage
* Analyze operational data

---

# 🔄 Work-Order Workflow

The central entity of the system is the `work_orders` table.

```text
Customer
   │
   │ Creates Work Order
   ▼
 ┌────────┐
 │  NEW   │
 └───┬────┘
     │
     │ Dispatcher reviews
     ▼
┌────────────┐
│  ASSIGNED  │
└─────┬──────┘
      │
      │ Technician assigned
      ▼
┌────────────┐
│ PROCESSING │
└─────┬──────┘
      │
      │ Technician starts work
      ▼
┌────────────┐
│  STARTED   │
└─────┬──────┘
      │
      │ Technician completes work
      ▼
┌────────────┐
│ COMPLETED  │
└────────────┘
```

Every important status transition can be recorded in the work-order status history.

---

# 🗄️ Database Design

The database is centered around the `work_orders` entity.

### Core entities

```text
users
customers
technicians
work_orders
sites
```

### Supporting entities

```text
time_logs
part_usage
inventory
work_order_status_history
password_reset_tokens
```

### Main relationships

```text
users
 │
 ├────────────── customers
 │
 └────────────── technicians
 │
 ▼
work_orders
 │
 ├── customer_id
 ├── site_id
 ├── technician_id
 └── assigned_by
```

### Work-order related entities

```text
work_orders
    │
    ├────────── time_logs
    │
    ├────────── part_usage
    │
    └────────── work_order_status_history
```

---

## 🔑 Important Work-Order Relationships

| Column          | References              | Purpose                                |
| --------------- | ----------------------- | -------------------------------------- |
| `customer_id`   | `customers.customer_id` | Customer who requested the service     |
| `site_id`       | `sites.id`              | Location where service is required     |
| `technician_id` | `technicians.id`        | Technician responsible for the work    |
| `assigned_by`   | `users.id`              | Dispatcher who assigned the work order |

`assigned_by` references `users` because a dispatcher is represented as a user with the `DISPATCHER` role.

---

# 🧩 Database Entities

### Users

Stores common authentication and user information.

```text
id
employee_id
first_name
last_name
email
password
phone
role
specialization
active
joined_date
address
```

Supported roles include:

```text
CUSTOMER
DISPATCHER
TECHNICIAN
MANAGER
```

### Customers

Stores customer-specific information and links the customer profile to a user.

### Technicians

Stores technician-specific information.

```text
id
user_id
specialization
active
```

### Work Orders

The central business entity.

Contains information such as:

```text
id
customer_id
site_id
technician_id
assigned_by
title
description
priority
status
service_type
address
scheduled_date
created_at
assigned_at
started_at
completed_at
sla_due_date
sla_breached
```

### Sites

Stores customer service locations.

### Time Logs

Tracks technician work duration and notes.

### Inventory

Stores service parts and inventory quantities.

### Part Usage

Connects inventory items to work orders and records parts consumed during service.

### Work Order Status History

Maintains an audit trail of work-order status changes.

Example:

```text
NEW → ASSIGNED
ASSIGNED → PROCESSING
PROCESSING → STARTED
STARTED → COMPLETED
```

---

# 🛠️ Technology Stack

## Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Security
* JWT Authentication
* PostgreSQL
* Maven
* Lombok
* Bean Validation
* REST APIs

## Frontend

* React
* TypeScript
* HTML5
* CSS3
* Bootstrap / UI components
* Axios
* Vite

## Development Tools

* IntelliJ IDEA
* VS Code
* PostgreSQL
* DBeaver
* Postman
* Git
* GitHub
* Docker

---

# 🔐 Authentication & Authorization

The application uses JWT-based authentication.

```text
Login
  │
  ▼
Backend validates credentials
  │
  ▼
JWT token generated
  │
  ▼
Frontend stores token
  │
  ▼
Token sent with protected API requests
```

Role-based authorization controls access to different modules.

Example:

```text
CUSTOMER
   → Customer APIs

DISPATCHER
   → Dispatcher APIs

TECHNICIAN
   → Technician APIs

MANAGER
   → Management APIs
```

---

# 📂 Project Structure

```text
keystone-field-service-management/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com.keystone/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── entity/
│   │   │   │       ├── dto/
│   │   │   │       ├── security/
│   │   │   │       ├── exception/
│   │   │   │       └── config/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# 🚀 How to Run the Project

## Prerequisites

Install the following before running the application:

* Java 17+
* Maven 3.9+
* Node.js 18+
* npm
* PostgreSQL
* Git

Verify the installations:

```bash
java -version
mvn -version
node -v
npm -v
psql --version
```

---

# 1️⃣ Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd keystone-field-service-management
```

---

# 2️⃣ Configure PostgreSQL

Create a PostgreSQL database.

For example:

```sql
CREATE DATABASE keystone_db;
```

Make sure PostgreSQL is running.

If your PostgreSQL server uses a custom port, update the backend configuration accordingly.

---

# 3️⃣ Configure Backend Database

Open:

```text
backend/src/main/resources/application.properties
```

Configure the PostgreSQL connection:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/keystone_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> Replace the username, password, port, and database name with your local PostgreSQL configuration.

For production, database credentials should be supplied through environment variables rather than committed to Git.

---

# 4️⃣ Run the Backend

Navigate to the backend:

```bash
cd backend
```

Build the project:

```bash
mvn clean install
```

Run Spring Boot:

```bash
mvn spring-boot:run
```

The backend will normally be available at:

```text
http://localhost:8080
```

---

# 5️⃣ Run the Frontend

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 6️⃣ API Testing

The REST APIs can be tested using Postman.

Example API structure:

```text
/api/auth
/api/customers
/api/workorders
/api/technicians
/api/dispatcher
/api/sites
/api/inventory
/api/time-logs
```

Authentication-protected endpoints require the JWT token.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🧪 Testing

Backend tests can be executed using:

```bash
mvn test
```

The project can use:

* JUnit
* Mockito
* Spring Boot Test

For API testing:

```text
Postman
```

---

# 🔔 Notification Workflow

The notification module is designed around important business events.

For example:

```text
Customer creates Work Order
             │
             ▼
        NEW Work Order
             │
             ▼
       Dispatcher
        Notification
```

When a dispatcher assigns a technician:

```text
Dispatcher
    │
    │ assigns
    ▼
Work Order
    │
    ▼
Technician Notification
```

This allows the system to support event-driven operational communication.

---

# 📊 Management & Reporting

The management layer can provide visibility into:

* Total work orders
* New work orders
* Assigned work orders
* Active work orders
* Completed work orders
* SLA breaches
* Technician workload
* Technician service time
* Inventory consumption
* Work-order completion trends

---

# 🔒 Data Integrity

The database uses foreign-key constraints to maintain relationships.

Examples:

```text
work_orders.customer_id
        ↓
customers.customer_id
```

```text
work_orders.technician_id
        ↓
technicians.id
```

```text
work_orders.assigned_by
        ↓
users.id
```

```text
work_orders.site_id
        ↓
sites.id
```

This prevents invalid references from being stored in the database.

---

# 📈 Future Enhancements

Planned/possible improvements include:

* Real-time notifications using WebSocket
* Email notifications
* Push notifications
* Redis caching
* Kafka/event-driven architecture
* Advanced analytics dashboard
* SLA monitoring and automated alerts
* Technician location tracking
* Route optimization
* File/image attachments for work orders
* Digital service reports
* Customer feedback and ratings
* Inventory low-stock alerts
* Docker-based deployment
* CI/CD pipeline
* AWS deployment
* Automated API documentation using Swagger/OpenAPI

---

# 🐳 Docker

Docker support can be added to simplify local development.

Example architecture:

```text
┌──────────────┐
│   Frontend   │
│   Container  │
└──────┬───────┘
       │
┌──────▼───────┐
│   Backend    │
│   Container  │
└──────┬───────┘
       │
┌──────▼───────┐
│  PostgreSQL  │
│   Container  │
└──────────────┘
```

---

# 🤝 Development Workflow

Recommended Git workflow:

```text
main
 │
 ├── feature/authentication
 ├── feature/customer
 ├── feature/dispatcher
 ├── feature/technician
 ├── feature/work-orders
 └── feature/inventory
```

Changes should be developed in feature branches and merged into the main integration branch after testing.

---

# 👩‍💻 Development Team

**Keystone Field Service Management**

A collaborative full-stack application developed using modern Java/Spring Boot and React technologies.

---

# 📄 License

This project is currently intended for educational, internship, and portfolio purposes.

If you plan to distribute or deploy the project publicly, add an appropriate open-source license such as MIT.
