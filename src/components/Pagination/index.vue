<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>

    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中 -->
    <span
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      @click="$emit('getPageNo', page)"
    >
      <button
        v-if="page >= startNumAndEndNum.start"
        :class="{ active: pageNo === page }"
      >
        {{ page }}
      </button>
    </span>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo === totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算出总共多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 算出连续页面起始数字和结束数字
    startNumAndEndNum() {
      const { pageNo, totalPage, continues } = this
      let start = 0
      let end = 0
      // 不正常现象 【总页数没有连续页码多】
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象【总页数大于连续页码】
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        /* 如果起始页码小于1 */
        if (start < 1) {
          start = 1
          end = continues
        }
        // 结束大于总页数
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background: skyblue;
  }
}
</style>
