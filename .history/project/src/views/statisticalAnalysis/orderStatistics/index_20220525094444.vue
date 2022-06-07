<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        订单统计
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 订单统计
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px" v-loading="loading">
        <div class="row">
          <div class="col-lg-12">
            <div class="box box-primary mb-10">
              <div class="box-body">
                  <div class="row ml-0">
                     <div class="form-horizontal">
                       <div class="col-lg-2 pl-0" style="width:12%;">
                          <div class="form-group">
                            <div class="col-sm-12">
                                <el-radio-group v-model="dataForm.operateType" size="medium" @change="dateChange">
                                  <el-radio-button :label="1">日</el-radio-button>
                                  <el-radio-button :label="2">月</el-radio-button>
                                  <el-radio-button :label="3">年</el-radio-button>
                                </el-radio-group>
                            </div>
                          </div>
                       </div>
                  <div class="col-lg-3 pl-0">
                    <div class="form-group">
                      <div class="col-md-12" v-if="1 === dataForm.operateType">
                        <el-date-picker
                          style="width: 100%;"
                          v-model="timers"
                          type="daterange"
                          :clearable="false"
                          value-format="yyyy-MM-dd"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                          @change="changeTime"
                        >
                        </el-date-picker>
                      </div>
                      <div class="col-md-12" v-else-if="2 === dataForm.operateType">
                          <el-date-picker
                          v-model="currentMonth"
                          type="monthrange"
                          :clearable="false"
                          value-format="yyyy-MM"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始月份"
                          end-placeholder="结束月份"
                          :picker-options="monthPickerOptions"
                          @change="changeMonth"
                          >
                        </el-date-picker>
                      </div>
                      <div class="col-md-12" v-else>
                         <el-date-picker style="width:47%"
                              v-model="yearStartTime"
                              format="yyyy"
                              value-format="yyyy"
                              type="year"
                              placeholder="开始年份"
                              :clearable="false"
                              :picker-options="pickerStartYear"
                              @change="startYearChange"
                            ></el-date-picker>
                            至
                            <el-date-picker
                              style="width:47%"
                              v-model="yearEndTime"
                              format="yyyy"
                              value-format="yyyy"
                              type="year"
                              placeholder="结束年份"
                              :clearable="false"
                              :picker-options="pickerEndYear"
                              @change="endYearChange"
                            ></el-date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 pr-0">
                    <div class="btn-group">
                      <button
                        id="btn_device_search"
                        type="button"
                        class="btn btn-primary"
                        @click="getListData"
                      >
                        <span
                          class="glyphicon glyphicon-search"
                          aria-hidden="true"
                        ></span
                        >查询
                      </button>
                    </div>
                  </div>
                   </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-0">
          <div class="box-body">
                <div class="row mt-30">
                  <div class="col-sm-12">
                    <h4 class="pl-15">订单金额统计</h4>
                  </div>
                  <div class="col-sm-12">
                    <div
                    class="chart"
                    ref="parkingRevenue"
                    style="height: 340px; padding-right: 10px"
                  ></div>
                  </div>
                </div>
                <!-- <table-cmp
                  :table-data="listData"
                  :table-label="tableLabel"
                  ref="tableChild"
                  :is-show-select="isShowSelect"
                  @sortableChange="sortableChange"
                >
                </table-cmp> -->
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  >
                  <template v-for="(item,index) in tableLabel" :key='index'>
                     <el-table-column :prop="item.prop"></el-table-column>
                  </template>
                  <!-- <el-table-column
                    prop="orgName"
                    label="机构"
                    width="150">
                  </el-table-column>
                      <el-table-column label="时间" v-for="(item,index) in tableLabel" :key="index">
                          <el-table-column v-if="'' == item.param"
                            :prop="item.param"
                            label="专线包"
                            width="120">
                          </el-table-column>
                          <el-table-column
                            prop="activateTotalPrice"
                            label="激活包"
                            width="120">
                          </el-table-column>  
                    </el-table-column>
                    <el-table-column
                          prop="totalPrice"
                          label="合计"
                          width="150">
                        </el-table-column> -->
                </el-table>
              </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script src="./orderStatistics.js"></script>
<style scoped lang="scss">
@import "./orderStatistics.scss";
.Summary{
    display: flex;
    justify-content: center;
    padding: 30px 0;
}
.el-table{
  max-height: 200px;
  overflow-y: scroll;
}
.custom-style{
  color: #0099FF;
  font-size: 22px;
}
.el-table::before{
  height: 0;
}
// .el-date-editor .el-range-separator {
//   line-height: 34px;
// }
// .box{
//   background: transparent;
// }
</style>
