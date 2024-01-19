from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from models import UserToken, UserIn, UserForm, UserOut
from queries.users import UserQueries, DuplicateAccountError
from authenticator import authenticator
from pydantic import BaseModel


router = APIRouter()

class HttpError(BaseModel):
    detail: str

@router.get("/users/{user_id}/", response_model=UserOut)
async def get_user(
    user_id: int,
    repo: UserQueries = Depends(),
):
    return repo.get_user(user_id)

@router.post("/api/users/", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = queries.create_user(info, hashed_password)

    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(user=user, **token.dict())

@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: dict = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_taken": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }

@router.put("/users/{user_id}", response_model=UserOut)
async def update_user_profile(user_id: int, updated_info: UserIn, queries: UserQueries = Depends()):
    try:
        updated_user = queries.update_user_profile(user_id, updated_info)
        return updated_user
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Username does not exist"
        )
