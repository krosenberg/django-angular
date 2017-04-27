from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from .models import Post
from django.core import serializers
import json

# Create your views here.
def index(request):
	return render(request, 'main/index.html')

def posts(request):
	if request.method == 'GET':
		posts = Post.objects.all()
		postsResp = [p.to_json() for p in posts]
		return JsonResponse(postsResp, safe=False)
	if request.method == 'POST':
		params = json.loads(request.body)
		post = Post(
			title=params.get('title'),
			text=params.get('text'),
		)
		post.save()
		return JsonResponse(post.to_json())

def postDetail(request, postId):
	post = Post.objects.get(id=postId)
	if request.method == 'DELETE':
		post.delete()
		return JsonResponse({'status': 'deleted'})
	if request.method == 'GET':
		return JsonResponse(post.to_json())