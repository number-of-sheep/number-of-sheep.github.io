---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog-page-container">
  <header class="page-header">
    <h1 class="page-title">Blog</h1>
    <p class="page-subtitle">To be updated. On testing the blog layout and formatting.</p>
  </header>

  <div class="blog-post-list">
    {% for post in site.posts %}
    <article class="blog-post-item">
      <h4 class="blog-post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h4>

      <div class="blog-post-meta">
        <span class="blog-post-date">{{ post.date | date: "%B %d, %Y" }}</span>
        {% if post.categories.size > 0 %}
          <span class="meta-divider">&nbsp;&middot;&nbsp;</span>
          <span class="post-category-tag">{{ post.categories | first }}</span>
        {% endif %}
      </div>

      <p class="blog-post-excerpt">
        {{ post.excerpt | strip_html | truncate: 160 }}
      </p>
    </article>
    {% endfor %}
  </div>
</div>