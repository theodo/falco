from django.http import HttpResponse


def health(request):
    return HttpResponse(status=200)
