/**
 * AppHeader — Component Tests
 *
 * Mounts AppHeader with mountSuspended and validates the
 * rendered name, social links, and bio paragraph.
 *
 * @see ~/components/AppHeader.vue
 */
import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppHeader from '~/components/AppHeader.vue';

describe('AppHeader', () => {
  /* ── Renders the name heading ──────────────────────── */
  it('renders "nayan das" as the heading', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('nayan das');
  });

  /* ── Renders all 4 social links ────────────────────── */
  it('renders exactly 4 social links', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const links = wrapper.findAll('nav a');
    expect(links.length).toBe(4);
  });

  /* ── Social link labels ────────────────────────────── */
  it('renders correct social link labels', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const links = wrapper.findAll('nav a');
    const labels = links.map((link) => link.text());

    expect(labels).toContain('github');
    expect(labels).toContain('x');
    expect(labels).toContain('discord');
    expect(labels).toContain('email');
  });

  /* ── Social link hrefs ─────────────────────────────── */
  it('has correct href for each social link', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const links = wrapper.findAll('nav a');
    const hrefs = links.map((link) => link.attributes('href'));

    expect(hrefs).toContain('https://github.com/nayandas69');
    expect(hrefs).toContain('https://x.com/nayandas69');
    expect(hrefs).toContain('https://discord.gg/u9XfHZN8K9');
    expect(hrefs).toContain('mailto:nayanchandradas@hotmail.com');
  });

  /* ── Social links open in new tab ──────────────────── */
  it('opens social links in new tab with noopener noreferrer', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const links = wrapper.findAll('nav a');

    links.forEach((link) => {
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('rel')).toBe('noopener noreferrer');
    });
  });

  /* ── Social links have aria-labels ─────────────────── */
  it('each social link has an aria-label for accessibility', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const links = wrapper.findAll('nav a');

    links.forEach((link) => {
      const ariaLabel = link.attributes('aria-label');
      expect(ariaLabel).toBeTruthy();
    });
  });

  /* ── Renders the bio paragraph ─────────────────────── */
  it('renders the bio paragraph text', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const bio = wrapper.find('.header__bio');
    expect(bio.exists()).toBe(true);
    expect(bio.text()).toContain('developer and creator');
  });

  /* ── Nav has correct aria-label ────────────────────── */
  it('nav element has aria-label "Social links"', async () => {
    const wrapper = await mountSuspended(AppHeader);

    const nav = wrapper.find('nav');
    expect(nav.attributes('aria-label')).toBe('Social links');
  });
});
