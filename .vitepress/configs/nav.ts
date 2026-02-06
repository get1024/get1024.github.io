import type { DefaultTheme } from 'vitepress'
export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '文章',
    link: '/docs/index',
  },
  {
    text: '标签',
    link: '/otherDocs/tagCloud'
  },
  {
    text: '关于我',
    link: 'https://github.com/get1024'
  }
]