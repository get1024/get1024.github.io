// .vitepress/config.mts
import { defineConfig } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_726b49b439671d29c32d14730d866b12/node_modules/vitepress/dist/node/index.js";
import { pagefindPlugin } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/vitepress-plugin-pagefind@0_e825088525c5b6cc47499cda9d2d974b/node_modules/vitepress-plugin-pagefind/dist/index.mjs";
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/@nolebase+vitepress-plugin-_ec952195a30c578ea983f424ba4fb903/node_modules/@nolebase/vitepress-plugin-git-changelog/dist/vite/index.mjs";

// .vitepress/configs/nav.ts
var nav = [
  {
    text: "\u{1F4D2}\u6587\u7AE0",
    link: "/\u{1F4D2}\u6587\u7AE0/index"
  },
  {
    text: "\u{1F4C6}\u65E5\u8BB0",
    link: "/\u{1F4C6}\u65E5\u8BB0/index"
  },
  {
    text: "\u{1F468}\u200D\u{1F393}\u5173\u4E8E\u6211",
    link: "/otherDocs/\u5173\u4E8E\u6211"
  },
  {
    text: "\u{1F3F7}\uFE0F\u6807\u7B7E",
    link: "/otherDocs/tagCloud"
  }
];

// .vitepress/config.mts
import { calculateSidebar as originalCalculateSidebar } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/@ryanjoy+vitepress-plugin-sidebar@1.0.2/node_modules/@ryanjoy/vitepress-plugin-sidebar/dist/index.mjs";
import { BiDirectionalLinks } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/@nolebase+markdown-it-bi-di_5acb8465a2aef0db2314792c78bf5087/node_modules/@nolebase/markdown-it-bi-directional-links/dist/index.mjs";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/vitepress-plugin-group-icons@1.5.1/node_modules/vitepress-plugin-group-icons/dist/index.mjs";
import footnote_plugin from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/markdown-it-footnote@4.0.0/node_modules/markdown-it-footnote/index.mjs";
import task_checkbox_plugin from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/markdown-it-task-checkbox@1.0.6/node_modules/markdown-it-task-checkbox/index.js";
import { transformerTwoslash } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/@shikijs+vitepress-twoslash@2.5.0_typescript@5.8.3/node_modules/@shikijs/vitepress-twoslash/dist/index.mjs";
import { createFileSystemTypesCache } from "file:///C:/AAA-personalData/project/Github/get1024.github.io/node_modules/.pnpm/@shikijs+vitepress-twoslash@2.5.0_typescript@5.8.3/node_modules/@shikijs/vitepress-twoslash/dist/cache-fs.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/AAA-personalData/project/Github/get1024.github.io/.vitepress/config.mts";
function calculateSidebarWithDefaultOpen(targets, base) {
  const result = originalCalculateSidebar(targets, base);
  if (Array.isArray(result)) {
    result.forEach((item) => {
      item.collapsed = false;
    });
  } else {
    Object.values(result).forEach((items) => {
      items.forEach((item) => {
        item.collapsed = false;
      });
    });
  }
  return result;
}
function chineseSearchOptimize(input) {
  const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
  const result = [];
  for (const it of segmenter.segment(input)) {
    if (it.isWordLike) {
      result.push(it.segment);
    }
  }
  return result.join(" ");
}
var config_default = defineConfig({
  lang: "zh-CN",
  title: "RyanJoy\u7684\u535A\u5BA2",
  description: "RyanJoy\u7684\u535A\u5BA2",
  lastUpdated: true,
  appearance: true,
  //站点地图
  sitemap: {
    hostname: "https://blog.ryanjoy.top/"
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
              "ryanjoy2002@163.com"
            ],
            avatar: "/avatar.png",
            links: "https://github.com/get1024"
          }
        ]
      }),
      GitChangelogMarkdownSection(),
      // 搜索插件配置
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: "\u641C\u7D22",
        placeholder: "\u641C\u7D22\u6587\u6863",
        emptyText: "\u7A7A\u7A7A\u5982\u4E5F",
        heading: "\u5171: {{searchResult}} \u6761\u7ED3\u679C",
        excludeSelector: ["img", "a.header-anchor"],
        filter(searchItem, idx, originArray) {
          console.log(searchItem);
          return !searchItem.route.includes("404");
        }
      }),
      // 代码组图标插件
      groupIconVitePlugin({
        customIcon: {
          pip: "vscode-icons:file-type-pip",
          docker: "vscode-icons:file-type-docker2",
          ".mts": "vscode-icons:file-type-typescript",
          ".cpp": "vscode-icons:file-type-cpp",
          git: "vscode-icons:file-type-git",
          powershell: "vscode-icons:file-type-powershell",
          shell: "vscode-icons:file-type-shell",
          "ryanjoy": localIconLoader(__vite_injected_original_import_meta_url, "../public/RyanJoy.svg"),
          "babel": "vscode-icons:file-type-babel",
          ".mdx": "vscode-icons:file-type-light-mdx",
          "unplugin": "https://unplugin.unjs.io/logo_light.svg",
          sql: "vscode-icons:file-type-mysql"
        }
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
              </body>`
            );
          }
        }
      }
    ],
    optimizeDeps: {
      include: [],
      exclude: []
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-highlight-targeted-heading"
      ]
    },
    server: {
      watch: {
        ignored: ["**/node_modules/**", "**/dist/**"]
      }
    }
  },
  // 主题配置
  themeConfig: {
    logo: "/logo.png",
    nav,
    editLink: {
      pattern: "https://github.com/get1024/get1024.github.io/edit/main/:path",
      text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875\u9762"
    },
    footer: {
      message: "\u89C1\u8D24\u601D\u9F50",
      copyright: `Copyright \xA9 2022.10~${(/* @__PURE__ */ new Date()).getFullYear()}.${String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0")}.${(/* @__PURE__ */ new Date()).getDate()}&nbsp;&nbsp;<a href="https://github.com/get1024">\u{1F468}\u{1F3FC}\u200D\u{1F4BB}RyanJoy</a>`
    },
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    outline: {
      label: "\u{1F4D1}\u672C\u9875\u5927\u7EB2",
      level: "deep"
    },
    lastUpdated: {
      text: "\u6700\u540E\u66F4\u65B0\u4E8E",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },
    langMenuLabel: "\u591A\u8BED\u8A00",
    returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
    sidebarMenuLabel: "\u83DC\u5355",
    darkModeSwitchLabel: "\u4E3B\u9898",
    lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u6A21\u5F0F",
    darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u6A21\u5F0F",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/get1024/get1024.github.io"
      }
    ],
    search: {
      provider: "local"
    },
    //侧边栏自动配置
    sidebar: calculateSidebarWithDefaultOpen(
      [
        { folderName: "\u{1F4D2}\u6587\u7AE0", separate: true }
        // { folderName: "📆日记", separate: true }
      ],
      ""
    )
  },
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
      md.use(groupIconMdPlugin);
      md.use(BiDirectionalLinks());
      md.use(footnote_plugin);
      md.use(task_checkbox_plugin, {
        disabled: true,
        divWrap: false,
        divClass: "checkbox",
        idPrefix: "cbx_",
        ulClass: "task-list",
        liClass: "task-list-item"
      });
      const defaultRender = md.renderer.rules.table_open || ((tokens, idx) => {
        return "<table>";
      });
      md.renderer.rules.table_open = (tokens, idx) => {
        const className = "custom-table-container";
        return `<div class="${className}"><table>`;
      };
      const defaultTableClose = md.renderer.rules.table_close || ((tokens, idx, options, env, self) => {
        return "</table>";
      });
      md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
        return `${defaultTableClose(tokens, idx, options, env, self)}</div>`;
      };
    },
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache()
      })
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIi52aXRlcHJlc3MvY29uZmlncy9uYXYudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxBQUEtcGVyc29uYWxEYXRhXFxcXHByb2plY3RcXFxcR2l0aHViXFxcXGdldDEwMjQuZ2l0aHViLmlvXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXEFBQS1wZXJzb25hbERhdGFcXFxccHJvamVjdFxcXFxHaXRodWJcXFxcZ2V0MTAyNC5naXRodWIuaW9cXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9BQUEtcGVyc29uYWxEYXRhL3Byb2plY3QvR2l0aHViL2dldDEwMjQuZ2l0aHViLmlvLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBEZWZhdWx0VGhlbWUgfSBmcm9tIFwidml0ZXByZXNzXCI7XHJcbmltcG9ydCB7IHBhZ2VmaW5kUGx1Z2luIH0gZnJvbSBcInZpdGVwcmVzcy1wbHVnaW4tcGFnZWZpbmRcIjtcclxuaW1wb3J0IHtcclxuICBHaXRDaGFuZ2Vsb2csXHJcbiAgR2l0Q2hhbmdlbG9nTWFya2Rvd25TZWN0aW9uLFxyXG59IGZyb20gXCJAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1naXQtY2hhbmdlbG9nL3ZpdGVcIjtcclxuaW1wb3J0IHsgbmF2IH0gZnJvbSBcIi4vY29uZmlnc1wiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTaWRlYmFyIGFzIG9yaWdpbmFsQ2FsY3VsYXRlU2lkZWJhciB9IGZyb20gXCJAcnlhbmpveS92aXRlcHJlc3MtcGx1Z2luLXNpZGViYXJcIjtcclxuaW1wb3J0IHsgQmlEaXJlY3Rpb25hbExpbmtzIH0gZnJvbSBcIkBub2xlYmFzZS9tYXJrZG93bi1pdC1iaS1kaXJlY3Rpb25hbC1saW5rc1wiO1xyXG5pbXBvcnQgeyAgZ3JvdXBJY29uTWRQbHVnaW4sIGdyb3VwSWNvblZpdGVQbHVnaW4sIGxvY2FsSWNvbkxvYWRlciB9IGZyb20gXCJ2aXRlcHJlc3MtcGx1Z2luLWdyb3VwLWljb25zXCI7XHJcbmltcG9ydCBmb290bm90ZV9wbHVnaW4gZnJvbSBcIm1hcmtkb3duLWl0LWZvb3Rub3RlXCI7XHJcbmltcG9ydCB0YXNrX2NoZWNrYm94X3BsdWdpbiBmcm9tIFwibWFya2Rvd24taXQtdGFzay1jaGVja2JveFwiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm1lclR3b3NsYXNoIH0gZnJvbSAnQHNoaWtpanMvdml0ZXByZXNzLXR3b3NsYXNoJ1xyXG5pbXBvcnQgeyBjcmVhdGVGaWxlU3lzdGVtVHlwZXNDYWNoZSB9IGZyb20gJ0BzaGlraWpzL3ZpdGVwcmVzcy10d29zbGFzaC9jYWNoZS1mcydcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFx1OTE0RFx1N0Y2RVx1NTFGRFx1NjU3MFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU0RkE3XHU4RkI5XHU2ODBGXHU5MTREXHU3RjZFXHVGRjFBXHU5RUQ4XHU4QkE0XHU1QzU1XHU1RjAwXHU2MjQwXHU2NzA5XHU5ODc5XHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpZGViYXJXaXRoRGVmYXVsdE9wZW4odGFyZ2V0czphbnksIGJhc2U6YW55KSB7IFxyXG4gIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsY3VsYXRlU2lkZWJhcih0YXJnZXRzLCBiYXNlKTsgXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSkgeyBcclxuICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHsgXHJcbiAgICAgIGl0ZW0uY29sbGFwc2VkID0gZmFsc2U7ICBcclxuICAgIH0pOyBcclxuICB9IGVsc2UgeyBcclxuICAgIE9iamVjdC52YWx1ZXMocmVzdWx0KS5mb3JFYWNoKChpdGVtczogYW55W10pID0+IHsgXHJcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4geyBcclxuICAgICAgICBpdGVtLmNvbGxhcHNlZCA9IGZhbHNlOyAgXHJcbiAgICAgIH0pOyBcclxuICAgIH0pOyBcclxuICB9IFxyXG4gIHJldHVybiByZXN1bHQ7IFxyXG59IFxyXG5cclxuXHJcbi8vIFx1NEYxOFx1NTMxNlx1NEUyRFx1NjU4N1x1NjQxQ1x1N0QyMlx1RkYxQVx1OTAxQVx1OEZDN1x1NTIwNlx1OEJDRFx1NEYxOFx1NTMxNlx1NjQxQ1x1N0QyMlx1ODg2OFx1NzNCMFxyXG5mdW5jdGlvbiBjaGluZXNlU2VhcmNoT3B0aW1pemUoaW5wdXQ6IHN0cmluZykge1xyXG4gIGNvbnN0IHNlZ21lbnRlciA9IG5ldyBJbnRsLlNlZ21lbnRlcihcInpoLUNOXCIsIHsgZ3JhbnVsYXJpdHk6IFwid29yZFwiIH0pO1xyXG4gIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcclxuICBmb3IgKGNvbnN0IGl0IG9mIHNlZ21lbnRlci5zZWdtZW50KGlucHV0KSkge1xyXG4gICAgaWYgKGl0LmlzV29yZExpa2UpIHtcclxuICAgICAgcmVzdWx0LnB1c2goaXQuc2VnbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQuam9pbihcIiBcIik7XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFZpdGVQcmVzcyBcdTkxNERcdTdGNkVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBsYW5nOiBcInpoLUNOXCIsXHJcbiAgdGl0bGU6IFwiUnlhbkpveVx1NzY4NFx1NTM1QVx1NUJBMlwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcIlJ5YW5Kb3lcdTc2ODRcdTUzNUFcdTVCQTJcIixcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBhcHBlYXJhbmNlOiB0cnVlLFxyXG5cclxuICAvL1x1N0FEOVx1NzBCOVx1NTczMFx1NTZGRVxyXG4gIHNpdGVtYXA6IHtcclxuICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vYmxvZy5yeWFuam95LnRvcC9cIixcclxuICB9LFxyXG5cclxuICAvLyBcdTk4NzVcdTk3NjJcdTU5MzRcdTkwRThcdTkxNERcdTdGNkVcdUZGMUFmYXZpY29uIFx1NTQ4Q1x1OTg5RFx1NTkxNlx1NzY4NFx1ODExQVx1NjcyQ1xyXG4gIGhlYWQ6IFtcclxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwiaWNvblwiLCBocmVmOiBcIi9sb2dvLnBuZ1wiIH1dLFxyXG4gICAgW1wic2NyaXB0XCIsIHsgc3JjOiBcIi92ZXJjZWwtYW5hbHl0aWNzLmpzXCIgfV1cclxuICBdLFxyXG5cclxuICAvLyBWaXRlIFx1OTE0RFx1N0Y2RVxyXG4gIHZpdGU6IHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgLy8gR2l0IGNoYW5nZWxvZyBcdTYzRDJcdTRFRjZcclxuICAgICAgR2l0Q2hhbmdlbG9nKHtcclxuICAgICAgICByZXBvVVJMOiAoKSA9PiBcImh0dHBzOi8vZ2l0aHViLmNvbS9nZXQxMDI0L2dldDEwMjQuZ2l0aHViLmlvXCIsXHJcbiAgICAgICAgbWFwQXV0aG9yczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJ5YW5Kb3lcIixcclxuICAgICAgICAgICAgdXNlcm5hbWU6IFwiZ2V0MTAyNFwiLFxyXG4gICAgICAgICAgICBtYXBCeU5hbWVBbGlhc2VzOiBbXCJSSllcIiwgXCJSeWFuSm95XCJdLFxyXG4gICAgICAgICAgICBtYXBCeUVtYWlsQWxpYXNlczogW1xyXG4gICAgICAgICAgICAgIFwicnlhbmpveTIwMDJAZ21haWwuY29tXCIsXHJcbiAgICAgICAgICAgICAgXCJyeWFuam95MjAwMkAxNjMuY29tXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGF2YXRhcjpcclxuICAgICAgICAgICAgICBcIi9hdmF0YXIucG5nXCIsXHJcbiAgICAgICAgICAgIGxpbmtzOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9nZXQxMDI0XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBHaXRDaGFuZ2Vsb2dNYXJrZG93blNlY3Rpb24oKSxcclxuXHJcbiAgICAgIC8vIFx1NjQxQ1x1N0QyMlx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVxyXG4gICAgICBwYWdlZmluZFBsdWdpbih7XHJcbiAgICAgICAgY3VzdG9tU2VhcmNoUXVlcnk6IGNoaW5lc2VTZWFyY2hPcHRpbWl6ZSxcclxuICAgICAgICBidG5QbGFjZWhvbGRlcjogXCJcdTY0MUNcdTdEMjJcIixcclxuICAgICAgICBwbGFjZWhvbGRlcjogXCJcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjNcIixcclxuICAgICAgICBlbXB0eVRleHQ6IFwiXHU3QTdBXHU3QTdBXHU1OTgyXHU0RTVGXCIsXHJcbiAgICAgICAgaGVhZGluZzogXCJcdTUxNzE6IHt7c2VhcmNoUmVzdWx0fX0gXHU2NzYxXHU3RUQzXHU2NzlDXCIsXHJcbiAgICAgICAgZXhjbHVkZVNlbGVjdG9yOiBbXCJpbWdcIiwgXCJhLmhlYWRlci1hbmNob3JcIl0sXHJcbiAgICAgICAgZmlsdGVyKHNlYXJjaEl0ZW0sIGlkeCwgb3JpZ2luQXJyYXkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHNlYXJjaEl0ZW0pO1xyXG4gICAgICAgICAgcmV0dXJuICFzZWFyY2hJdGVtLnJvdXRlLmluY2x1ZGVzKFwiNDA0XCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgLy8gXHU0RUUzXHU3ODAxXHU3RUM0XHU1NkZFXHU2ODA3XHU2M0QyXHU0RUY2XHJcbiAgICAgIGdyb3VwSWNvblZpdGVQbHVnaW4oe1xyXG4gICAgICAgIGN1c3RvbUljb246IHtcclxuICAgICAgICAgIHBpcDogXCJ2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLXBpcFwiLFxyXG4gICAgICAgICAgZG9ja2VyOiBcInZzY29kZS1pY29uczpmaWxlLXR5cGUtZG9ja2VyMlwiLFxyXG4gICAgICAgICAgXCIubXRzXCI6XCJ2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLXR5cGVzY3JpcHRcIixcclxuICAgICAgICAgIFwiLmNwcFwiOiBcInZzY29kZS1pY29uczpmaWxlLXR5cGUtY3BwXCIsXHJcbiAgICAgICAgICBnaXQ6IFwidnNjb2RlLWljb25zOmZpbGUtdHlwZS1naXRcIixcclxuICAgICAgICAgIHBvd2Vyc2hlbGw6IFwidnNjb2RlLWljb25zOmZpbGUtdHlwZS1wb3dlcnNoZWxsXCIsXHJcbiAgICAgICAgICBzaGVsbDogXCJ2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLXNoZWxsXCIsXHJcbiAgICAgICAgICAncnlhbmpveSc6IGxvY2FsSWNvbkxvYWRlcihpbXBvcnQubWV0YS51cmwsICcuLi9wdWJsaWMvUnlhbkpveS5zdmcnKSxcclxuICAgICAgICAgICdiYWJlbCc6ICd2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLWJhYmVsJyxcclxuICAgICAgICAgICcubWR4JzogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtbGlnaHQtbWR4JyxcclxuICAgICAgICAgICd1bnBsdWdpbic6ICdodHRwczovL3VucGx1Z2luLnVuanMuaW8vbG9nb19saWdodC5zdmcnLFxyXG4gICAgICAgICAgc3FsOiBcInZzY29kZS1pY29uczpmaWxlLXR5cGUtbXlzcWxcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIC8vIFZlcmNlbCBBbmFseXRpY3MgXHU2M0QyXHU0RUY2XHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcInZlcmNlbC1hbmFseXRpY3MtcGx1Z2luXCIsXHJcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XHJcbiAgICAgICAgICBvcmRlcjogXCJwcmVcIixcclxuICAgICAgICAgIGhhbmRsZXIoaHRtbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgIFwiPC9ib2R5PlwiLFxyXG4gICAgICAgICAgICAgIGA8c2NyaXB0PlxyXG4gICAgICAgICAgICAgICAgd2luZG93LnZhID0gd2luZG93LnZhIHx8IGZ1bmN0aW9uICgpIHsgKHdpbmRvdy52YXEgPSB3aW5kb3cudmFxIHx8IFtdKS5wdXNoKGFyZ3VtZW50cyk7IH07XHJcbiAgICAgICAgICAgICAgPC9zY3JpcHQ+XHJcbiAgICAgICAgICAgICAgPC9ib2R5PmAsXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogW10sXHJcbiAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgfSxcclxuICAgIHNzcjoge1xyXG4gICAgICBub0V4dGVybmFsOiBbXHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU4RkQ4XHU2NzA5XHU1MjJCXHU3Njg0XHU0RjlEXHU4RDU2XHU5NzAwXHU4OTgxXHU2REZCXHU1MkEwXHU3Njg0XHU4QkREXHVGRjBDXHU1RTc2XHU2MzkyXHU1ODZCXHU1MTk5XHU1NDhDXHU5MTREXHU3RjZFXHU1MjMwXHU4RkQ5XHU5MUNDXHU1MzczXHU1M0VGXHJcbiAgICAgICAgXCJAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1oaWdobGlnaHQtdGFyZ2V0ZWQtaGVhZGluZ1wiLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICAgIGlnbm9yZWQ6IFsnKiovbm9kZV9tb2R1bGVzLyoqJywgJyoqL2Rpc3QvKionXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gXHU0RTNCXHU5ODk4XHU5MTREXHU3RjZFXHJcbiAgdGhlbWVDb25maWc6IHtcclxuICAgIGxvZ286IFwiL2xvZ28ucG5nXCIsXHJcblxyXG4gICAgbmF2LFxyXG5cclxuICAgIGVkaXRMaW5rOiB7XHJcbiAgICAgIHBhdHRlcm46IFwiaHR0cHM6Ly9naXRodWIuY29tL2dldDEwMjQvZ2V0MTAyNC5naXRodWIuaW8vZWRpdC9tYWluLzpwYXRoXCIsXHJcbiAgICAgIHRleHQ6IFwiXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcdTk3NjJcIixcclxuICAgIH0sXHJcblxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgIG1lc3NhZ2U6IFwiXHU4OUMxXHU4RDI0XHU2MDFEXHU5RjUwXCIsXHJcbiAgICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkgMjAyMi4xMH4ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1cXC4ke1N0cmluZyhuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpfVxcLiR7bmV3IERhdGUoKS5nZXREYXRlKCl9Jm5ic3A7Jm5ic3A7PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9nZXQxMDI0XCI+XHVEODNEXHVEQzY4XHVEODNDXHVERkZDXHUyMDBEXHVEODNEXHVEQ0JCUnlhbkpveTwvYT5gLFxyXG4gICAgfSxcclxuXHJcbiAgICBkb2NGb290ZXI6IHtcclxuICAgICAgcHJldjogXCJcdTRFMEFcdTRFMDBcdTk4NzVcIixcclxuICAgICAgbmV4dDogXCJcdTRFMEJcdTRFMDBcdTk4NzVcIixcclxuICAgIH0sXHJcblxyXG4gICAgb3V0bGluZToge1xyXG4gICAgICBsYWJlbDogXCJcdUQ4M0RcdURDRDFcdTY3MkNcdTk4NzVcdTU5MjdcdTdFQjJcIixcclxuICAgICAgbGV2ZWw6IFwiZGVlcFwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBsYXN0VXBkYXRlZDoge1xyXG4gICAgICB0ZXh0OiBcIlx1NjcwMFx1NTQwRVx1NjZGNFx1NjVCMFx1NEU4RVwiLFxyXG4gICAgICBmb3JtYXRPcHRpb25zOiB7XHJcbiAgICAgICAgZGF0ZVN0eWxlOiBcImZ1bGxcIixcclxuICAgICAgICB0aW1lU3R5bGU6IFwibWVkaXVtXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGxhbmdNZW51TGFiZWw6IFwiXHU1OTFBXHU4QkVEXHU4QTAwXCIsXHJcbiAgICByZXR1cm5Ub1RvcExhYmVsOiBcIlx1NTZERVx1NTIzMFx1OTg3Nlx1OTBFOFwiLFxyXG4gICAgc2lkZWJhck1lbnVMYWJlbDogXCJcdTgzRENcdTUzNTVcIixcclxuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6IFwiXHU0RTNCXHU5ODk4XCIsXHJcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogXCJcdTUyMDdcdTYzNjJcdTUyMzBcdTZENDVcdTgyNzJcdTZBMjFcdTVGMEZcIixcclxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6IFwiXHU1MjA3XHU2MzYyXHU1MjMwXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXCIsXHJcblxyXG4gICAgc29jaWFsTGlua3M6IFtcclxuICAgICAge1xyXG4gICAgICAgIGljb246IFwiZ2l0aHViXCIsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vZ2V0MTAyNC9nZXQxMDI0LmdpdGh1Yi5pb1wiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuXHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgcHJvdmlkZXI6IFwibG9jYWxcIixcclxuICAgIH0sXHJcbiAgICAvL1x1NEZBN1x1OEZCOVx1NjgwRlx1ODFFQVx1NTJBOFx1OTE0RFx1N0Y2RVxyXG4gICAgc2lkZWJhcjogY2FsY3VsYXRlU2lkZWJhcldpdGhEZWZhdWx0T3BlbihcclxuICAgICAgW1xyXG4gICAgICAgIHsgZm9sZGVyTmFtZTogXCJcdUQ4M0RcdURDRDJcdTY1ODdcdTdBRTBcIiwgc2VwYXJhdGU6IHRydWUgfSxcclxuICAgICAgICAvLyB7IGZvbGRlck5hbWU6IFwiXHVEODNEXHVEQ0M2XHU2NUU1XHU4QkIwXCIsIHNlcGFyYXRlOiB0cnVlIH1cclxuICAgICAgXSxcclxuICAgICAgXCJcIlxyXG4gICAgKSxcclxuICB9LFxyXG5cclxuICAvLyBNYXJrZG93biBcdTkxNERcdTdGNkVcclxuICBtYXJrZG93bjoge1xyXG4gICAgbGluZU51bWJlcnM6IHRydWUsXHJcbiAgICBpbWFnZToge1xyXG4gICAgICBsYXp5TG9hZGluZzogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgY29uZmlnOiAobWQpID0+IHtcclxuICAgICAgLy8gXHU2REZCXHU1MkEwXHU4MUVBXHU1QjlBXHU0RTQ5XHU2RTMyXHU2N0QzXHU4OUM0XHU1MjE5XHJcbiAgICAgIG1kLnJlbmRlcmVyLnJ1bGVzLmhlYWRpbmdfY2xvc2UgPSAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSA9PiB7XHJcbiAgICAgICAgbGV0IGh0bWxSZXN1bHQgPSBzbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmICh0b2tlbnNbaWR4XS50YWcgPT09IFwiaDFcIikgaHRtbFJlc3VsdCArPSBgPEFydGljbGVNZXRhZGF0YSAvPmA7XHJcbiAgICAgICAgcmV0dXJuIGh0bWxSZXN1bHQ7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBcdTRGN0ZcdTc1MjhcdTYzRDJcdTRFRjZcclxuXHJcbiAgICAgIC8vXHU0RUUzXHU3ODAxXHU3RUM0XHU1NkZFXHU2ODA3XHJcbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbik7XHJcbiAgICAgIC8vb2JzaWRpYW5cdTUzQ0NcdTk0RkVcdTYzRDJcdTRFRjZcclxuICAgICAgbWQudXNlKEJpRGlyZWN0aW9uYWxMaW5rcygpKTtcclxuICAgICAgbWQudXNlKGZvb3Rub3RlX3BsdWdpbik7XHJcbiAgICAgIG1kLnVzZSh0YXNrX2NoZWNrYm94X3BsdWdpbiwge1xyXG4gICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgIGRpdldyYXA6IGZhbHNlLFxyXG4gICAgICAgIGRpdkNsYXNzOiBcImNoZWNrYm94XCIsXHJcbiAgICAgICAgaWRQcmVmaXg6IFwiY2J4X1wiLFxyXG4gICAgICAgIHVsQ2xhc3M6IFwidGFzay1saXN0XCIsXHJcbiAgICAgICAgbGlDbGFzczogXCJ0YXNrLWxpc3QtaXRlbVwiLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFx1NEZERFx1NUI1OFx1NTM5Rlx1NjcwOVx1NzY4NHRhYmxlXHU2RTMyXHU2N0QzXHU1NjY4XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRSZW5kZXIgPVxyXG4gICAgICAgIG1kLnJlbmRlcmVyLnJ1bGVzLnRhYmxlX29wZW4gfHxcclxuICAgICAgICAoKHRva2VucywgaWR4KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gXCI8dGFibGU+XCI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDl0YWJsZVx1NkUzMlx1NjdEM1xyXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuID0gKHRva2VucywgaWR4KSA9PiB7XHJcbiAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU4MUVBXHU1QjlBXHU0RTQ5XHU3Njg0XHU3QzdCXHU1NDBEXHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gXCJjdXN0b20tdGFibGUtY29udGFpbmVyXCI7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+PHRhYmxlPmA7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBcdTc4NkVcdTRGRER0YWJsZVx1N0VEM1x1Njc1Rlx1NjgwN1x1N0I3RVx1NTQwRVx1RkYwQ2Rpdlx1NjgwN1x1N0I3RVx1NkI2M1x1Nzg2RVx1NTE3M1x1OTVFRFxyXG4gICAgICBjb25zdCBkZWZhdWx0VGFibGVDbG9zZSA9XHJcbiAgICAgICAgbWQucmVuZGVyZXIucnVsZXMudGFibGVfY2xvc2UgfHxcclxuICAgICAgICAoKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcclxuICAgICAgICAgIHJldHVybiBcIjwvdGFibGU+XCI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9jbG9zZSA9ICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGAke2RlZmF1bHRUYWJsZUNsb3NlKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpfTwvZGl2PmA7XHJcbiAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIGNvZGVUcmFuc2Zvcm1lcnM6IFtcclxuICAgICAgdHJhbnNmb3JtZXJUd29zbGFzaCh7XHJcbiAgICAgICAgdHlwZXNDYWNoZTogY3JlYXRlRmlsZVN5c3RlbVR5cGVzQ2FjaGUoKSBcclxuICAgICAgfSlcclxuICAgIF1cclxuICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxBQUEtcGVyc29uYWxEYXRhXFxcXHByb2plY3RcXFxcR2l0aHViXFxcXGdldDEwMjQuZ2l0aHViLmlvXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcQUFBLXBlcnNvbmFsRGF0YVxcXFxwcm9qZWN0XFxcXEdpdGh1YlxcXFxnZXQxMDI0LmdpdGh1Yi5pb1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ3NcXFxcbmF2LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9BQUEtcGVyc29uYWxEYXRhL3Byb2plY3QvR2l0aHViL2dldDEwMjQuZ2l0aHViLmlvLy52aXRlcHJlc3MvY29uZmlncy9uYXYudHNcIjtpbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSB9IGZyb20gJ3ZpdGVwcmVzcydcclxuZXhwb3J0IGNvbnN0IG5hdjogRGVmYXVsdFRoZW1lLkNvbmZpZ1snbmF2J10gPSBbXHJcbiAge1xyXG4gICAgdGV4dDogJ1x1RDgzRFx1RENEMlx1NjU4N1x1N0FFMCcsXHJcbiAgICBsaW5rOiAnL1x1RDgzRFx1RENEMlx1NjU4N1x1N0FFMC9pbmRleCcsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnXHVEODNEXHVEQ0M2XHU2NUU1XHU4QkIwJyxcclxuICAgIGxpbms6ICcvXHVEODNEXHVEQ0M2XHU2NUU1XHU4QkIwL2luZGV4JyxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICdcdUQ4M0RcdURDNjhcdTIwMERcdUQ4M0NcdURGOTNcdTUxNzNcdTRFOEVcdTYyMTEnLFxyXG4gICAgbGluazogJy9vdGhlckRvY3MvXHU1MTczXHU0RThFXHU2MjExJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJ1x1RDgzQ1x1REZGN1x1RkUwRlx1NjgwN1x1N0I3RScsXHJcbiAgICBsaW5rOiAnL290aGVyRG9jcy90YWdDbG91ZCdcclxuICB9XHJcbl0iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1YLFNBQVMsb0JBQXVDO0FBQ25hLFNBQVMsc0JBQXNCO0FBQy9CO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxPQUNLOzs7QUNKQSxJQUFNLE1BQWtDO0FBQUEsRUFDN0M7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0Y7OztBRFhBLFNBQVMsb0JBQW9CLGdDQUFnQztBQUM3RCxTQUFTLDBCQUEwQjtBQUNuQyxTQUFVLG1CQUFtQixxQkFBcUIsdUJB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
