from credentials.providers.passport.credentials_helper import get_passport_credentials_helper
from h1 import Configuration, ApiClient, IamProjectApi


provider = get_passport_credentials_helper()
cfg = Configuration()
cfg.access_token = provider.get_token("https://api.hyperone.com/v2")

api_client = ApiClient(cfg)
project_api = IamProjectApi(api_client)
project_api.iam_project_list()
