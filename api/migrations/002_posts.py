steps=[
    [
        #step 1
        """
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            content VARCHAR,
            date_posted DATE,
            user_id INT,
            user_first_name VARCHAR(255),
            user_last_name VARCHAR(255),
        );
        """,
        #step 2
        """
        DROP TABLE posts;
        """
    ],
]
