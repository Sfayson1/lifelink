import os
from psycopg_pool import ConnectionPool
from models import UserOutWithPassword, UserOut, UserIn, UserOutWithBoth
from typing import List, Optional, Union
from pydantic import BaseModel, ValidationError

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class Error(BaseModel):
    message: str

class DuplicateAccountError(ValueError):
    pass

class UserQueries:
    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, first_name, last_name, email, grad_class
                        FROM users
                        ORDER BY id
                        """
                    )
                    result = []
                    for record in db:
                        user = UserOut(
                            id=record[0],
                            username=record[1],
                            first_name=record[2],
                            last_name=record[3],
                            email=record[4],
                            grad_class=record[5]
                        )
                        result.append(user)
                    return result
        except Exception as e:
            print(e)
            return{"message": "Could not get all users"}

    def update_user(self, data, hashed_password) -> UserOutWithBoth:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    params = [
                        data.username,
                        data.first_name,
                        data.last_name,
                        data.password,
                        data.email,
                        data.grad_class,
                        hashed_password,
                        data.id
                    ]
                    db.execute(
                        """
                        UPDATE users
                        SET username=%s, first_name=%s, last_name=%s, password=%s, email=%s, grad_class=%s, hashed_password=%s
                        WHERE id=%s
                        RETURNING id, username, first_name, last_name, password, email, grad_class, hashed_password
                        """,
                        params,
                    )

                    record = None
                    row = db.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                    return UserOutWithBoth(**record)
        except Exception as e:
            print(e)
            return {"message": "Could not update"}

    def delete_user(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_user(self, user_id: int) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, first_name, last_name, email, grad_class
                        FROM users
                        WHERE id = %s;
                        """,
                        [user_id],
                    )
                    record = result.fetchone()
                    return UserOut(
                        id=record[0],
                        username=record[1],
                        first_name=record[2],
                        last_name=record[3],
                        email=record[4],
                        grad_class=record[5]
                    )
        except Exception:
            return {"message": "Could not get user record for this id"}


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

    def get(self, username: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, first_name, last_name, email, grad_class, hashed_password
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
                    return {"message": "Error"}
