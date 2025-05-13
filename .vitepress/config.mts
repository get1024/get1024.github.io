import { defineConfig, type DefaultTheme } from "vitepress";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import { nav } from "./configs";
import { calculateSidebar as originalCalculateSidebar } from "@ryanjoy/vitepress-plugin-sidebar";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";
import {  groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "vitepress-plugin-group-icons";
import footnote_plugin from "markdown-it-footnote";
import task_checkbox_plugin from "markdown-it-task-checkbox";
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'

// ==========================
// 配置函数
// ==========================

// 自定义侧边栏配置：默认展开所有项
function calculateSidebarWithDefaultOpen(targets:any, base:any) { 
  const result = originalCalculateSidebar(targets, base); 
  if (Array.isArray(result)) { 
    result.forEach((item: any) => { 
      item.collapsed = false;  
    }); 
  } else { 
    Object.values(result).forEach((items: any[]) => { 
      items.forEach((item: any) => { 
        item.collapsed = false;  
      }); 
    }); 
  } 
  return result; 
} 


// 优化中文搜索：通过分词优化搜索表现
function chineseSearchOptimize(input: string) {
  const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
  const result: string[] = [];
  for (const it of segmenter.segment(input)) {
    if (it.isWordLike) {
      result.push(it.segment);
    }
  }
  return result.join(" ");
}

// ==========================
// VitePress 配置
// ==========================
export default defineConfig({
  lang: "zh-CN",
  title: "RyanJoy的博客",
  description: "RyanJoy的博客",
  lastUpdated: true,
  appearance: true,

  //站点地图
  sitemap: {
    hostname: "https://blog.ryanjoy.top/",
  },

  // 页面头部配置：favicon 和额外的脚本
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["script", { src: "/vercel-analytics.js" }]
  ],

  // Vite 配置
  vite: {
    plugins: [
      // Git changelog 插件
      GitChangelog({
        repoURL: () => "https://github.com/get1024/get1024.github.io",
        mapAuthors: [
          {
            name: "RyanJoy",
            username: "get1024",
            mapByNameAliases: ["RJY", "RyanJoy"],
            mapByEmailAliases: [
              "ryanjoy2002@gmail.com",
              "ryanjoy2002@163.com",
            ],
            avatar:
              "/avatar.png",
            links: "https://github.com/get1024",
          },
        ],
      }),
      GitChangelogMarkdownSection(),

      // 搜索插件配置
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: "搜索",
        placeholder: "搜索文档",
        emptyText: "空空如也",
        heading: "共: {{searchResult}} 条结果",
        excludeSelector: ["img", "a.header-anchor"],
        filter(searchItem, idx, originArray) {
          console.log(searchItem);
          return !searchItem.route.includes("404");
        },
      }),

      // 代码组图标插件
      groupIconVitePlugin({
        customIcon: {
          pip: "vscode-icons:file-type-pip",
          docker: "vscode-icons:file-type-docker2",
          ".mts":"vscode-icons:file-type-typescript",
          ".cpp": "vscode-icons:file-type-cpp",
          git: "vscode-icons:file-type-git",
          powershell: "vscode-icons:file-type-powershell",
          shell: "vscode-icons:file-type-shell",
          'ryanjoy': localIconLoader(import.meta.url, '../public/RyanJoy.svg'),
          'babel': 'vscode-icons:file-type-babel',
          '.mdx': 'vscode-icons:file-type-light-mdx',
          'unplugin': 'https://unplugin.unjs.io/logo_light.svg',
          sql: "vscode-icons:file-type-mysql",
        },
      }),

      // Vercel Analytics 插件
      {
        name: "vercel-analytics-plugin",
        transformIndexHtml: {
          order: "pre",
          handler(html) {
            return html.replace(
              "</body>",
              `<script>
                window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
              </script>
              </body>`,
            )
          },
        },
      },
    ],
    optimizeDeps: {
      include: [],
      exclude: [],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
      ],
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**']
      }
    }
  },

  // 主题配置
  themeConfig: {
    logo: "/logo.png",

    nav,

    editLink: {
      pattern: "https://github.com/get1024/get1024.github.io/edit/main/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "见贤思齐",
      copyright: `Copyright © 2022.10~${new Date().getFullYear()}\.${String(new Date().getMonth() + 1).padStart(2, '0')}\.${new Date().getDate()}&nbsp;&nbsp;<a href="https://github.com/get1024">👨🏼‍💻RyanJoy</a>`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "📑本页大纲",
      level: "deep",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/get1024/get1024.github.io",
      },
    ],

    search: {
      provider: "local",
    },
    //侧边栏自动配置
    sidebar: calculateSidebarWithDefaultOpen(
      [
        { folderName: "📒文章", separate: true },
        // { folderName: "📆日记", separate: true }
      ],
      ""
    ),
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },

    config: (md) => {
      // 添加自定义渲染规则
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };

      // 使用插件

      //代码组图标
      md.use(groupIconMdPlugin);
      //obsidian双链插件
      md.use(BiDirectionalLinks());
      md.use(footnote_plugin);
      md.use(task_checkbox_plugin, {
        disabled: true,
        divWrap: false,
        divClass: "checkbox",
        idPrefix: "cbx_",
        ulClass: "task-list",
        liClass: "task-list-item",
      });

      // 保存原有的table渲染器
      const defaultRender =
        md.renderer.rules.table_open ||
        ((tokens, idx) => {
          return "<table>";
        });

      // 自定义table渲染
      md.renderer.rules.table_open = (tokens, idx) => {
        // 获取用户自定义的类名
        const className = "custom-table-container";
        return `<div class="${className}"><table>`;
      };

      // 确保table结束标签后，div标签正确关闭
      const defaultTableClose =
        md.renderer.rules.table_close ||
        ((tokens, idx, options, env, self) => {
          return "</table>";
        });

      md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
        return `${defaultTableClose(tokens, idx, options, env, self)}</div>`;
      };

    },
    codeTransformers: [
    ]
  },
});
