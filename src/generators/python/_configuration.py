from .configuration_base import Configuration as BaseConfig


class Configuration(BaseConfig):
    def get_access_token(self):
        access_token_function = getattr(self, "access_token_function")
        if callable(access_token_function):
            return access_token_function()

        if self.access_token is not None:
            return self.access_token

        return None

    def auth_settings(self):
        """Gets Auth Settings dict for api client.

        :return: The Auth Settings information dict.
        """
        token = self.get_access_token()
        auth = {}
        if token is not None:
            auth['BearerAuth'] = {
                'type': 'bearer',
                'in': 'header',
                'format': 'JWT',
                'key': 'Authorization',
                'value': 'Bearer ' + token
            }
        if token is not None:
            auth['iam'] = {
                'type': 'oauth2',
                'in': 'header',
                'key': 'Authorization',
                'value': 'Bearer ' + token
            }
        return auth
