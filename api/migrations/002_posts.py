steps = [
    [
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            content VARCHAR,
            date_posted DATE,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE posts;
        """,
    ],
]
