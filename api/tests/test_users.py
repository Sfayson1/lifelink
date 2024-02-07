from fastapi.testclient import TestClient
from main import app
from queries.users import UserQueries
from models import UserIn
from authenticator import authenticator

client = TestClient(app)
user_queries = UserQueries()


def test_get_all_users():
    user1_data = UserIn(
        username="user1",
        first_name="John",
        last_name="Doe",
        email="john.doe@example.com",
        grad_class="2022",
        password="password1"
    )
    user_queries.create_user(user1_data, "hashed_password1")

    user2_data = UserIn(
        username="user2",
        first_name="Jane",
        last_name="Doe",
        email="jane.doe@example.com",
        grad_class="2023",
        password="password2"
    )
    user_queries.create_user(user2_data, "hashed_password2")

    response = client.get("/users")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 2
    for user in response.json():
        assert isinstance(user, dict)
        assert "id" in user
        assert "username" in user
        assert "first_name" in user
        assert "last_name" in user
        assert "email" in user
        assert "grad_class" in user
