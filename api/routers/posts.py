from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,

)
from models import PostIn, PostOut
from queries.posts import PostQueries
from pydantic import BaseModel


router = APIRouter()


class HttpError(BaseModel):
    detail: str


@router.get("/posts/", response_model=PostOut)
async def list_posts(
    post_id: int,
    repo: PostQueries = Depends(),
):
    return repo.get_post(post_id)

@router.post("/posts/")
async def create_post(
    post: PostIn,
    repo: PostQueries = Depends(),
):
    return repo.create_post(post)


@router.delete("/posts/{post_id}")
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

@router.put("/posts/{post_id}")
async def update_post(

)
