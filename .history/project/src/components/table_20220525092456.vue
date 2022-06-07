<template>
  <el-table
    element-loading-text="Loading"
    :data="tableData"
    class="mt-10"
    style="width: 100%;"
    :fit="true"
    :border="true"
    :header-cell-style="headerStyle"
    :cell-style="columnStyle"
    :row-style="rowStyle"
    :stripe="true"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    @sort-change="handleSort"
  >
    <el-table-column v-if="isShowSelect" type="selection" width="40"></el-table-column>
    
    <template v-for="(item,index) in tabelHeader">
      <!-- 操作 -->
     
      <slot v-if="item.slot" :name="item.slot"></slot>
      <!-- 需要根据返回值现实相对应的文字 -->
      <el-table-column 
      v-else-if="item.index"
      type="index"
      width="50"
      :label="item.label"
      :align="item.align">

      </el-table-column>
      <el-table-column
        v-else-if="item.render"
        :min-width="item.width ? item.width : 'auto'"
        :key="index"
        :align="item.align"
        :label="item.label"
        :prop="item.param"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <span>{{item.render(scope.row)}}</span>
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column
        v-else-if="item.isimg"
        :width="item.width ? item.width : 'auto'"
        :key="index"
        :align="item.align"
        :label="item.label"
        :prop="item.param"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <img v-if="scope.row[item.param]" style="width:80px;height:80px" :src="imgurl+'/file/download?path='+scope.row[item.param]" alt />
        </template>
      </el-table-column>
      <!-- 开关 -->
      <el-table-column
        v-else-if="item.isswitch"
        :min-width="item.width ? item.width : 'auto'"
        :key="index"
        :align="item.align"
        :label="item.label"
        :prop="item.param"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <el-switch v-model="scope.row[item.param]"></el-switch>
        </template>
      </el-table-column>
      <!-- 普通 -->
      <el-table-column
        v-else
        :min-width="item.width ? item.width : 'auto'"
        :key="index"
        :align="item.align"
        :label="item.label"
        :prop="item.param"
        :sortable="item.sortable"
      ><template slot-scope="scope">
          <span v-if="item.render">
            {{ item.render(scope.row) }}
          </span>
          <span v-else>{{ scope.row[item.param] }}</span>
          </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import ligature from '../../src/utils/ligature.js'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isShowSelect: {
      type: Boolean,
      default: () => {
        return Boolean;
      }
    },
    headerStyle:{
     type:Function,
     default:()=>{
       return {};
     }
    },
    columnStyle:{
      type:Function,
      default:()=>{
        return {background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}
      }
    },
    rowStyle:{
      type:Function,
      default:()=>{
        return {};
      }
    },
    // sortable:{
    //   type:Object,
    //   default:()=>{
    //     return {prop: 'ID', order: 'ascending'};
    //   }
    // },

    // isClick: {
    //   type: String,
    //   default: () => {
    //     return String;
    //   }
    // }
  },
  data() {
    return {
      tabelHeader: [],
      selectData: [], //选中的数据
      imgurl:'',
    };
  },
  components: {},
  mounted() {
    // this.tabelHeader = JSON.parse(JSON.stringify(this.tableLabel));
    this.tabelHeader= $.extend(true,[],this.tableLabel)
    
    for (var i = this.tabelHeader.length - 1; i >= 0; i--) {
      if (!this.tabelHeader[i].isshow) {
        this.tabelHeader.splice(i, 1);
      }
    }

    this.tabelHeader = this.tabelHeader;
  },
  created(){
    this.imgurl=this.tools.global.API_URL;
    // console.log($.extend(true,[],this.tableLabel));
  },
  watch: {
    tableLabel: {
      handler(newValue) {
        // console.log(newValue);
        // let val = JSON.parse(JSON.stringify(newValue));
        let val=$.extend(true,[],newValue)

        for (var i = val.length - 1; i >= 0; i--) {
          if (!val[i].isshow) {
            val.splice(i, 1);
          }
        }
        this.tabelHeader = val;
        // console.log(this.tabelHeader);
      },
      deep: true
    }
  },
  methods: {
    handleSelectionChange(e) {
      console.log(e);
      this.selectData = e;
    },
    clickRow(row){
      console.log(this.isClick)
      if(this.isClick==1){
        this.$parent.seeContent(row)
      }
    },
    handleSort(obj) { // 用户点击排序字段触发事件
      // this.sort = obj.prop
      // if (obj.order === 'descending') { // 转换格式，准成接口要求格式
      //   this.sort = '-' + obj.prop
      // }
      //console.log(obj);
      this.$emit('sortableChange',obj);
    }
  }
}
</script>
<style>
.tableX .el-table--scrollable-x .el-table__body-wrapper {
  padding: 0 0 5px 0;
  margin: 0 0 5px 0;
  overflow-x: auto;
}
.content-wrapper /deep/ .el-table td .cell{
  white-space: nowrap;
}
</style>