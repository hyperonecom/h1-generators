# h1-client-python

h1-client-python is an automatically generated library used to interact with
[HyperOne API](https://www.hyperone.com/tools/api/).

## Installation

You are able to get this library using [pip](https://pypi.org/project/pip/).

### Installation using pip

```shell
pip install <library name>
```

## Usage

The recommended way to use this package is to use it along with < credentials library link > library.
To to that install < credentials library name > using [pip](https://pypi.org/project/pip/):

```shell
library installation description
```

Then import use it as a token provider in your code:

```python
from <credentials library name> import get_passport_credentials_helper
from <client library name> import ApiClient, Configuration

provider = get_passport_credentials_helper() # you can optionally pass passport file location
cfg = Configuration()
cfg.access_token = provider.get_token("https://api.hyperone.com/v2") # works only for 5 minutes TODO: change it
api_client = ApiClient(cfg)
```

You can acquire more knoweledge about < credentials library > library on [its GitHub page](https://github.com/hyperonecom/h1-credentials-helper-python).

Configuration object allows you to use choosen API client.

Example:

```python
from <credentials library name> import get_passport_credentials_helper
from <client library name> import Configuration, ApiClient, IamProjectApi

provider = get_passport_credentials_helper()
cfg = Configuration()
cfg.access_token = provider.get_token("https://api.hyperone.com/v2")
api_client = ApiClient(cfg)

project_api = IamProjectApi(api_client)
iam_projects = project_api.iam_project_list()
print(iam_projects)
```

## Documentation

For full documentation of this library check [docs directory](docs/).
