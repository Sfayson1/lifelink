import os
from fastapi.testclient import TestClient
from main import app
from queries.users import UserQueries
from models import UserOut
from authenticator import authenticator

if "SIGNING_KEY" not in os.environ:
    os.environ["SIGNING_KEY"] = "ThisIsATestSigningKey123!"


client = TestClient(app)


class MockUserQueries:
    def get_all(self):
        return [
            UserOut(
                id=1,
                username="user1",
                first_name="John",
                last_name="Doe",
                email="john.doe@example.com",
                grad_class="2022"),
            UserOut(
                id=2,
                username="user2",
                first_name="Jane",
                last_name="Doe",
                email="jane.doe@example.com",
                grad_class="2022")
        ]


def mock_get_current_account_data():
    return {
        "id": 111,
        "username": "username",
        "first_name": "first_name",
        "last_name": "last_name",
        "email": "email",
        "grad_class": "grad_class"
    }


def test_get_users():
    app.dependency_overrides[
        authenticator.get_account_getter
    ] = mock_get_current_account_data
    app.dependency_overrides[
        UserQueries
    ] = MockUserQueries

    response = client.get("/users/")

    assert response.status_code == 200
    users = response.json()
    assert len(users) == 2
    assert response.json() == [
        {
            "id": 1,
            "username": "user1",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "grad_class": "2022"
        },
        {
            "id": 2,
            "username": "user2",
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane.doe@example.com",
            "grad_class": "2022"
        }
    ]


app.dependency_overrides = {}
