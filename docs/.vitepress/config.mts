import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "iDocs",
  description: "My Docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Java Docs', link: '/javaDocs/Java概述和环境搭建.md' }
    ],

    sidebar: [
      {
        text: 'Java基础',
        items: [
          { text: 'Java概述和环境搭建', link: '/javaDocs/Java概述和环境搭建.md' },
          { text: 'Java语言基础', link: '/javaDocs/Java语言基础.md' },
          { text: '流程控制', link: '/javaDocs/流程控制.md' },
          { text: '静态方法', link: '/javaDocs/静态方法.md' },
          { text: '数组', link: '/javaDocs/数组.md' },
          { text: '初识面向对象', link: '/javaDocs/初识面向对象.md' },
          { text: '封装和继承', link: '/javaDocs/封装和继承.md' },
          { text: 'static关键字和方法重写和多态', link: '/javaDocs/static关键字和方法重写和多态.md' },
          { text: '抽象类和接口', link: '/javaDocs/抽象类和接口.md' },
          { text: '异常', link: '/javaDocs/异常.md' },
          { text: '常用类', link: '/javaDocs/常用类.md' },
          { text: '集合', link: '/javaDocs/集合.md' },
          { text: 'IO流', link: '/javaDocs/IO流.md' },
          { text: '多线程', link: '/javaDocs/多线程.md' },
          { text: '注解和反射', link: '/javaDocs/注解和反射.md' },
          { text: '网络编程', link: '/javaDocs/网络编程.md' },
          { text: 'JDK8新特性', link: '/javaDocs/JDK8新特性.md' },
          { text: 'JDK8新特性2', link: '/javaDocs/JDK8新特性2.md' },
          { text: 'MySQL', link: '/javaDocs/MySQL.md' },
          { text: 'javaSE', link: '/javaDocs/javaSE.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/niuyafeng777/java' }
    ]
  }
})
