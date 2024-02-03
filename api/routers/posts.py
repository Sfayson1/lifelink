from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,

)
from models import PostIn, PostOut, PostList, PostOutWithUser, PostListWithUser
from queries.posts import PostQueries
from pydantic import BaseModel
from authenticator import authenticator
from typing import Union
import logging

logging.basicConfig(level=logging.INFO)

router = APIRouter()


class Error(BaseModel):
    message: str

class HttpError(BaseModel):
    detail: str

@router.get("/posts/all", response_model=PostListWithUser)
async def list_all_posts(
    repo: PostQueries = Depends(),
):
    return repo.get_all()


@router.get("/posts/mine", response_model=PostListWithUser)
async def list_my_posts(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PostQueries = Depends(),
):
    # return repo.get_user_posts(account_data['username'])
    return repo.get_user_posts(username=account_data['username'])

@router.post("/posts", response_model=PostOut)
async def create_post(
    post: PostIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PostQueries = Depends(),
):
    print('****ACCOUNT DATA****', account_data)
    post_out = repo.create_post(data=post, user_id=account_data['id'])


    logging.info(f"Inside create_post, PostOut: {post_out}")

    return post_out

@router.delete("/posts/{post_id}/", response_model=bool)
async def delete_post(
    post_id: int,
    repo: PostQueries = Depends(),
) ->bool:
    return repo.delete_post(post_id)

@router.get("/posts/{user_id}", response_model=PostListWithUser)
async def list_users_posts(
    user_id: int,
    repo: PostQueries = Depends(),
):
    return repo.get_user_posts(user_id)


@router.put("/posts/{post_id}/", response_model=Union[PostOut, Error])
def update_post(
    post_id: int,
    post: PostIn,
    repo: PostQueries = Depends(),
) -> Union[Error, PostOut]:
    return repo.update_post(post_id, post)
