# NOTE: This code is alpha. The work is in progress

# django-ajax-comments-xtd
An addon app to https://github.com/danirus/django-comments-xtd that makes comments submittable via ajax

# Installation

1. Install from PYPI:

```pip install django-ajax-comments-xtd```

2. Add the app and its dependencies to INSTALLED_APPS in settings.py:
```
INSTALLED_APPS = [
  ...
  'django_ajax_comments_xtd',
  'django_comments_xtd',
  'django_comments', 
  ...
]
```

3. Add COMMENTS_APP to your settings.py:

```
COMMENTS_APP = 'django_comments_xtd'
```

Make sure you follow the exact order of putting these apps together

4. Add this to your url config:

```
urlpatterns = [
  ...
  url(r'^comments/', include('django_ajax_comments_xtd.urls')),
  ...
]
```
Note: You don't need to add urls config provided by django_comments and django_comments_xtd because our app includes them all.

5. Run migrations to create necessary database tables:

```
python manage.py migrate
```

6. Add JS library link to your template:
```
<script src="{% static 'django_ajax_comments_xtd/js/ajax_comments.js' %}"></script>
```

7. In templates use these tags to display a list of comments and the comment form:

```
{% load comments comments_xtd %}
...

<div id="comments">
  {% render_xtdcomment_tree for object %}
  
  {% render_comment_form for object %}
</div>
```

And now you should have ajax comments enabled.
