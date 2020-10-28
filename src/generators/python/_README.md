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

Then import it and use it as a token provider in your code:

```python
from <credentials library name> import get_passport_credentials_helper
from <client library name> import ApiClient, Configuration

provider = get_passport_credentials_helper() # you can optionally pass passport file location
cfg = Configuration()
cfg.access_token = cfg.access_token_function = lambda: provider.get_token(
        "https://api.hyperone.com/v2")
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

### "Prefer" header

Some operations on API may be time-consuming. In this case server
may return [HTTP Status 202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202)
with `x-event-id` header containing request ID, and handle the operation asynchronously.
If you want to avoid this behavior, you can send `prefer` header [RFC7240](https://tools.ietf.org/html/rfc7240)
with your request, which will cause returning the operation result as response to this request.

To use this header from sdk simply pass `header_name` and `header_value` properties when
creating `ApiClient` object:

```python
api_client = ApiClient(cfg, header_name="prefer", header_value="respond-async,wait=86400")
```

Full example:

```python
from <client library name> import Configuration, ApiClient, IamProjectApi

cfg = Configuration()
api_client = ApiClient(cfg, header_name="prefer", header_value="respond-async,wait=86400")

project_api = IamProjectApi(api_client)
iam_projects = project_api.iam_project_list()
print(iam_projects)
```

You can get more information about `prefer` usage in HyperOne API
[in its documentation](https://www.hyperone.com/tools/api/concepts/headers.html#naglowek-prefer).

## Documentation

For full documentation of this library check [docs directory](docs/).
