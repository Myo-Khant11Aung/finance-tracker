from pydantic import BaseModel 

class User(BaseModel):
    nickname: str | None = None
    name: str | None = None
    picture: str | None = None
    updated_at: str
    email: str
    email_verified: bool
    sub: str | None = None
