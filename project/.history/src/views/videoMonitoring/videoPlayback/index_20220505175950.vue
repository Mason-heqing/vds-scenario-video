<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        视频资源 - 专线包
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 专线包
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body" v-loading="loading">
          <div class="form-horizontal">
            <div class="col-sm-2 pl-0">
              <div class="btn-group">
                <button id="btn_device_search" type="button" class="btn btn-primary" v-show="isMaster"
                  @click="paySelect">
                  创建订单
                </button>
                <!-- <button id="btn_device_reset" type="button" class="btn btn-default" @click="exportModel">
                            <span class="glyphicon glyphicon-import" aria-hidden="true"></span> 导入
                          </button>
						  <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                            <span class="glyphicon glyphicon-export" aria-hidden="true"></span> 导出
                          </button> -->
                <button id="btn_delete" type="button" class="btn btn-default" @click="assignmentBtn"
                  v-show="!specialPageForm.transferFlag">
                  <span class="glyphicon glyphicon-share" aria-hidden="true"></span> 转让
                </button>
              </div>
            </div>
            <div class="col-sm-10 text-right p-0 flex-style">
              <div class="col-sm-2 pl-0">
                <el-radio-group v-model="specialPageForm.transferFlag" @change="radioChangeS" size="medium">
                  <el-radio-button :label="false">我的</el-radio-button>
                  <el-radio-button :label="true">已转让</el-radio-button>
                </el-radio-group>
              </div>
              <div class="col-lg-2">
                <div class="form-group">
                  <div class="col-md-12">
                    <el-select clearable v-model="specialPageForm.source" placeholder="来源" @change="sourceChange">
                      <el-option v-for="item in sourceType" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="col-lg-2">
                <div class="form-group">
                  <div class="col-md-12">
                    <el-select clearable v-model="specialPageForm.binded" placeholder="绑定状态" @change="bindChange">
                      <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 pl-0">
                <div class="form-group">
                  <div class="col-md-12">
                    <el-input clearable style="width:100%" placeholder="请输入时长" v-model="specialPageForm.duration">
                    </el-input>
                  </div>
                </div>
              </div>
              <!-- <div class="col-lg-2 pl-0">
                <div class="form-group">
                  <div class="col-md-12">
                    <el-input clearable style="width:100%" placeholder="请输入key或绑定的设备的序列号"
                      v-model="specialPageForm.deviceSearch"></el-input>
                  </div>
                </div>
              </div> -->
              <div>
                <div class="btn-group">
                  <button id="btn_device_search" type="button" class="btn btn-primary" @click="getTableData">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                  </button>
                  <button id="btn_device_reset" type="button" class="btn btn-default mr-10" @click="resetBtn">
                    <span class="fa fa-reply" aria-hidden="true"></span>重置
                  </button>
                  <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-start">
                    <span class="el-dropdown-link">
                      <el-button type="primary" size="small">
                        <i class="el-icon-menu"></i>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-checkbox-group v-model="tableSelect" @change='checkboxChange'>
                        <div v-for="item in tableOption" :key="item" class="checkbox-div">
                          <el-checkbox :label="item" :key="item"></el-checkbox>
                        </div>
                      </el-checkbox-group>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
          <table-cmp v-loading="loading" :table-data="tableData" :table-label="tableLabel" ref="tableChild"
            :is-show-select="isShowSelect">
            <el-table-column slot="operate" label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-row>
                  <!-- <i class="el-icon-edit">IC卡</i>
                             <i class="el-icon-delete">删除</i> -->
                  <el-button v-show="1 == scope.row.transfered && 1 === scope.row.binded" title="" type=""
                    icon="el-icon-s-check" round size="mini" style="background:transparent;border:none;cursor:default;">
                  </el-button>
                  <el-button v-show="1 == scope.row.transfered && 0 === scope.row.binded" title="" type=""
                    icon="el-icon-s-check" round size="mini" style="background:transparent;border:none;cursor:default;">
                  </el-button>
                  <el-button v-show="0 === scope.row.transfered" title="转让" type="primary" icon="el-icon-share" round
                    size="mini" @click="gooperation(scope.row, 1)"></el-button>
                  <el-button v-show="0 === scope.row.binded" title="绑定" type="primary" icon="el-icon-s-check" round
                    size="mini" @click="gooperation(scope.row, 2)"></el-button>
                  <el-button v-show="1 === scope.row.binded" title="解绑" type="primary" icon="el-icon-s-open" round
                    size="mini" @click="noBind(scope.row)"></el-button>
                </el-row>
              </template>
            </el-table-column>
          </table-cmp>
          <div class="block mt-10">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="10"
              layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>

      <!-- 导入 -->
      <el-dialog title="批量导入" :visible.sync="importPop" :close-on-click-modal='false' width="50%">
        <div style="padding:0px;">
          <div class="row mb-20">
            <div class="col-sm-3 text-right">点击下载Excel模板</div>
            <div class="col-sm-9">
              <a :href="imgurl + '/static/excel/person.xls'">开始下载Excel导入模板.xls</a>
              <!-- <a href="../../../../static/export/person.xls" download="person.xls">开始下载Excel导入模板.xls</a> -->
              <span style="color: red;">（Excel导入模板表头红色必填）</span>
            </div>
          </div>
          <div class="row mb-20">
            <div class="col-sm-3 text-right">选择.zip文件</div>
            <div class="col-sm-9 upload-zip">
              <el-upload ref="upload" name="file" :limit=1 :with-credentials="true" :file-list="fileList"
                :action="exportUrl + appId" :data="uploadData" :auto-upload="false" :on-exceed="exceed"
                :on-change='selectChange' :on-error="uploadErr" :before-upload="beforeAvatarUpload"
                :on-success="successCheck" :on-remove="removeFile">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
              </el-upload>
            </div>
          </div>
          <div class="row mb-20">
            <div class="col-sm-3 text-right">导入须知</div>
            <div class="col-sm-9">
              1、上传文件大小最大为：<span style="color: red;">128MB</span>；<br />
              2、excel文件跟人员图片需要放在<span style="color: red;">同一层级目录</span>，如图片放在(批量导入目录)则excel文件也要放在该目录下；<br />
              3、目前仅支持上传<span style="color: red;">zip格式</span>压缩文件，将文件夹压缩时请选择正确的压缩格式；<span
                style="color: red;">excel模板请下载上方指定的模板</span>；<br />
              4、人员与图片的对应方式为根据excel文件人脸图片进行获取，如果当前导入用户 存在人脸图片，请将图片名称填入此列;<br />
              5、当人脸图片列为空时，会根据人员姓名去进行一次对应的图片获取，如人员姓名为李四，会去获取一次图片名称为李四的文件；<br />
              6、若无excel文件，仅有图片，则人脸图片名称格式为：<span style="color: red;">姓名_人员编号</span>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="importPop = false">关闭</el-button>
        </span>
      </el-dialog>
    </section>
    <!-- 导出 -->
    <!-- <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box> -->

    <!-- 导入失败数据 -->
    <el-dialog title='导入失败数据' :visible.sync="exporterrPop" width="60%" class="el-dialog-reset">
      <div style="padding:0px;">
        <el-table :data="exportErrList" max-height="250" :border="true"
          :cell-style="{ background: '#fff', fontSize: '14px', color: '#12111D', padding: '6px 0' }" :stripe="true">
          <el-table-column property="personName" label="姓名" width="100"></el-table-column>
          <!-- <el-table-column property="faceUrl" label="人脸图片" width="120">
             <template  slot-scope="scope">
              <img v-if="scope.row.faceUrl" src="D:/excel/img/pic81197376299.JPG" alt="">
            </template>
          </el-table-column> -->
          <el-table-column property="phone" label="手机号" width="120"></el-table-column>
          <el-table-column property="icNum" label="IC卡" width="120"></el-table-column>
          <el-table-column property="personSubtype" label="住户类型" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.personSubtype == '1'">户主</span>
              <span v-if="scope.row.personSubtype == '2'">家庭成员</span>
              <span v-if="scope.row.personSubtype == '3'">租客</span>
              <span v-if="scope.row.personSubtype == '5'">其他</span>
            </template>
          </el-table-column>
          <el-table-column property="buildName" label="楼栋" width="80"></el-table-column>
          <el-table-column property="unitName" label="单元" width="80"></el-table-column>
          <el-table-column property="houseName" label="房号" width="80"></el-table-column>
          <el-table-column property="errorMsg" label="失败原因" min-width="120"></el-table-column>

        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exporterrPop = false">取 消</el-button>
      </span>
    </el-dialog>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
    <el-dialog title="创建订单" :visible.sync="dialogVisible" width="30%">
      <el-tabs v-model="activeNamePaytype" type="border-card">
        <el-tab-pane label="专线包" name="first">
          <el-row align="middle">
            <el-col :span="5" class="text-right pr-20">同时播放</el-col>
            <el-col :span="19">
              <el-radio-group v-model="play_package" @change="radioChangeP">
                <el-radio-button :label="item" v-for="(item, index) in specialGoodsMap" :key="index"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row align="middle" class="mt-10">
            <el-col :span="5" class="text-right pr-20">购买时长</el-col>
            <el-col :span="19">
              <el-radio-group v-model="payTimes" @change="radioChangePayTimes">
                <el-radio-button :label="item.id" v-for="(item, index) in specialSubsetItem" :key="index">
                  {{ item.durationDesc }}
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row align="middle" class="mt-10">
            <el-col :span="5" class="text-right pr-20">购买数量</el-col>
            <el-col :span="19">
              <el-input v-model="paySpecialNum" placeholder="请输入购买数量" onkeyup="value=value.replace(/[^\d]/g,'')"
                @change="payChangeNum" style="width:50%;"></el-input> 个
            </el-col>
          </el-row>
          <el-row align="middle" class="mt-10">
            <el-col :span="5" class="text-right pr-20">可用设备数</el-col>
            <el-col :span="19" v-if="isMaster">
              <el-input v-model="deviceNum" placeholder="请输入限制数量" onkeyup="value=value.replace(/[^\d]/g,'')"
                @change="playChangedeviceNum" style="width:50%;"></el-input> 个
            </el-col>
            <el-col :span="19" v-else>
              <span>{{ deviceNum }}个</span>
            </el-col>
          </el-row>
          <el-row align="middle" class="mt-10">
            <el-col :span="5" class="text-right pr-20">总价</el-col>
            <el-col :span="19">
              <span>{{ specialPackageTotal }}元</span>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isBtn" type="primary" @click="onSubmit">确 定</el-button>
        <el-button v-else type="primary" :loading="true">提交中</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择机构" :visible.sync="mechanismDialogVisible" width="20%">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="mb-10">
        </el-input>
      <div class="device-list">
        <!-- <el-radio-group v-model="selectMechanism">
          <el-radio-button :label="item.orgId" v-for="(item, index) in mechanismList" :key="index">{{ item.orgName }}
          </el-radio-button>
        </el-radio-group> -->
        <el-tree :props="orderDefaultProps" ref="orgIdTree" :data="mechanismList" :check-strictly="true" show-checkbox :filter-node-method="filterNode"
          node-key="orgId" default-expand-all highlight-current @check-change="orderHandleCheckChange">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mechanismDialogVisible = false">取 消</el-button>
        <el-button v-if="!isBtn" type="primary" @click="checkedMechanism">确 定</el-button>
        <el-button v-else type="primary" :loading="true">提交中</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择资源池" :visible.sync="deviceDialogVisible" width="20%">
      <div class="device-list">
        <el-radio-group v-model="selectDevice">
          <el-radio-button :label="item.serial" v-for="(item, index) in deviceList" :key="index">{{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deviceDialogVisible = false">取 消</el-button>
        <el-button v-if="!isBtn" type="primary" @click="checkedDevide">确 定</el-button>
        <el-button v-else type="primary" :loading="true">提交中</el-button>
      </span>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="exportVisible" width="30%">
      <div class="row">
        <div class="col-sm-12">
          <el-input type="textarea" v-model="activationCode" placeholder="请将激活码输入到该输入框"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="转让给以下机构" :visible.sync="transferInstitutionVisible" width="30%">
      <div class="row">
        <div class="col-sm-12">
          <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange">
          </el-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferInstitutionVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferInstitutionVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请使用微信支付" :visible.sync="payDialogVisible" width="15%" class="pay-orcode">
      <div class="row">
        <el-image :src="payImg" style="width:100%;height:220px;"></el-image>
        <el-row align="middle" class="mt-10">
          <el-col :span="12" class="pl-30">订单号 :</el-col>
          <el-col :span="12">
            <span>{{ orderName }}</span>
          </el-col>
        </el-row>
        <el-row align="middle" class="mt-10">
          <el-col :span="12" class="pl-30">购买数量 :</el-col>
          <el-col :span="12">
            <span>{{ payNum }}</span>
          </el-col>
        </el-row>
        <el-row align="middle" class="mt-10 mb-10">
          <el-col :span="12" class="pl-30">支付金额 :</el-col>
          <el-col :span="12">
            <span>{{ orderAmount }} 元</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./videoPlayback.js"></script>
<style scoped lang="scss">
@import "./videoPlayback.scss";

.my-wth {
  width: 13%;
}

.el-row {
  display: flex;
  align-items: center;
}

.flex-style {
  display: flex;
  justify-content: flex-end;
}

.device-list {
  max-height: 407px;
  overflow-y: scroll;
}

.device-list .el-radio-group {
  width: 100%;
}

.device-list .el-radio-button {
  display: block;
  width: 100%;

  /deep/ .el-radio-button__inner {
    width: 100%;
    border-left: 1px solid #DCDFE6;
  }
}

// .content-wrapper /deep/ .el-dialog{
//   top: 50%;
// }
// .content-wrapper /deep/ .el-tabs{
//     height:570px;
//      overflow: auto;
//     }
</style>
