<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorsList" :key="floor.id" :list="floor" />

    <Brand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch('receiveFloors')
  },
  computed: {
    ...mapState({
      floorsList: (state) => state.home.floors,
    }),
  },
}
</script>

<style></style>
