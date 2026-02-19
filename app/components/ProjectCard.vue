<!--
  ProjectCard
  A single GitHub repository card showing name, badge, description,
  language, stars, and forks — matching the GitHub-style card layout.
-->
<template>
  <a
    :href="repo.url"
    class="project-card"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`View ${repo.name} on GitHub`"
  >
    <!-- Top row: icon + name + public badge -->
    <div class="project-card__head">
      <IconRepo class="project-card__icon" />
      <span class="project-card__name">{{ repo.name }}</span>
      <span class="project-card__badge">Public</span>
    </div>

    <!-- Description (2 line clamp) -->
    <p class="project-card__desc">{{ repo.description }}</p>

    <!-- Bottom row: language dot + stars + forks -->
    <div class="project-card__meta">
      <!-- Language indicator -->
      <span v-if="repo.language" class="project-card__lang">
        <span class="project-card__dot" :style="{ backgroundColor: langColor(repo.language) }" />
        {{ repo.language }}
      </span>

      <!-- Stars -->
      <span v-if="repo.stars > 0" class="project-card__stat">
        <IconStar />
        {{ repo.stars }}
      </span>

      <!-- Forks -->
      <span v-if="repo.forks > 0" class="project-card__stat">
        <IconFork />
        {{ repo.forks }}
      </span>
    </div>
  </a>
</template>

<script setup>
  import IconRepo from '~/components/icons/IconRepo.vue';
  import IconStar from '~/components/icons/IconStar.vue';
  import IconFork from '~/components/icons/IconFork.vue';

  defineProps({
    /** Repository object from useGithubRepos composable */
    repo: {
      type: Object,
      required: true,
    },
  });

  /**
   * Returns a hex color for a given programming language.
   * Covers the most popular languages on GitHub.
   */
  function langColor(lang) {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Shell: '#89e051',
      Vue: '#41b883',
      Rust: '#dea584',
      Go: '#00ADD8',
      Java: '#b07219',
      Ruby: '#701516',
      PHP: '#4F5D95',
      MDX: '#fcb32c',
      'C++': '#f34b7d',
      C: '#555555',
      Dart: '#00B4AB',
      Swift: '#F05138',
      Kotlin: '#A97BFF',
    };
    return colors[lang] || '#888888';
  }
</script>

<style lang="scss" scoped>
  .project-card {
    @include card;
    display: flex;
    flex-direction: column;
    gap: $space-3;
    padding: $space-5;
    @include transition(border-color);
    text-decoration: none;
    color: inherit;

    &:hover {
      border-color: $color-muted;
      color: inherit;
    }
  }

  /* ── Head row ──────────────────────────────────────── */
  .project-card__head {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  .project-card__icon {
    width: 16px;
    height: 16px;
    color: $color-muted;
    flex-shrink: 0;
  }

  .project-card__name {
    font-family: $font-heading;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $color-accent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project-card__badge {
    font-family: $font-mono;
    font-size: 0.6875rem;
    color: $color-muted;
    border: 1px solid $color-border;
    border-radius: 999px;
    padding: 1px 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* ── Description ───────────────────────────────────── */
  .project-card__desc {
    font-size: 0.8125rem;
    color: $color-muted;
    line-height: 1.5;
    @include line-clamp(2);
    flex: 1;
  }

  /* ── Bottom meta ───────────────────────────────────── */
  .project-card__meta {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-top: auto;
  }

  .project-card__lang {
    display: inline-flex;
    align-items: center;
    gap: $space-1;
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $color-muted;
  }

  .project-card__dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .project-card__stat {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $color-muted;

    svg {
      width: 14px;
      height: 14px;
    }
  }
</style>
