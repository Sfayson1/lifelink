from pydantic import BaseModel, Field
from datetime import date, datetime
from jwtdown_fastapi.authentication import Token
from typing import Optional

class UserIn(BaseModel):
    username:str
    first_name: str
    last_name: str
    password:str
    email: str
    grad_class: str

class UserInNoPass(BaseModel):
    username:str
    first_name: str
    last_name: str
    email: str
    grad_class: str

class UserInNoPassOrUsername(BaseModel):
    first_name: str
    last_name: str
    email: str
    grad_class: str

class UserForm(BaseModel):
    username: str
    password: str

class UserOutWithPassword(BaseModel):
    id:str
    username: str
    first_name: str
    last_name: str
    email: str
    grad_class: str
    hashed_password: str

class UserOut(BaseModel):
    id: int
    username:str
    first_name: str
    last_name: str
    email: str
    grad_class: str

class UserOutNoUsername(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    grad_class: str

class UserToken(Token):
    user: UserOut

class PostIn(BaseModel):
    content: str
    date_posted: date = Field(default_factory=lambda: datetime.utcnow().date())

class PostOut(PostIn):
    id: int
    content: str
    user_id: int
    user_first_name: str
    user_last_name: str

class PostOutWithUser(PostIn):
    id: int
    content: str
    user_id: int
    user_first_name: str
    user_last_name: str




class PostList(BaseModel):
    posts: list[PostOut]


class PostListWithUser(BaseModel):
    posts: list[PostOutWithUser]
