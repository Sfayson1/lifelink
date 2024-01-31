# Sherika Fayson's Journal
## 7
1/30/2024
With user profile at a good stopping place. I started on the homepage after sign up. My current blocker is that the way the model is currently written there is not way to access the username to display who wrote the posts. The only thing that displays is the posts and the time/date that they were posted.


## 6
1/29/2024
I learned that the username was not being passed in the api call because the model was not set up to pass the user_id. It was written to only pass the post id and the content. Once the model was updated to include the user_id. The username was able to be displayed with user posts. also added some light css.

## 5
1/26/2024
Was unable to get user_id undefined error corrected, but noticed that when I attempted to list the username of the person's posts no username was found.

## 4
1/25/2024
Worked on user profile page. was unable to lists user posts due to user_id not defined error. I had to hard code username in api endpoint to be able to see user info being pull from database.

## 3
1/23/2024
When creating the get mine endpoint found that information needed for that endpoint was the same as an existing query. So I linked get_user_posts to get the get mine endpoint instead of writing a duplicate query.

## 2
1/18/2024
created delete user endpoints

## 1
1/17/2024
Created issue tickets for api endpoints