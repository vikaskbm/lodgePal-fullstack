from .models import User

def resolve_user(root, info, id):
    return User.objects.get(id=id)
