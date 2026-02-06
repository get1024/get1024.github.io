import { h, onMounted, watch, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import {
  useRoute,
  useData,
  type Theme as ThemeConfig,
  type EnhanceAppContext,
} from 'vitepress'

// ==========================
// 样式 & 核心插件
// ==========================
import './style/index.css'
import 'virtual:group-icons.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@shikijs/vitepress-twoslash/style.css'
import 'element-plus/dist/index.css'

// ==========================
// 第三方插件
// ==========================
import mediumZoom from 'medium-zoom'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import { ElBacktop } from 'element-plus'

// ==========================
// 组件
// ==========================
import Linkcard from "./components/Linkcard/Linkcard.vue"
import HomeUnderLine from './components/HomeUnderline/HomeUnderLine.vue'
import ArticleMetadata from "./components/ArticleMetadata/ArticleMetadata.vue"
import nodeIndex from "./components/PostList/noteIndex.vue"
import TagCloud from './components/PostList/TagCloud.vue'
import BackToTop from './components/BackToTop/BackToTop.vue'

// ==========================
// enhanceApp 配置
// ==========================
const enhanceApp = ({ app }: EnhanceAppContext) => {
  // 使用 Git changelog 插件
  app.use(NolebaseGitChangelogPlugin)
  // 使用shiki twoslash
  app.use(TwoslashFloatingVue)

  // 全局注册组件
  app.component('Linkcard', Linkcard)
  app.component('HomeUnderLine', HomeUnderLine)
  app.component('ArticleMetadata', ArticleMetadata)
  app.component('nodeIndex', nodeIndex)
  app.component('TagCloud', TagCloud)
  app.component('BackToTop', BackToTop)
  app.component(ElBacktop.name!, ElBacktop)
}

// ==========================
// Theme 配置
// ==========================
export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => [ h(NolebaseHighlightTargetedHeading) ],
      'layout-bottom': () => h(BackToTop)
    })
  },

  enhanceApp,

  setup() {
    //图片缩放
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    //giscus评论插件
    const { frontmatter } = useData();
    giscusTalk({
      repo: 'get1024/get1024.github.io',
      repoId: 'R_kgDOL1mSLA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOL1mSLM4CfRSC',
      mapping: 'title',
      strict: '1',
      reactionsEnabled: '1',
      inputPosition: 'top',
      theme:'preferred_color_scheme',
      lang: 'zh-CN',
      loading: 'lazy',
      crossorigin:'anonymous',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用"comment:true"序言在页面上单独启用它
      true
    );
  },
}

export default Theme
