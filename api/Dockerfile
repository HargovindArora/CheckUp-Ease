FROM python:3.8.9-buster

WORKDIR /app

# Copy the current directory contents into the container at /app 
ADD . /app

# Install the dependencies
RUN pip3 install -r requirements.txt

# run the command to start uWSGI
CMD ["uwsgi", "app.ini"]