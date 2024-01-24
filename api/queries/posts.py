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
    def list_my_posts(self, post_id: int) -> PostOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, user_id, content
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

    def get_all(self) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM posts;
                    """
                )
                records = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    records.append(PostOut(**record))
                return {"posts": records}


    def get_user_posts(self, username: str) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM posts
                    WHERE user_id = %s;
                    """,
                    [username],
                )
                records = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    records.append(PostOut(**record))
                return {"posts": records}
