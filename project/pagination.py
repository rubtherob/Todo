from rest_framework.pagination import LimitOffsetPagination


class ProjectSetPagination(LimitOffsetPagination):
    default_limit = 10

class TodoSetPagination(LimitOffsetPagination):
    default_limit = 20