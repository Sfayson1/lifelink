from pydantic import BaseModel, Field
from datetime import date, datetime
from jwtdown_fastapi.authentication import Token



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

class UserToken(Token):
    user: UserOut

class PostIn(BaseModel):
    content: str
class PostIn(BaseModel):
    content: str
    date_posted: date = Field(default_factory=lambda: datetime.utcnow().date())



class PostOut(PostIn):
    id: int
    content: str



class PostList(BaseModel):
    posts: list[PostOut]
