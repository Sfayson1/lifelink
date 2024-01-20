import os
from psycopg_pool import ConnectionPool
from models import PostOut
from fastapi import FastAPI
from typing import Optional


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

    def create_post(self, data, user_id: Optional[int] = None) -> PostOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    params = [
                        data.content,
                        data.date_posted,
                        user_id
                    ]
                    db.execute(
                        """
                        INSERT INTO posts (content, date_posted, user_id)
                        VALUES (%s, %s, %s)
                        RETURNING id, content, date_posted;
                        """,
                        params,
                    )
                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        return PostOut(**record)
        except Exception as e:
            print(e)

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
