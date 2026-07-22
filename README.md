# Support CRM System

A full-stack Customer Support Ticketing CRM System built using FastAPI, React, Tailwind CSS, and SQLite.

This application allows support teams to manage customer support tickets, search and filter requests, update ticket statuses, and maintain customer issue records through a clean and responsive interface.

---

# Live Features

- Create customer support tickets
- View all tickets
- Search tickets in real-time
- Filter tickets by status
- Update ticket status
- Add support notes/comments
- REST API backend
- SQLite database integration
- Responsive frontend UI

---

# Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- Axios

## Backend
- FastAPI
- SQLAlchemy
- Pydantic

## Database
- SQLite

---

# Project Structure

```bash
support-crm/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── routes.py
│   │
│   ├── requirements.txt
│   └── tickets.db
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Features

## 1. Create Tickets

Users can create support tickets with:

- Customer Name
- Customer Email
- Issue Subject
- Description

Each ticket automatically receives:

- Unique Ticket ID
- Timestamp
- Default Status (Open)

---

## 2. View All Tickets

Dashboard displays:

- Ticket ID
- Customer Information
- Subject
- Status
- Actions

---

## 3. Search Functionality

Real-time search across:

- Ticket ID
- Customer Name
- Customer Email
- Subject
- Description

---

## 4. Status Filtering

Filter tickets by:

- Open
- In Progress
- Closed

---

## 5. Update Ticket Status

Support team members can:

- Change ticket status
- Add support notes/comments

---

# Backend API Endpoints

## Create Ticket

```http
POST /api/tickets
```

### Request Body

```json
{
  "customer_name": "Rahul Jangir",
  "customer_email": "rahul@example.com",
  "subject": "Payment Issue",
  "description": "Unable to complete payment."
}
```

---

## Get All Tickets

```http
GET /api/tickets
```

### Optional Query Parameters

```http
/api/tickets?status=Open
/api/tickets?search=Rahul
```

---

## Get Single Ticket

```http
GET /api/tickets/{ticket_id}
```

Example:

```http
/api/tickets/TKT-001
```

---

## Update Ticket

```http
PUT /api/tickets/{ticket_id}
```

### Request Body

```json
{
  "status": "In Progress",
  "notes": "Assigned to support team"
}
```

---

# Database Schema

## Tickets Table

| Column | Type |
|---|---|
| id | Integer |
| ticket_id | String |
| customer_name | String |
| customer_email | String |
| subject | String |
| description | Text |
| status | String |
| notes | Text |
| created_at | Timestamp |
| updated_at | Timestamp |

---

# Frontend UI

The frontend includes:

- Ticket creation form
- Ticket dashboard
- Search bar
- Status filters
- Responsive table layout
- Status action buttons

---

# Setup Instructions

## Clone Repository

```bash
git clone <your-repository-url>
cd support-crm
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```bash
http://127.0.0.1:8000
```

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# Future Improvements

Potential enhancements:

- Authentication & Authorization
- Admin Dashboard
- Priority Levels
- File Uploads
- Email Notifications
- Real-time Updates
- Charts & Analytics
- Dark Mode
- Docker Deployment

---

# Challenges Faced

- Designing clean API structure
- Connecting frontend with backend APIs
- Managing real-time search and filters
- Maintaining responsive UI layout

---

# Key Learnings

- Full-stack application architecture
- REST API development with FastAPI
- React state management
- Database integration using SQLAlchemy
- Frontend-backend communication

---

# Deployment

Recommended deployment:

## Frontend
- Vercel

## Backend
- Render / Railway

---

# Author

## Rahul Jangir

AI + Tech Intern Assessment Submission
