from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from models import UserInNoPassOrUsername, UserOutNoUsername, UserToken, UserIn, UserForm, UserOut
from queries.users import UserQueries, DuplicateAccountError
from authenticator import authenticator
from pydantic import BaseModel
from typing import List, Optional, Union


router = APIRouter()

class Error(BaseModel):
    message: str

class HttpError(BaseModel):
    detail: str

@router.get("/users/{user_id}/", response_model=Optional[UserOut])
async def get_user(
    user_id: int,
    repo: UserQueries = Depends(),
) -> UserOut:
    return repo.get_user(user_id)

@router.get("/users", response_model=Optional[Union[List[UserOut], Error]])
def get_all(
    repo: UserQueries = Depends(),
):
    return repo.get_all()

@router.post("/api/users/", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create_user(info, hashed_password=hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=user, **token.dict())

@router.put("/users/{user_id}/", response_model=Union[UserOutNoUsername, Error])
def update_user(
    user_id: int,
    user: UserInNoPassOrUsername,
    repo: UserQueries = Depends(),
) -> Union[Error, UserOutNoUsername]:
    return repo.update_user(user_id, user)

@router.delete("/users/{user_id}/", response_model=bool)
def delete_user(
    user_id:int,
    repo: UserQueries = Depends(),
) ->bool:
    return repo.delete_user(user_id)

@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: dict = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:

    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


