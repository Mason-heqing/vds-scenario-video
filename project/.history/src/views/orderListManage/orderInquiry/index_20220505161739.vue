<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        订单列表
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-user"></i> 订单列表
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body">
                    <div class="form-horizontal">
                      <div class="col-sm-1 pl-0">
                           <div class="form-group">
                          <div class="col-md-12">
                            <button id="btn_device_search" type="button" class="btn btn-default" @click="add">
                              创建订单
                            </button>
                            <!-- <button id="btn_device_search" type="button" class="btn btn-default" @click="pay">
                               <span class="glyphicon glyphicon-yen" aria-hidden="true"></span> 购买
                            </button> -->
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-11 text-right p-0 flex-style">
                        <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable="" v-model="dataForm.category" placeholder="选择产品类型">
                              <el-option
                                v-for="item in productTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable="" v-model="dataForm.paid" placeholder="选择支付状态">
                              <el-option
                                v-for="item in payType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="querySearch">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                      </div>
                      
                    </div>
                    <table-cmp
                      v-loading="loading"
                      :table-data="listData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button v-show="0 === scope.row.paid" title="支付" type="primary" icon="el-icon-shopping-cart-full" round  size="mini" @click="goEdit(scope.row.orderId)"></el-button>
                              <!-- <el-button title="取消订单" type="primary" icon="el-icon-s-order" round size="mini" @click="deleteData(scope.row.id)"></el-button> -->
                            </el-row>
                        </template>
                    </el-table-column>
                    </table-cmp>
                    <div class="block mt-10">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                      ></el-pagination>
                    </div>
              </div>
            </div>
      </section>
      <el-dialog
        title="创建订单"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-tabs v-model="activeNamePaytype" type="border-card" @tab-click="handleClick">
          <!-- <el-tab-pane label="时长包" name="first">
             <el-row align="middle">
                 <el-col :span="5" class="text-right pr-20">规格</el-col>
                 <el-col :span="19">
                     <el-radio-group v-model="timesLength" @change="radioChangeG($event)">
                        <el-radio-button :label="item.id" v-for="(item,index) in durationGoodsList" :key="index">{{item.specificationDesc}}</el-radio-button>
                      </el-radio-group>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">购买数量</el-col>
                 <el-col :span="19">
                     <el-input v-model.number="tiemsNum" placeholder="请输入购买数量" style="width:50%;" onkeyup="value=value.replace(/[^\d]/g,'')" @change="changeNumTimes"></el-input> 个
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">总价</el-col>
                 <el-col :span="19">
                     <span>{{timesTotal}}元</span>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">有效期至</el-col>
                 <el-col :span="19">
                     <span>{{usefulLife}}</span>
                 </el-col>
             </el-row>
          </el-tab-pane> -->
          <el-tab-pane label="专线包" name="second">
            <el-row align="middle">
                 <el-col :span="5" class="text-right pr-20">同时播放</el-col>
                 <el-col :span="19">
                     <el-radio-group v-model="play_package" @change="radioChangeP">
                         <el-radio-button :label="item" v-for="(item,index) in specialGoodsMap" :key="index"></el-radio-button>
                       </el-radio-group>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">购买时长</el-col>
                 <el-col :span="19">
                     <el-radio-group v-model="payTimes" @change="radioChangePayTimes">
                        <el-radio-button :label="item.id" v-for="(item,index) in specialSubsetItem" :key="index">{{item.durationDesc}}</el-radio-button>
                      </el-radio-group>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">购买数量</el-col>
                 <el-col :span="19">
                     <el-input v-model="paySpecialNum" placeholder="请输入购买数量" onkeyup="value=value.replace(/[^\d]/g,'')" @change="payChangeNum" style="width:50%;"></el-input> 个
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">可用设备数</el-col>
                 <el-col :span="19" v-if="isMaster">
                     <el-input  v-model="deviceNum" placeholder="请输入限制数量" onkeyup="value=value.replace(/[^\d]/g,'')" @change="playChangedeviceNum" style="width:50%;"></el-input> 个
                 </el-col>
                 <el-col :span="19" v-else><span>{{deviceNum}}个</span></el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">总价</el-col>
                 <el-col :span="19">
                     <span>{{specialPackageTotal}}元</span>
                 </el-col>
             </el-row>
          </el-tab-pane>
          <el-tab-pane label="车牌相机视频上云激活包" name="third">
             <el-row align="middle">
                 <el-col :span="5" class="text-right pr-20">购买数量</el-col>
                 <el-col :span="19">
                     <el-input v-model.number="activePackAgeNum" placeholder="请输入购买数量" style="width:50%;" onkeyup="value=value.replace(/[^\d]/g,'')" @change="changeActiveNumTimes"></el-input> 个
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="5" class="text-right pr-20">总价</el-col>
                 <el-col :span="19">
                     <span>{{timesActiveTotal}}元</span>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                <el-col :span="19" :offset="5" class="red">备注：一个激活包可供一台车牌识别相机视频上云。</el-col>
             </el-row>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="!isBtn" type="primary" @click="onSubmit">确 定</el-button>
          <el-button v-else type="primary" :loading="true">提交中</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="请使用微信支付"
        :visible.sync="payDialogVisible"
        width="15%"
        class="pay-orcode"
        >
        <div class="row">
           <el-image :src="payImg" style="width:100%;height:220px;"></el-image>
           <el-row align="middle" class="mt-10">
                 <el-col :span="12" class="pl-30">订单号 :</el-col>
                 <el-col :span="12">
                     <span>{{orderName}}</span>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10">
                 <el-col :span="12" class="pl-30">购买数量 :</el-col>
                 <el-col :span="12">
                     <span>{{payNum}}</span>
                 </el-col>
             </el-row>
             <el-row align="middle" class="mt-10 mb-10">
                 <el-col :span="12" class="pl-30">支付金额 :</el-col>
                 <el-col :span="12">
                     <span>{{orderAmount}} 元</span>
                 </el-col>
             </el-row>
        </div>
      </el-dialog>
  </div>
</template>
<script src="./orderInquiry.js"></script>
<style scoped lang="scss">
@import "./orderInquiry.scss";
.form-group /deep/ .el-date-editor .el-range-input{
  width: 44%;
}
.center-style{
  display: flex;
  align-items: center;
}
// .content-wrapper /deep/ .el-dialog{
//   top: 50%;
// }
// .content-wrapper /deep/ .el-tabs{
//     height:570px;
//      overflow: auto;
// }
.my-wth{
  width: 5%;
}
.el-row{
   display: flex;
   align-items: center;
 }  
.pay-orcode /deep/ .el-dialog__body{
  padding: 0px 20px;
}
.flex-style{
	display: flex;
	justify-content:flex-end;
}
.red{
  color: red;
}
</style>
