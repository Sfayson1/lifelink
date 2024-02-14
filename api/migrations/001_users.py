steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            grad_class VARCHAR(255),
            hashed_password VARCHAR(255)
        );
        """,
        """
        DROP TABLE users;
        """,
    ],
]
