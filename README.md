
# Smart Task Manager

A full-stack task management application built with **Django** (backend) and **React** (frontend).

## Getting Started

Follow these steps to set up and run the project locally.

---

## Backend (Django)

### Prerequisites
- Python 3.x
- PostgreSQL or another database (optional, for production)
- Virtual environment tool (e.g., `venv` or `virtualenv`)

### Steps to Set Up the Database

1. **Install PostgreSQL:**
   Follow the instructions for your operating system to install PostgreSQL.

2. **Create a Database:**
   Log in to the PostgreSQL shell and run:
   ```sql
   CREATE DATABASE smart_task_db;
   CREATE USER smart_task_user WITH PASSWORD 'yourpassword';
   ALTER ROLE smart_task_user SET client_encoding TO 'utf8';
   ALTER ROLE smart_task_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE smart_task_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE smart_task_db TO smart_task_user;
   ```

3. **Update Django Settings:**
   In `backend/settings.py`, update the `DATABASES` setting:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'smart_task_db',
           'USER': 'smart_task_user',
           'PASSWORD': 'yourpassword',
           'HOST': '127.0.0.1',
           'PORT': '5432',
       }
   }
   ```

4. **Run Migrations:**
   Apply database migrations to set up the schema:
   ```bash
   python manage.py migrate
   ```

---

### Steps to Run the Backend

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```

2. **Set Up the Virtual Environment:**
   ```bash
   python -m venv env
   source env/bin/activate  # For Windows: env\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Development Server:**
   ```bash
   python manage.py runserver
   ```

5. **Access the API:**
   Open your browser and go to [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api).

---

## Frontend (React)

### Prerequisites
- Node.js and npm (Install [Node.js](https://nodejs.org/))

### Steps to Run the Frontend

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm start
   ```

4. **Access the App:**
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

---

## Running the Full Application

1. Open two terminal windows or tabs.
2. In one terminal, start the Django backend:
   ```bash
   python manage.py runserver
   ```
3. In the other terminal, start the React frontend:
   ```bash
   npm start
   ```

The backend will run on [http://127.0.0.1:8000](http://127.0.0.1:8000) and the frontend on [http://localhost:3000](http://localhost:3000).

---

## Additional Notes

- Make sure both servers are running simultaneously for full functionality.
- Ensure your backend `CORS` settings allow requests from the frontend.
