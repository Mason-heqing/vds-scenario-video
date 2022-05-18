<template>
    <div class="content-wrapper">
        <section class="content-header">
            <h1 class="nice">
                激活统计
                <!-- <small>Optional description</small> -->
            </h1>
            <ol class="breadcrumb">
                <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
                <li class="active">
                    <i class="glyphicon glyphicon-adjust"></i> 激活统计
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
                                <div class="row m-0">
                                    <div class="form-horizontal">
                                        <div class="col-lg-2 pl-0">
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    <el-date-picker v-model="yearTime" format="yyyy" value-format="yyyy"
                                                        type="year" placeholder="请选择年份" :clearable="false"
                                                        @change="currentYearChange"></el-date-picker>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 pr-0">
                                            <div class="btn-group">
                                                <button id="btn_device_search" type="button" class="btn btn-primary"
                                                    @click="getListData">
                                                    <span class="glyphicon glyphicon-search"
                                                        aria-hidden="true"></span>查询
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-body">
                            <div class="row mt-30 mb-30">
                                <div class="col-sm-12">
                                    <h4>激活统计</h4>
                                </div>
                                <div class="col-sm-12">
                                    <div class="chart" id="chartVideo"
                                        style="width: 100%;height: 340px; padding-right: 10px"></div>
                                </div>
                            </div>

                            <table-cmp :table-data="tabOrgInfoList" :table-label="tableLabel" ref="tableChild"
                                :is-show-select="isShowSelect" :header-style="headerStyle" :column-style="columnStyle">
                            </table-cmp>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script src="./statActivate.js"></script>
<style scoped lang="scss">
@import "./statActivate.scss";

.Summary {
    display: flex;
    justify-content: center;
    padding: 30px 0;
}

.el-table {
    max-height: 200px;
    overflow-y: scroll;
}

.custom-style {
    color: #0099FF;
    font-size: 22px;
}

.el-table::before {
    height: 0;
}
</style>
