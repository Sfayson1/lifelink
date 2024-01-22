import os
from psycopg_pool import ConnectionPool
from models import PostOut
from fastapi import FastAPI


app = FastAPI()

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class DuplicateAccountError(ValueError):
    pass

class PostQueries:
    def get_post(self, post_id: int) -> PostOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, user_id, content, created_at, updated_at
                    FROM posts
                    WHERE id = %s;
                    """,
                    [post_id],
                )
                try:
                    record = None
                    for row in db.fetchall():
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                    return PostOut(**record)
                except Exception:
                    return {"message": "Could not get post record for this id"}

    def create_post(self, data) -> PostOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                params = [
                    data.post_id,
                    data.content,
                ]
                db.execute(
                    """
                    INSERT INTO posts (post_id, content, created_at, updated_at)
                    VALUES (%s, %s, NOW(), NOW())
                    RETURNING id, post_id, content, created_at, updated_at;
                    """,
                    params,
                )
                record = None
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return PostOut(**record)

    def delete_post(self, post_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM posts
                    WHERE id = %s;
                    """,
                    [post_id],
                )
                return db.rowcount > 0

    def update(self, post_id: int, PostIn) -> Union[PostOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE post
                    SET name = %s
                     , from = %s
                    """
                )
                old_data = post.dict()
                return Pod
