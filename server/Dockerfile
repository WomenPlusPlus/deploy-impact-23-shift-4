# Use the official Python 3.11 image as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt /app

# Install the Python packages listed in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application code into the container
COPY . .

# Expose a port if your Flask app is listening on a specific port (e.g., 5000)
EXPOSE 5001

ENV FLASK_APP=main.py

# Define the command to run your Flask application
CMD ["flask", "run", "--host", "0.0.0.0"]