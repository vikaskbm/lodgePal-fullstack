from django.conf import settings
import jwt

from users.models import User


class JWTMiddleware:
    def resolve(self, next, root, info, **args):
        request = info.context
        token = request.META.get("HTTP_AUTHORIZATION")
        if token:
            try:
                decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                pk = decoded.get('pk')
                user = User.objects.get(pk=pk)
                info.context.user = user

            except Exception:
                pass
        return next(root, info, **args)