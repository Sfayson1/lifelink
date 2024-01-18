from pydantic import BaseModel, Field
from datetime import datetime
from jwtdown_fastapi.authentication import Token
from datetime import datetime


class UserIn(BaseModel):
    username:str
    first_name: str
    last_name: str
    password:str
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
    id:str
    username:str
    first_name: str
    last_name: str
    email: str
    grad_class: str

class UserToken(Token):
    user: UserOut

class PostIn(BaseModel):
    post_id: int
    first_name: str
    last_name: str
    content: str
    date_posted: datetime = Field(default_factory=datetime.utcnow)


class PostOut(BaseModel):
    post_id: int
    first_name: str
    last_name: str
    content: str
    date_posted: datetime
