steps=[
    [
        #step 1
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            content VARCHAR,
            date_posted DATE,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """,
        #step 2
        """
        DROP TABLE posts;
        """
    ],
]
