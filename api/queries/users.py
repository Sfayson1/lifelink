import os
from psycopg_pool import ConnectionPool
from models import UserOutWithPassword

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class DuplicateAccountError(ValueError):
    pass

class UserQueries:
    def get_user(self, username: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, first_name, last_name, email, grad_class
                    FROM users
                    WHERE username = %s;
                    """,
                    [str(username)],
                )
                try:
                    record = None
                    for row in db.fetchall():
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                    return UserOutWithPassword(**record)
                except Exception:
                    return {"message": "Could not get user record for this email"}

    def create_user(self, data, hashed_password) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                params = [
                    data.username,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.grad_class,
                    hashed_password
                ]
                db.execute(
                    """
                    INSERT INTO users (username, first_name, last_name, email, grad_class, hashed_password)
                    VALUES(%s, %s, %s, %s, %s, %s)
                    RETURNING id, username, first_name, last_name, email, grad_class, hashed_password
                    """,
                    params,
                )

                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return UserOutWithPassword(**record)

    def update_user(self, username: str, updated_data) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                set_clause = ", ".join(f"{column} = %s" for column in updated_data.keys())
                params = list(updated_data.values()) + [username]
                db.execute(
                    f"""
                    UPDATE users
                    SET {set_clause}
                    WHERE username = %s
                    RETURNING id, username, first_name, last_name, email, grad_class, hashed_password
                    """,
                    params,
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return UserOutWithPassword(**record)
