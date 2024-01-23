from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,

)
from models import PostIn, PostOut, PostList
from queries.posts import PostQueries
from pydantic import BaseModel
from authenticator import authenticator


router = APIRouter()


class HttpError(BaseModel):
    detail: str

@router.get("/posts/all", response_model=PostList)
async def list_all_posts(
    repo: PostQueries = Depends(),
):
    return repo.get_all()


@router.get("/posts/mine", response_model=PostList)
async def list_my_posts(
    post_id: int,
    repo: PostQueries = Depends(),
):
    return repo.get_post(post_id)

@router.post("/posts", response_model=PostOut)
async def create_post(
    post: PostIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PostQueries = Depends(),
):
    print('****ACCOUNT DATA****', account_data)
    return repo.create_post(data=post, user_id=account_data['username'])

@router.delete("/posts/{post_id}/", response_model=bool)
async def delete_post(
    post_id: int,
    repo: PostQueries = Depends(),
) ->bool:
    return repo.delete_post(post_id)

@router.get("/posts/{username}", response_model=PostList)
async def list_users_posts(
    username: str,
    repo: PostQueries = Depends(),
):
    return repo.get_user_posts(username)
