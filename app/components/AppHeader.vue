<!--
  AppHeader
  Displays the name, tagline, and social navigation links.
  Social icons use clean SF-style SVGs (thin strokes, rounded).
-->
<template>
  <header class="header fade-up">
    <!-- Name -->
    <h1 class="header__name">RDX</h1>

    <!-- Social links row -->
    <nav class="header__nav" aria-label="Social links">
      <a
        v-for="link in socials"
        :key="link.label"
        :href="link.url"
        :aria-label="link.label"
        class="header__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <!-- Inline SVG icons (iOS SF-style: 1.5px stroke, round caps) -->
        <component :is="link.icon" />
        <span>{{ link.label }}</span>
      </a>
    </nav>

    <!-- Bio -->
    <!-- Short bio paragraph about who I am and what I do. Soon I add here full details for my job and company I joined -->
    <p class="header__bio">
      I am RDX, a content creator who makes insightful videos about programming and software development. I build open-source tools and write about code. I am passionate about sharing knowledge and helping others learn and grow in their coding journey.
    </p>
  </header>
</template>

<script setup>
  import IconGithub from '~/components/icons/IconGithub.vue';
  import IconX from '~/components/icons/IconX.vue';
  import IconDiscord from '~/components/icons/IconDiscord.vue';
  import IconMail from '~/components/icons/IconMail.vue';

  /**
   * Social link definitions — each with label, url, and icon component.
   */
  const socials = [
    {
      label: 'github',
      url: 'https://github.com/rdxtoyz',
      icon: IconGithub,
    },
    {
      label: 'email',
      url: 'mailto:rdxtoyz@proton.me',
      icon: IconMail,
    },
  ];
</script>

<style lang="scss" scoped>
  .header {
    padding-bottom: $space-8;
    border-bottom: 1px solid $color-border;
    margin-bottom: $space-8;
  }

  /* ── Name ──────────────────────────────────────────── */
  .header__name {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: $space-5;
    color: $color-text;

    @include md {
      font-size: 2.5rem;
    }
  }

  /* ── Social nav ────────────────────────────────────── */
  .header__nav {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    margin-bottom: $space-6;
  }

  .header__link {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-mono;
    font-size: 0.8125rem;
    color: $color-muted;
    @include transition(color);

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &:hover {
      color: $color-text;
    }
  }

  /* ── Bio paragraph ────────────────────────────────── */
  .header__bio {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: $color-muted;
    max-width: 560px;
  }
</style>
