from credentials import get_passport_credentials_helper
from h1 import Configuration, ApiClient, IamProjectApi


def test_access_token_configuration():
    provider = get_passport_credentials_helper()
    cfg = Configuration()
    cfg.access_token = provider.get_token("https://api.hyperone.com/v2")

    api_client = ApiClient(cfg)
    project_api = IamProjectApi(api_client)
    project_api.iam_project_list()


def test_api_key_configuration():
    audience = "https://api.hyperone.com/v2"
    provider = get_passport_credentials_helper()
    cfg = Configuration()
    cfg.api_key["api_key"] = provider.get_token(audience)
    cfg.api_key_prefix["api_key"] = "Bearer"

    api_client = ApiClient(cfg)
    project_api = IamProjectApi(api_client)
    project_api.iam_project_list()


test_access_token_configuration()
test_api_key_configuration()
