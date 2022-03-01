from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.core.management import call_command

User = get_user_model()

class Command(BaseCommand):
    help = u'Запуск с созданием админа и 2-ух юзеров'

    def handle(self, *args, **kwargs):
        try:
            User.objects.create_superuser(username='dima', password='1', email='dima12@mail.com')
            User.objects.create_user(username='dima1', password='dima123', first_name='dima1', last_name='dima1', email='dima123@mail.com')
            User.objects.create_user(username='dima2', password='dima123', first_name='dima2', last_name='dima2', email='dima1234@mail.com')
        except:
            pass
        call_command('runserver')