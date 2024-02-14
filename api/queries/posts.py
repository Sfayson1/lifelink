import os
from psycopg_pool import ConnectionPool
from models import PostOut, PostOutWithUser
from fastapi import FastAPI
from typing import Optional
from psycopg.rows import dict_row

app = FastAPI(debug=True)

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class DuplicateAccountError(ValueError):
    pass


class PostQueries:
    def list_my_posts(self, post_id: int) -> Optional[PostOutWithUser]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT
                        p.id AS id,
                        p.user_id AS user_id,
                        p.content AS content,
                        p.date_posted AS date_posted,
                        u.first_name AS user_first_name,
                        u.last_name AS user_last_name
                    FROM posts p
                    INNER JOIN users u ON p.user_id = u.id
                    WHERE p.id = %s;
                    """,
                    [post_id],
                )
                row = db.fetchone()
                if row:
                    record = dict(
                        zip([column[0] for column in db.description], row)
                    )
                    return PostOutWithUser(**record)
                else:
                    return None

    def create_post(self, data, user_id: int) -> PostOutWithUser:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    # Insert the new post
                    db.execute(
                        """
                        INSERT INTO posts (content, date_posted, user_id)
                        VALUES (%s, %s, %s)
                        RETURNING id, content, date_posted, user_id;
                        """,
                        [data.content, data.date_posted, user_id],
                    )
                    post = db.fetchone()
                    if post is not None:
                        db.execute(
                            """
                            SELECT u.first_name, u.last_name
                            FROM users u
                            INNER JOIN posts p ON p.user_id = u.id
                            WHERE p.id = %s;
                            """,
                            [post["id"]],
                        )
                        user = db.fetchone()
                        if user is not None:
                            post_out = PostOutWithUser(
                                id=post["id"],
                                content=post["content"],
                                date_posted=post["date_posted"],
                                user_id=post["user_id"],
                                user_first_name=user["first_name"],
                                user_last_name=user["last_name"],
                            )
                            return post_out
                        else:
                            raise ValueError(
                                "Failed to fetch user information"
                            )
                    else:
                        raise ValueError("Failed to create post")
        except Exception as e:
            print(f"Error creating post: {e}")
            raise

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
                    SELECT
                        p.id AS id,
                        p.content AS content,
                        p.date_posted AS date_posted,
                        p.user_id AS user_id,
                        u.first_name AS user_first_name,
                        u.last_name AS user_last_name
                    FROM posts p
                    INNER JOIN users u ON p.user_id = u.id
                    ORDER BY p.date_posted DESC, p.id DESC;
                    """
                )
                records = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    records.append(PostOutWithUser(**record))
                return {"posts": records}

    def get_user_posts(self, user_id: int) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM posts
                    WHERE user_id = %s
                    ORDER BY date_posted DESC, id DESC;
                    """,
                    [user_id],
                )
                records = []
                for row in db.fetchall():
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
                        [data.content, data.date_posted, post_id],
                    )
                    old_data = data.dict()
                    return PostOut(id=post_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update post"}

    def get_specific_post(self, post_id: int) -> dict:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM posts
                    WHERE posts.id = %s
                    """,
                    (post_id,),
                )
                result = db.fetchone()
                return {
                    description[0]: column for description,
                    column in zip(db.description, result)
                } if result else {}
