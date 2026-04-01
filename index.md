---
layout: default
title: Home
---

<div class="profile-section">
  <div class="profile-text">
    <h1 class="profile-name">{{ site.author }}</h1>
    <h2 class="profile-headline">{{ site.headline }}</h2>
    <p class="profile-bio">{{ site.bio }}</p>
    
    <div class="profile-links">
      {% if site.email %}
        <a href="mailto:{{ site.email }}" target="_blank">Email</a>
      {% endif %}
      {% if site.linkedin %}
        <a href="{{ site.linkedin }}" target="_blank">LinkedIn</a>
      {% endif %}
      {% if site.github %}
        <a href="{{ site.github }}" target="_blank">GitHub</a>
      {% endif %}
      {% if site.scholar and site.scholar != "" %}
        <a href="{{ site.scholar }}" target="_blank">Google Scholar</a>
      {% endif %}
      {% if site.instagram and site.instagram != "" %}
        <a href="{{ site.instagram }}" target="_blank">Instagram</a>
      {% endif %}
    </div>
  </div>
  
  <div class="profile-image-wrapper">
    <img src="{{ site.baseurl }}{{ site.profile_image }}" alt="{{ site.author }}">
  </div>
</div>

{% if site.data.skills %}
<h3>Skills & Tools</h3>
<div class="skills-container">
  {% for skill_group in site.data.skills %}
  <div class="skill-category">
    <div class="skill-title">{{ skill_group.category }}</div>
    <div class="skill-tags">
      {% for item in skill_group.items %}
      <span>{{ item }}</span>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}

{% if site.data.education %}
<h3>Education</h3>
<div class="resume-list">
  {% for edu in site.data.education %}
  <div class="resume-item">
    <div class="resume-header">
      <h4 class="resume-title">{{ edu.degree }}</h4>
      <span class="resume-date">{{ edu.period }}</span>
    </div>
    <div class="resume-subtitle">{{ edu.institution }}</div>
    {% if edu.details %}
    <ul class="resume-details">
      {% for detail in edu.details %}
      <li>{{ detail }}</li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if site.data.experience %}
<h3>Research & Experience</h3>
<div class="resume-list">
  {% for exp in site.data.experience %}
  <div class="resume-item">
    <div class="resume-header">
      <h4 class="resume-title">{{ exp.role }}</h4>
      <span class="resume-date">{{ exp.period }}</span>
    </div>
    <div class="resume-subtitle">{{ exp.organization }}</div>
    {% if exp.details %}
    <ul class="resume-details">
      {% for detail in exp.details %}<li>{{ detail }}</li>{% endfor %}
    </ul>
    {% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if site.data.projects %}
<h3>Projects</h3>
<div class="resume-list">
  {% for proj in site.data.projects %}
  <div class="resume-item">
    <div class="resume-header">
      <h4 class="resume-title">{{ proj.title }}</h4>
      <span class="resume-date">{{ proj.period }}</span>
    </div>
    <div class="resume-subtitle">{{ proj.role }}</div>
    {% if proj.details %}
    <ul class="resume-details">
      {% for detail in proj.details %}<li>{{ detail }}</li>{% endfor %}
    </ul>
    {% endif %}
  </div>
  {% endfor %}
</div>
{% endif %}

{% if site.data.awards %}
<section class="resume-section">
  <h3>Awards & Honors</h3>
  <div class="resume-list">
    {% for award in site.data.awards %}
    <div class="resume-item">
      <div class="resume-header">
        <h4 class="resume-title">{{ award.title }}</h4>
        <span class="resume-date">{{ award.date }}</span>
      </div>
      <div class="resume-subtitle">{{ award.issuer }}</div>
      
      {% if award.details %}
      <ul class="resume-details">
        {% for detail in award.details %}
        <li>{{ detail }}</li>
        {% endfor %}
      </ul>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</section>
{% endif %}

{% if site.data.publications %}
<h3>Publications</h3>
<div class="resume-list">
  {% for pub in site.data.publications %}
  <div class="resume-item">
    <div class="resume-header">
      <h4 class="resume-title">
        {% if pub.url and pub.url != "" %}
          <a href="{{ pub.url }}" target="_blank" rel="noopener noreferrer">{{ pub.title }}</a>
        {% else %}
          {{ pub.title }}
        {% endif %}
      </h4>
      <span class="resume-date">{{ pub.date }}</span>
    </div>
    
    <div class="resume-subtitle">
      {% assign bold_name = "<strong>" | append: site.author | append: "</strong>" %}
      {{ pub.authors | replace: site.author, bold_name }}
    </div>
    
    <div class="resume-details" style="list-style: none; padding-left: 0; font-style: italic; color: var(--muted-color); font-size: 0.9rem;">
      {{ pub.venue }}
      
      {% if pub.status %}
        &middot;
        <span style="font-weight: 600; font-style: normal;"> 
          {{ pub.status }}
        </span>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>

<p class="pub-footnote">
  <span>&dagger; Equal contribution</span>
  <span>&nbsp;&middot;&nbsp;* Corresponding author</span>
  <span>&nbsp;&middot;&nbsp;<u>Underline</u> indicates presenter</span>
</p>
{% endif %}
