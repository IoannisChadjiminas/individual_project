from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        '''
        signals.py is imported when the app is loaded
        '''
        from . import signals
