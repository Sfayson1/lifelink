import os
from jwtdown_fastapi.authentication import Authenticator
from fastapi import Depends
from queries.users import UserQueries
from models import UserOutWithPassword, UserOut


class LifeLinkAuthenticator(Authenticator):
    async def get_account_data(self, username: str, accounts: UserQueries):
        return accounts.get(username)

    def get_account_getter(self, accounts: UserQueries = Depends()):
        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UserOutWithPassword):
        return account.username, UserOut(**account.dict())



authenticator = LifeLinkAuthenticator(os.environ["SIGNING_KEY"])
