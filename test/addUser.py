import requests
import json
import random
users_data = [
    {
        "name": "Johan Doe1",
        "email": "john@example.com1",
        "contact": "112345678901",
        "college": "Example College",
        "course": "Computer Science",
        "department": "Engineering",
        "yearOfStudy": 3,
        "username": "johndsoe11",
        "password": "passaword1231",
        "role":"student"
    },
    {
        "name": "Janae Smith1",
        "email": "jane@example.com1",
        "contact": "918765432101",
        "college": "Example University",
        "course": "Electrical Engineering",
        "department": "Engineering",
        "yearOfStudy": 2,
        "username": "janessmith21",
        "password": "passaword456",
        "role":"student"
    },
    {
        "name": "Aliace Johnson1",
        "email": "alice@example.com1",
        "contact": "515555555551",
        "college": "Example College",
        "course": "Mathematics",
        "department": "Science",
        "yearOfStudy": None,
        "username": "alicesjohnson311",
        "password": "passaword7891",
        "role":"student"
    },
    {
        "name": "Boba Brown1",
        "email": "bob@example.com1",
        "contact": "111111111111",
        "college": "Example University",
        "course": "Physics",
        "department": "Science",
        "yearOfStudy": 1,
        "username": "bobbrsown41",
        "password": "passawordABC1",
        "role":"student"
    },
    {
        "name": "Emialy Davis1",
        "email": "emily@example.com1",
        "contact": "212222222221",
        "college": "Example College",
        "course": "Chemistry",
        "department": "Science",
        "yearOfStudy": 3,
        "username": "emilysdavis51",
        "password": "passawordDEF1",
        "role":"student"
    },
    {
        "name": "Micahael Wilson1",
        "email": "michael@example.com1",
        "contact": "313333333331",
        "college": "Example University",
        "course": "Biology",
        "department": "Science",
        "yearOfStudy": 2,
        "username": "michaselwilson61",
        "password": "passawordGHI1",
        "role":"student"
    },
    {
        "name": "Saraah Martinez1",
        "email": "sarah@example.com1",
        "contact": "414444444441",
        "college": "Example College",
        "course": "English",
        "department": "Humanities",
        "yearOfStudy": 4,
        "username": "sarahsmartinez71",
        "password": "passawordJKL1",
        "role":"student"
    },
    {
        "name": "Davaid Anderson1",
        "email": "david@example.com1",
        "contact": "61666666666",
        "college": "Example University",
        "course": "History",
        "department": "Humanities",
        "yearOfStudy": None,
        "username": "davidsanderson81",
        "password": "passawordMNO1",
        "role":"student"
    },
    {
        "name": "Oliavia Taylor1",
        "email": "olivia@example.com1",
        "contact": "717777777771",
        "college": "Example College",
        "course": "Sociology",
        "department": "Social Sciences",
        "yearOfStudy": 3,
        "username": "olivisataylor91",
        "password": "passawordPQR1",
        "role":"student"
    },
    {
        "name": "Wilaliam Thomas1",
        "email": "william@example.com1",
        "contact": "818888888881",
        "college": "Example University",
        "course": "Economics",
        "department": "Social Sciences",
        "yearOfStudy": 2,
        "username": "willisamthomas101",
        "password": "passawordSTU1",
        "role":"student"
    }
]


def send_request(url, data):
    response = requests.post(url, json=data)
    return response.text

url = "http://localhost:3000/api/v1/auth/register"

for user_data in users_data:
    response_text = send_request(url, user_data)
    print("Response:", response_text)