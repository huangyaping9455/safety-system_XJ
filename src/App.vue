<template>
  <div id="app" class="SYSTEM">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  mounted() {
    // const routes = this.getRoutes(this.$store.getters.menu);
    // console.log(routes);
    // this.$router.addRoutes([
    //   {
    //     path: '/index',
    //     name: '平台主页',
    //     component: () => import('@/view/index/index.vue'),
    //     children: routes
    //   }
    // ]);
    // 禁用f12 及鼠标右键
    // document.ondragstart = function() {
    //   return false;
    // }; //for image
    // this.$refs.app.oncontextmenu = function(e) {
    //   console.log(e);
    //   e.preventDefault(); // 阻止默认事件行为
    //   if (e.which === 3) {
    //     return false;
    //   }
    // }; //for right click disable
    // document.onkeydown = function(e) {
    //   if (
    //     e.ctrlKey &&
    //     (e.keyCode === 65 ||
    //       e.keyCode === 67 ||
    //       e.keyCode === 73 ||
    //       e.keyCode === 74 ||
    //       e.keyCode === 80 ||
    //       e.keyCode === 83 ||
    //       e.keyCode === 85 ||
    //       e.keyCode === 86 ||
    //       e.keyCode === 117)
    //   ) {
    //     return false;
    //   }
    //   if (e.keyCode == 18 || e.keyCode == 123) {
    //     return false;
    //   }
    // };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    getRoutes(menu) {
      let routes = [];
      menu.forEach((item) => {
        const path = item.path;
        const view = {
          path,
          name: item.name,
          component: (resolve) => require([`@/view${path}.vue`], resolve),
        };
        if (item.children && item.children.length > 0) {
          view.children = this.getRoutes(item.children);
        }
        routes.push(view);
      });
      return routes;
    },
  },
};
</script>

<style lang="scss">
@import "@/style/base.scss";
</style>
