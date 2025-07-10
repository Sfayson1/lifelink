from fastapi import APIRouter, Request, Response, Depends
from models import UserForm, UserToken
from authenticator import authenticator
from queries.users import UserQueries

router = APIRouter()

@router.post("/token", response_model=UserToken)
async def login(
    request: Request,
    response: Response,
    form: UserForm,
    repo: UserQueries = Depends()
):
    token = await authenticator.login(response, request, form, repo)
    return token
