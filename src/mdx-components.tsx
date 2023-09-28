import type { MDXComponents } from 'mdx/types';

/**
 * https://nextjs.org/docs/app/building-your-application/configuring/mdx#getting-started
 * @param components
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
