from fastapi.testclient import TestClient
from main import app
from queries.posts import PostQueries
from models import PostOutWithUser, PostListWithUser


client = TestClient(app)

mock_post_data = PostListWithUser(posts=[
    PostOutWithUser(
        id=1,
        content="Content of post 1",
        user_id=1,
        user_first_name="John",
        date_posted="2024-02-07",
        user_last_name="Doe",
    ),
    PostOutWithUser(
        id=2,
        content="Content of post 2",
        user_id=2,
        user_first_name="Jane",
        user_last_name="Smith",
    )
])


class MockPostQueries:
    def get_all(self):
        return mock_post_data


def test_get_all_posts():
    app.dependency_overrides[PostQueries] = MockPostQueries

    response = client.get("/posts/all")

    assert response.status_code == 200

    assert len(response.json()['posts']) == 2
    assert response.json()['posts'][0]['user_first_name'] == "John"
    assert response.json()['posts'][0]['user_last_name'] == "Doe"
    assert response.json()['posts'][0]['date_posted'] == "2024-02-07"
    assert response.json()['posts'][0]['content'] == "Content of post 1"
    assert response.json()['posts'][0]['id'] == 1
    assert response.json()['posts'][0]['user_id'] == 1

    app.dependency_overrides.clear()
