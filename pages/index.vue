<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">mt-app</h1>
      <h2 class="subtitle">My doozie Nuxt.js project</h2>
      <div>后台数据如下：</div>
      <div class="links" v-for="item in list" :key="item">{{item}}</div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    Logo
  },
  async asyncData(ctx) {
    let { status, data } = await ctx.$axios.post('/api/error/search');

    if (status === 200 && data.length) {
      return {
        list: data
      };
    }
  },
  mounted() {},
  methods: {
    loadData: async function() {}
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 600;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
