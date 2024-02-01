steps=[
    [
        #step 1
        """
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            content VARCHAR,
            date_posted DATE,
            user_id VARCHAR
        );
        """,
        #step 2
        """
        DROP TABLE posts;
        """
    ],
]
