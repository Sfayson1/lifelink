import os
from jwtdown_fastapi.authentication import Authenticator

authenticator = Authenticator(os.environ["SIGNING_KEY"])
