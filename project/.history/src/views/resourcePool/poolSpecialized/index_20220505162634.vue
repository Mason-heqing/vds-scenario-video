<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        资源池 - 专线包
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
        <div class="box-body">
          <div class="form-horizontal">
            <div class="col-sm-4 pl-0">
              <div class="btn-group">
                <button id="btn_device_search" type="button" class="btn btn-primary" @click="paySelect">
                  <span class="glyphicon glyphicon-book" aria-hidden="true"></span> 创建专线包资源池
                </button>
              </div>
            </div>
            <div class="col-sm-8 text-right p-0 flex-style">
              <div class="col-lg-3 pl-0">
                <div class="form-group">
                  <div class="col-md-12">
                    <el-input clearable style="width:100%" placeholder="请输入资源池名称" v-model="resourceList.name">
                    </el-input>
                  </div>
                </div>
              </div>
              <div>
                <div class="btn-group">
                  <button id="btn_device_search" type="button" class="btn btn-primary" @click="getTableData">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                  </button>
                  <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
                    <span class="fa fa-reply" aria-hidden="true"></span>重置
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table-cmp v-loading="loading" :table-data="tableData" :table-label="tableLabel" ref="tableChild"
            :is-show-select="isShowSelect">
            <el-table-column slot="editResourceName" label="资源池名称" align="center" width="180">
              <template slot-scope="scope">
                <div @click="editPoolName(scope.row)" style="cursor: pointer;">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column slot="editPackageNum" label="专线包个数" align="center" width="180">
              <template slot-scope="scope">
                <div @click="editPackageSpecialized" style="cursor: pointer;">{{ scope.row.packageNum }}</div>
              </template>
            </el-table-column>
            <el-table-column slot="devicesNum" label="设备数" align="center" width="180">
              <template slot-scope="scope">
                <div @click="editDevice(scope.row)"
                  :class="1 === scope.row.deviceNumStatus ? 'green' : 2 === scope.row.deviceNumStatus ? 'yellow' : 'red'"
                  style="width:100%;cursor: pointer;">{{ scope.row.deviceNumDesc }}</div>
              </template>
            </el-table-column>
            <el-table-column slot="parallelNum" label="并行个数" align="center" width="180">
              <template slot-scope="scope">
                <div @click="editParallel(scope.row)"
                  :class="1 === scope.row.parallelNumStatus ? 'green' : 2 === scope.row.deviceNumStatus ? 'yellow' : 'red'"
                  style="width:100%;cursor: pointer;">{{ scope.row.parallelNumDesc }}</div>
              </template>
            </el-table-column>
            <el-table-column slot="operate1" label="自动添加设备" align="center" width="120">
              <template slot-scope="scope">
                <el-row>
                  <el-button title="配置" type="primary" icon="el-icon-set-up" round size="mini"
                    @click="goEdit(scope.row)"></el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column slot="operate" label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-row>
                  <!-- <i class="el-icon-edit">IC卡</i>
                             <i class="el-icon-delete">删除</i> -->
                  <el-button title="添加专线包" type="primary" icon="el-icon-folder-add" round size="mini"
                    @click="addParallel(scope.row.id)"></el-button>
                  <el-button title="添加设备" type="primary" icon="el-icon-document-add" round size="mini"
                    @click="addDevice(scope.row.id, scope.row.limitDeviceNum)"></el-button>
                  <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini"
                    @click="deleteOwner(scope.row.id)"></el-button>
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

    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="previewImg" />
    <el-dialog :title="checkPopTitle" :visible.sync="checkPopVisible" width="30%" @close="closePop"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">
        <div v-if="popIndex == 1">
          <h4><span class="el-icon-warning icon-warning"></span>是否同意申请</h4>
          <p class="pl-30">{{ checkMsg }}</p>
        </div>
        <div v-if="popIndex == 2">
          <el-input v-model="checkForm.bindFailReseaon" type="textarea" maxlength="100" show-word-limit rows="5"
            placeholder="请输入拒绝原因"></el-input>
          <span v-if="showCheckTip" class="tip">请输入拒绝原因</span>
        </div>

      </div>
      <span slot="footer" class="dialog-footer" v-if="popIndex == 1">
        <el-button @click="clickRefuse">拒绝</el-button>
        <el-button type="primary" @click="checkAgree">同意</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="popIndex == 2">
        <el-button @click="cancelRefuse">取消</el-button>
        <el-button type="primary" @click="refuse">确定</el-button>
      </span>
    </el-dialog>
    <!-- 导出 -->
    <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>

    <!-- 授权状态 -->
    <auth-box :authPopVisible.sync="authPopVisible" :authPopTitle="authPopTitle" ref="authData"></auth-box>

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
    <el-dialog :title="isCreate ? '创建专线包资源池' : '编辑专线包资源池'" :visible.sync="dialogVisible" width="20%" class="pool-dialog">
        <el-form ref="poolForm" :model="poolForm" label-width="240px" :rules="rules" label-position="top">
            <el-form-item label="资源池名称" prop="resourcesName">
            <el-input v-model="poolForm.resourcesName" placeholder="请输入资源池名称" maxlength="68"></el-input>
        </el-form-item>
        <el-form-item label="每台相机最大播放客户端数量" prop="limitParallelNumPerDevice">
            <el-input v-model="poolForm.limitParallelNumPerDevice" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入每台相机最大播放客户端数量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isBtn" type="primary" @click="creatResources('poolForm')">确 定</el-button>
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
    <el-dialog :title="isOperate ? '选择专线包' : '专线包个数'" :visible.sync="dedicatedPoolDialogVisible" width="80%">
      <table-cmp v-loading="loading1" :table-data="tableData1" :table-label="tableLabel1" ref="tableChild1"
        :is-show-select="isShowSelect1">
      </table-cmp>
      <div class="block mt-10">
        <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
          :current-page="currentPage1" :page-sizes="[10, 15, 20, 25]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="total1"></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dedicatedPoolDialogVisible = false">取 消</el-button>
        <el-button v-show="isOperate" type="primary" @click="checkedDedicatedPool">确 定</el-button>

      </span>
    </el-dialog>
    <el-dialog title="选择设备" :visible.sync="deviceDialogVisible" width="60%">
      <!-- <div class="device-list">
     <el-checkbox-group v-model="selectDevice">
       <el-checkbox-button :label="item.id" v-for="(item,index) in deviceList" :key="index">{{item.name}}</el-checkbox-button>
    </el-checkbox-group>
  </div> -->
      <div class="row">
        <div class="col-sm-9 pl-0">
          <div class="col-sm-4 pl-0">
            <div class="form-group">
              <div class="col-md-12">
                <el-select v-model="deviceListForm.orgId" placeholder="选择机构" @change="deviceOrgChange">
                  <el-option v-for="item in orgIdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-sm-4 pl-0">
            <div class="form-group">
              <div class="col-md-12 pl-0">
                <el-select clearable v-model="deviceListForm.appId" placeholder="选择车场">
                  <el-option v-for="item in appIdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-sm-4 pl-0">
            <div class="form-group">
              <div class="col-md-12 pl-0">
                <el-input clearable style="width:100%" placeholder="请选择绑定的设备或序列号" v-model="deviceListForm.searchStr">
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 text-right flex-style">
          <div class="col-sm-12  p-0">
            <div class="btn-group">
              <button id="btn_device_search" type="button" class="btn btn-primary" @click="getDeviceList">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
              </button>
              <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn3">
                <span class="fa fa-reply" aria-hidden="true"></span>重置
              </button>
            </div>
          </div>
        </div>
      </div>
      <table-cmp v-loading="loading4" :table-data="tableData5" :table-label="tableLabel5" ref="tableChild5"
        :is-show-select="isShowSelect5">
      </table-cmp>
      <div class="block mt-10">
        <el-pagination @size-change="handleSizeChange5" @current-change="handleCurrentChange5"
          :current-page="currentPage5" :page-sizes="[10, 15, 20, 25]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="total5"></el-pagination>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deviceDialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="!isBtn" @click="checkedDevide">确 定</el-button>
        <el-button v-else type="primary" :loading="true">提交中</el-button>

      </span>
    </el-dialog>
    <el-dialog title="播放情况" :visible.sync="VideoPayDialogVisible" width="80%">
      <div class="row">
        <div class="col-sm-3">

          <el-radio-group v-model="resourcePoolBindedDeviceForm.playIng" size="medium" @change="radioChangeS"
            v-show="isFlag">
            <el-radio-button v-for="(item, index) in payStatusList" :key="index" :label="item.id">{{ item.name }}
            </el-radio-button>
            <!-- <el-radio-button :label="false">全部</el-radio-button>
                            <el-radio-button :label="true">播放中</el-radio-button>
                            <el-radio-button :label="true">未播放</el-radio-button> -->
          </el-radio-group>
          <el-button v-show="!isFlag" type="primary">播放中</el-button>
          <el-button size="medium" @click="unbindDeviceAll">批量解绑</el-button>
        </div>
        <div class="col-sm-9 text-right flex-style">
          <div class="col-sm-3">
            <div class="form-group">
              <div class="col-md-12">
                <el-select v-model="resourcePoolBindedDeviceForm.orgId" placeholder="选择机构" @change="videoOrgchang">
                  <el-option v-for="item in orgIdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <div class="col-md-12">
                <el-select clearable v-model="resourcePoolBindedDeviceForm.appId" placeholder="选择车场">
                  <el-option v-for="item in appIdList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-sm-3 pl-0">
            <div class="form-group">
              <div class="col-md-12">
                <el-input clearable style="width:100%" placeholder="请选择绑定的设备或序列号"
                  v-model="resourcePoolBindedDeviceForm.deviceSearch"></el-input>
              </div>
            </div>
          </div>
          <div class="col-sm-2  p-0 my-wth">
            <div class="btn-group">
              <button id="btn_device_search" type="button" class="btn btn-primary"
                @click="getResourcePoolBindedDevices">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
              </button>
              <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn2">
                <span class="fa fa-reply" aria-hidden="true"></span>重置
              </button>
            </div>
          </div>
        </div>
      </div>
      <table-cmp v-loading="loading2" :table-data="tableData2" :table-label="tableLabel2" ref="tableChild2"
        :is-show-select="isShowSelect2">
        <!-- <el-table-column slot="online" label="设备状态" align="center" width="150">
          <template slot-scope="scope">
            <img src="../../../assets/img/online.png" title="设备在线" v-if="scope.row.playing == 1" alt="">
            <img title="设备离线" v-else src="../../../assets/img/offline.png" alt="">
          </template>
        </el-table-column> -->
        <el-table-column slot="operate" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-row>
              <!-- <i class="el-icon-edit">IC卡</i>
                             <i class="el-icon-delete">删除</i> -->
              <el-button title="停止推流" type="primary" icon="el-icon-stopwatch" round size="mini"
                @click="stopPush(scope.row.deviceId)"></el-button>
              <el-button title="设备解绑" type="primary" icon="el-icon-document-remove" round size="mini"
                @click="unbindDevice(scope.row.deviceId)"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </table-cmp>
      <div class="block mt-10">
        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
          :current-page="currentPage2" :page-sizes="[10, 15, 20, 25]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="total2"></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="VideoPayDialogVisible = false">取 消</el-button>
        <el-button v-show="isFlag" type="primary" @click="checkedDedicatedPool">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="自动添加设备" :visible.sync="transferInstitutionVisible" width="53%">
      <div class="row" v-loading="loading3">
        <div class="col-sm-12">
          <el-tabs type="border-card" v-model="selectTab">
            <el-tab-pane label="机构" name="first">
              <p style="font-weight:bold;">自动将以下选中的机构设备加入资源池:</p>
              <el-transfer v-model="selectOrgId" :data="orgIdToDevice" :props="orgIdListDefaultProps"
                :titles="['可选机构', '已选机构']"></el-transfer>
              <br>
              <el-checkbox v-model="containChild">包含下级所有子机构</el-checkbox>
            </el-tab-pane>
            <el-tab-pane label="车场" name="second">
              <p style="font-weight:bold;">自动将以下选中的停车场设备加入资源池:</p>
              <el-tree :data="appIdToDevice" show-checkbox default-expand-all :default-checked-keys="checkedAppIds"
                @node-click="handleNodeClick" node-key="id" ref="tree" highlight-current :props="appIdDefaultProps"
                style="max-height: 333px;overflow-y: scroll;">
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferInstitutionVisible = false">取 消</el-button>
        <el-button v-if="!isBtn" type="primary" @click="setDataInfo">确 定</el-button>
        <el-button v-else type="primary" :loading="true">提交中</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./poolSpecialized.js"></script>
<style scoped lang="scss">
@import "./poolSpecialized.scss";

.my-wth {
  width: 13%;
}

.flex-style {
  display: flex;
  justify-content: flex-end;
}

.device-list {
  max-height: 407px;
  overflow-y: scroll;
}

.device-list .el-checkbox-group {
  width: 100%;
}

.device-list .el-checkbox-button {
  display: block;
  width: 100%;

  /deep/ .el-checkbox-button__inner {
    width: 100%;
    border-left: 1px solid #DCDFE6;
  }
}

/deep/ .el-transfer .el-transfer-panel {
  width: 372px;
}
.pool-dialog /deep/ .el-dialog__body{
  padding: 20px 20px 0 20px;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}
// .content-wrapper /deep/ .el-dialog{
//   top: 50%;
// }
// .content-wrapper /deep/ .el-tabs{
//     height:570px;
//      overflow: auto;
//     }
</style>
