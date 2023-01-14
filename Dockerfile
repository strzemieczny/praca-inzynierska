FROM python:3.10.4

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN apt-get update
RUN apt-get install -y libsasl2-dev python-dev libldap2-dev libssl-dev
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

CMD ["gunicorn", "--bind", "0.0.0.0:80", "PDS_Apps.wsgi"]
