from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


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