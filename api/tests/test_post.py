from fastapi.testclient import TestClient
from main import app
from queries.posts import PostQueries


client = TestClient(app)


class MockPostQueries:
    def get_specific_post(self, post_id):
        return {
            "id": 2,
            "content": "Content of post 2",
            "date_posted": "2024-02-07",
        }


post_id = 2


def test_get_specific_posts():
    app.dependency_overrides[PostQueries] = MockPostQueries

    response = client.get(f"/posts/postID/{post_id}")

    assert response.status_code == 200

    assert response.json()['date_posted'] == "2024-02-07"
    assert response.json()['content'] == "Content of post 2"
    assert response.json()['id'] == 2

    app.dependency_overrides.clear()
