<h2>我赞过的文章<h2>
<ul class="news-view view">
{% for item in articleList %}
<li class="item">
  <a href="{{ item.url }}">
    {{ item.title }}
   </a>
</li>
{% endfor %}
</ul>
