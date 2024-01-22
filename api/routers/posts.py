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


@router.get("/posts/", response_model=PostList)
async def list_users_posts(
    post_id: int,
    repo: PostQueries = Depends(),
):
    return repo.get_post(post_id)


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
    user_id = account_data.get("user_id")
    return repo.create_post(post)


@router.delete("/posts/{post_id}/", response_model=bool)
async def delete_post(
    post_id: int,
    repo: PostQueries = Depends(),
):
    deleted = repo.delete_post(post_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return {"message": "Post deleted successfully"}

@router.put("/posts/{post_id}", response_model=Union[PostOut, Error])
async def update_post(
    post_id: int,
    repo: PostQueries = Depends(),
) -> Union[Error, PostOut]:
    return repo.update