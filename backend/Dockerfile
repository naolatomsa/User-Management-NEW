FROM python:3.10

WORKDIR /app/backend

COPY Usermanagement-with-Django-and-Rest-Framework-API-main2/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN . /app/backend/myenv/Scripts/activate

EXPOSE 8000

CMD ["python", "Usermanagement-with-Django-and-Rest-Framework-API-main2/manage.py", "runserver", "0.0.0.0:8000"]