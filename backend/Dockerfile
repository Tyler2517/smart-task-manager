# Use official Python image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project (including `manage.py`)
COPY . /app/


# Expose the port for the app
EXPOSE 8000

# Command to run the application    
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
