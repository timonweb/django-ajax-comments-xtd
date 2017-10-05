# django-ajax-comments-xtd
An addon app to https://github.com/danirus/django-comments-xtd that makes comments submittable via ajax

# Installation
Until I put it on Pypi, here's you install it:

1. Install dependencies:

```pip install django-comments-xtd```

2. Clone the app into your django project:

```git clone https://github.com/timonweb/django-ajax-comments-xtd.git django_ajax_comments_xtd```

3. Clean git repo:
```rm -rf django_ajax_comments_xtd/.git```

4. Add the app and its dependencies to INSTALLED_APPS:
```
INSTALLED_APPS = [
  ...
  'django_ajax_comments_xtd',
  'django_comments_xtd',
  'django_comments', 
  ...
]
```

Make sure you follow the exact order of putting these apps together

5. Add this to your url config:

```
urlpatterns = [
  ...
  url(r'^comments/', include('tow.django_ajax_comments_xtd.urls')),
  ...
]
```
Note: You don't need to add urls config provided by django_comments and django_comments_xtd because our app includes them all.

6. Add JS library link to your template:
```
<script src="{% static 'django_ajax_comments_xtd/js/ajax_comments.js' %}"></script>
```

7. In your template use these tags to display a list of comments and the comment form:

```
{% load comments comments_xtd %}
...

<div id="comments">
  {% render_xtdcomment_tree for object %}
  
  {% render_comment_form for object %}
</div>
```

And now you should have ajax comments enabled.
