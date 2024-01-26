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
    def list_my_posts(self, user_id: int) -> PostOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, content
                    FROM posts
                    WHERE id = %s;
                    """,
                    [user_id],
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

    def create_post(self, data, user_id: Optional[int] = None, username: Optional[str] = None) -> PostOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    params = [
                        data.content,
                        data.date_posted,
                        user_id,
                        username
                    ]
                    db.execute(
                        """
                        INSERT INTO posts (content, date_posted, user_id, username)
                        VALUES (%s, %s, %s, %s)
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


    def get_user_posts(self, user_id: str) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                print(user_id)
                db.execute(
                    """
                    SELECT *
                    FROM posts
                    WHERE user_id = %s;
                    """,
                    [str(user_id)],
                )
                records = []
                while True:
                    row = db.fetchone()
                    if row is None:
                        break
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    records.append(PostOut(**record))
                return {"posts": records}



    def update_post(self, post_id: int, data) -> Optional[PostOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE posts
                        SET content = %s, date_posted = %s
                        WHERE id = %s
                        RETURNING id, content, date_posted;
                        """,
                        [
                            data.content,
                            data.date_posted,
                            post_id
                        ]
                    )
                    old_data = data.dict()
                    return PostOut(id=post_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update post"}
