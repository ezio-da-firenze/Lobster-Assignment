import requests
import json
import random
# Define a list of 10 user data entries
users_data = [
    {
        "name": "John Doe",
        "email": "john@example.com",
        "contact": "1234567890",
        "college": "Example College",
        "course": "Computer Science",
        "department": "Engineering",
        "yearOfStudy": 3,
        "username": "johndoe1",
        "password": "password123"
    },
    {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "contact": "9876543210",
        "college": "Example University",
        "course": "Electrical Engineering",
        "department": "Engineering",
        "yearOfStudy": 2,
        "username": "janesmith2",
        "password": "password456"
    },
    {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "contact": "5555555555",
        "college": "Example College",
        "course": "Mathematics",
        "department": "Science",
        "yearOfStudy": None,
        "username": "alicejohnson3",
        "password": "password789"
    },
    {
        "name": "Bob Brown",
        "email": "bob@example.com",
        "contact": "1111111111",
        "college": "Example University",
        "course": "Physics",
        "department": "Science",
        "yearOfStudy": 1,
        "username": "bobbrown4",
        "password": "passwordABC"
    },
    {
        "name": "Emily Davis",
        "email": "emily@example.com",
        "contact": "2222222222",
        "college": "Example College",
        "course": "Chemistry",
        "department": "Science",
        "yearOfStudy": 3,
        "username": "emilydavis5",
        "password": "passwordDEF"
    },
    {
        "name": "Michael Wilson",
        "email": "michael@example.com",
        "contact": "3333333333",
        "college": "Example University",
        "course": "Biology",
        "department": "Science",
        "yearOfStudy": 2,
        "username": "michaelwilson6",
        "password": "passwordGHI"
    },
    {
        "name": "Sarah Martinez",
        "email": "sarah@example.com",
        "contact": "4444444444",
        "college": "Example College",
        "course": "English",
        "department": "Humanities",
        "yearOfStudy": 4,
        "username": "sarahmartinez7",
        "password": "passwordJKL"
    },
    {
        "name": "David Anderson",
        "email": "david@example.com",
        "contact": "6666666666",
        "college": "Example University",
        "course": "History",
        "department": "Humanities",
        "yearOfStudy": None,
        "username": "davidanderson8",
        "password": "passwordMNO"
    },
    {
        "name": "Olivia Taylor",
        "email": "olivia@example.com",
        "contact": "7777777777",
        "college": "Example College",
        "course": "Sociology",
        "department": "Social Sciences",
        "yearOfStudy": 3,
        "username": "oliviataylor9",
        "password": "passwordPQR"
    },
    {
        "name": "William Thomas",
        "email": "william@example.com",
        "contact": "8888888888",
        "college": "Example University",
        "course": "Economics",
        "department": "Social Sciences",
        "yearOfStudy": 2,
        "username": "williamthomas10",
        "password": "passwordSTU"
    }
]


url = "http://localhost:3000/api/v1/user/register"

for user_data in users_data:
    response = requests.post(url, json=user_data)
    print(f"Status code: {response.status_code}")

    # print(response.json())
