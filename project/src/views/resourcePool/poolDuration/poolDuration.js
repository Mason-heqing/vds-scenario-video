import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import TableBmp from '../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
import Cookies from "js-cookie";
export default {
  name: 'home',
  data() {
    return {
      msg: '视频资源-时长包',
      isBtn:false,
      currentPage: 1,
      currentPage1: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [
        { label: '机构', param: 'orgName', align: 'center', sortable: true ,isshow:true,width:'120'},     
        { label: '项目(车场)', param: 'appName', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '设备序列号', param: 'deviceSerial', align: 'center', sortable: true ,isshow:true,width:'100'},
        { label: '设备名称', param: 'deviceName', align: 'center',isshow:true, sortable: true,width:'120'},
        { label: '时长包个数', param: 'durationPackageNum', align: 'center',isshow:true, sortable: true ,width:'100'},
        { label: '可播时长', param: 'specificationDesc', align: 'center',isshow:true, sortable: true ,width:'100'},
		    { label: '剩余时长', param: 'remainingSecondsDesc', align: 'center',isshow:true, sortable: true ,width:'100'},
		    { label: '播放状态', param: 'videoPlayingDesc', align: 'center',isshow:true, sortable: true ,width:'100'},
        { slot: 'operate',isshow:true }, // 操作列
      ],

      tableOption:[],
      tableSelect: [],
      activeName: 'first',
      isShowSelect:true,
      personType:[{
        value: '1',
        label: '户主'
      },{
        value: '2',
        label: '家庭成员'
      },{
        value: '3',
        label: '租客'
      },{
        value: '5',
        label: '其他'
      }],
      orgIdList:[],
      appIdList:[],
      pageVo:{
        appId:'',
        orgId:Cookies.get("orgId"),
        category:1,
        deviceSearch:'',
        currentPage:1,
        pageSize:10,
      },
      TimesBindDeviceIdList:[],
      timesPackAgeList:[],
      timesPackAgeDialogVisible:false,//选择时长包弹框
      timesPackAgeForm:{
        deviceIdList:[],
        packageIdList:[],
      },
      resourcesDialogVisible:false,//选择资源池弹框
      resourcesList:[],//资源池列表
      resourcesId:'',//选择资源池
      TipsdialogVisible:false,
      tipsList:[],
      PersonListForm:{
        appId:"",
        pageNum:1,
        pageSize:10,
        personName:'',//人名门牌号
        subtype:'',//人员类型
        groupId:'',//选中房屋最后一级的ids
      },
      PersonListForm1:{//住户审核列表
        appId:"",
        pageNum:1,
        pageSize:10,
        personName:'',//姓名或手机号
        subtype:'',//人员类型
        time:'',
        bindStatus:'',//审核状态
      },
      total1:1,
      tableOption1:[],
      tableSelect1: [],
      loading:false,
      loading1:false,
      loading2:false,
      cascaderData:[],
      showCheckTip:false,
      outPop:false,
      outChecked:false,
      previewImg:[],//图片预览
      showViewer:false,
      imgurl:'',
      tabIndex:0,
      importPop:false,//批量导入弹框
      fileList:[],
      uploadData:{//上传额外参数appid
        appId:''
      },
      authPopVisible:false,//授权弹框
      authPopTitle:'',
      authId:'',//授权人员的id
      authName:'',//授权人员的name
      isExport:false,
      exportUrl:'',
      exportErrList:[],//导入失败的数据
      exporterrPop:false,
      timer:null,
      elcascaderkey:1,
	  transferType:'我的',
	  timePacketForm:{
		source:'',
		timesLength:''
		// bindStatus
	  },
	  sourceType:[//来源方式
		  {
			  name:'购买',
			  id:1
		  },
		  {
			name:'赠送',
			id:2
		},
	  ],
	  statusList:[
		  {
            name:'全部',
			id:0
		  },
		  {
			  name:'已绑定',
			  id:1
		  },
		  {
			  name:'为绑定',
			  id:2
		  }
	  ],
	  dialogVisible:false,
	  activeNamePaytype:'first',
	  exportVisible:false,//导入模块
	  activationCode:'',//激活码,
	  transferInstitutionVisible:false,//转让机构模块
	  props: {
		label: 'name',
		children: 'zones'
	  },
	  count: 1
    }
  },
 
  filters: {

  },
  created() {
    // for (let i = 0; i < this.tableLabel.length; i++) {
    //   if(this.tableLabel[i].label){
    //     this.tableOption.push(this.tableLabel[i].label)
    //   }
    //   if(this.tableLabel[i].isshow){
    //     this.tableSelect.push(this.tableLabel[i].label)
    //   }
    // }

    // this.imgurl = this.tools.global.API_URL;
  },
  computed: {
    // appId:{
    //   get(){
    //     return this.$store.state.project.projectId
    //   },
    //   set(v){
    //     this.$store.commit('changeProjectId', v)
    //   }
    // }
  },
  watch:{
    
  },
  components: {
    MsgBox,
    TableCmp,
    TableBmp,
    ElImageViewer,
    ExportBox,
    AuthBox
  },
  mounted() {
   this.getApplist(); 
   this.getmechanism(); 
   this.getTableData();
  },
  methods: {
   
	//购买弹框
	paySelect(){
      this.dialogVisible = true;
	},

	//导入弹框
	exportModel(){
      this.exportVisible = true;
	},

    //START 树形结构
	handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
    },
	//END 树形结构

    elCascaderOnlick() {
      let that = this;
      setTimeout(function() {
        document.querySelectorAll(".el-cascader-node__label").forEach(el => {
          el.onclick = function() {
            this.previousElementSibling.click();
            that.$refs.elcascader.dropDownVisible = false;
          };        
        });
        
        document.querySelectorAll(".el-cascader-panel .el-radio").forEach(el => {
          el.onclick = function() {
            that.$refs.elcascader.dropDownVisible = false;
          };
        });
          
      }, 100);
    },

    //转让弹框
	assignmentBtn(){
      this.transferInstitutionVisible = true;
	},

    //动态表头数据
    checkboxChange(e){
        for (let j = 0; j < this.tableLabel.length; j++) {
          if(this.tableSelect.indexOf(this.tableLabel[j].label)>-1){
            this.tableLabel[j].isshow=true;
          }else{
            this.tableLabel[j].isshow=false;
          }           
        }
    },
    checkboxChange1(e){
      for (let j = 0; j < this.tableLabel1.length; j++) {
        if(this.tableSelect1.indexOf(this.tableLabel1[j].label)>-1){
          this.tableLabel1[j].isshow=true;
        }else{
          this.tableLabel1[j].isshow=false;
        }           
      }
  },

  //获取车场列表
  getApplist(){
    this.utils.http({
      url: `/org/search/child/app?orgId=${Cookies.get("orgId")}`,
      method: "POST",
    },
    res => {
      if(res.code==200){
        this.appIdList = res.data;
      }
      
    }); 
  },

  //获取机构列表
  getmechanism(){
    this.utils.http({
      url: `/org/search/select?orgId=${Cookies.get("orgId")}`,
      method: "POST",
    },
    res => {
      if(res.code==200){
        // this.pageVo.orgId = res.data[0].orgId

        this.orgIdList = res.data;
      }
      
    }); 
  },

  //获取时长包列表
  getTiemsPackAgeList(){
    this.loading1 = true;
    this.utils.http({
      url: `/pool/duration/search/select?orgId=${Cookies.get("orgId")}`,
      method: "POST",
    },
    res => {
      this.loading1 = false;
      if(res.code==200){
        res.data.forEach(item => {
            item.timesPackAgeNum = 0;
        })
        this.timesPackAgeList = res.data;
      }
      
    });
  }, 

  //获取资源池列表
  getResourceslist(){
    this.loading2 = true;
    this.resourcesDialogVisible = true;
    this.utils.http({
      url: `/pool/specialized/search/select?orgId=${Cookies.get("orgId")}`,
      method: "POST",
    },
    res => {
      this.loading2 = false;
      if(res.code==200){
        this.resourcesList = res.data;
      }
      
    });
  },

  //批量选择时长包
  allDistributionTimesPack(){
   let all = this.$refs.tableChild.selectData;
   if(all.length === 0){
     this.$message.error('请选择设备');
     return;
   }
   let arr = [];
   all.forEach((item,index)=>{
     arr.push(item.deviceId);
   })
   this.TimesBindDeviceIdList = arr;
   this.getTiemsPackAgeList();
   this.timesPackAgeDialogVisible = true;
  },
   
  //选择时长包
  sendTimesPackAge(){
    let arr = [];
    this.timesPackAgeList.forEach((item,index) =>{
       let json = {};
       json.duration = item.duration;
       json.durationDesc = item.durationDesc;
       json.packageNum = parseInt(item.timesPackAgeNum);
       arr.push(json);
    })
    let jsonSend = {
      deviceIdList:this.TimesBindDeviceIdList,
      orgId:Cookies.get("orgId"),  
      packageNumDtoList:arr
    }
    this.isBtn = true;
    this.utils.http({
      url: "/pool/duration/add/package",
      method: "POST",
      data: jsonSend
    },
    res => {
      this.isBtn = false;
      this.loading=false;
      if(res.code==200){
        this.timesPackAgeDialogVisible = false;
        this.utils.tip('success','时长包添加成功');
         this.getTableData();
      }     
    }); 

  },

  timesChange(value,index){
    if(parseInt(this.timesPackAgeList[index].packageNum) <= value){
      this.timesPackAgeList[index].timesPackAgeNum = parseInt(this.timesPackAgeList[index].packageNum)
    }else if(value.indexOf(0) === 0){
      this.timesPackAgeList[index].timesPackAgeNum = 0;
    }else if(value === ''){
      this.timesPackAgeList[index].timesPackAgeNum = 0;
    }
  },


   //添加时长包
   addTimesPackAge(row){
     console.log(row);
    this.getTiemsPackAgeList();
     this.TimesBindDeviceIdList = [];
     this.TimesBindDeviceIdList.push(row.deviceId);
     this.timesPackAgeList.forEach((item,index)=>{
       item.timesPackAgeNum = 0;
     })
     this.timesPackAgeDialogVisible = true;
   },

    //时长资源池列表获取
    getTableData(){
      this.loading=true;   
      this.utils.http({
        url: "/pool/duration/search",
        method: "POST",
        data: this.pageVo
      },
      res => {
        this.loading=false;
        if(res.code==200){
          if(res.data && res.data.records.length > 0){
            this.total=res.data.total;
            this.tableData=res.data.records;
            this.currentPage=res.data.current;     
          }else{
            this.total = 0;
            this.tableData = [];
            this.currentPage = 1;
          }   
        }else{
            this.total = 0;
            this.tableData = [];
            this.currentPage = 1;
        }       
      });  
    },

    //资源池弹框
    outResources(row){
      this.TimesBindDeviceIdList = [row.deviceId];
      this.getResourceslist();   
    },

    //批量资源池设置
    allOutResources(){
      let all = this.$refs.tableChild.selectData;
      if(all.length === 0){
        this.$message.error('请选择设备');
        return;
      }
      let deviceIdList = [];
      all.forEach((item,index)=>{
        deviceIdList.push(item.deviceId);
      })
      this.TimesBindDeviceIdList = deviceIdList;
      this.getResourceslist();  
    },

    //选择资源池
    selectResource(){
      if(this.resourcesId == ''){
        this.$message.error('请选择资源池');
        return 
      }
      let jsonSend = {
        deviceIdList:this.TimesBindDeviceIdList,
        orgId:Cookies.get("orgId"),  
        specializedPoolId:this.resourcesId
      }
      this.utils.http({
        url: "/pool/duration/bind/specializedPool",
        method: "POST",
        data: jsonSend
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.resourcesDialogVisible = false;
          // this.utils.tip('success','移入专线池成功!');
          this.tipsList = res.data;
          this.TipsdialogVisible = true;
          this.getTableData();
        }     
      }); 
    },

    //重置
    resetBtn(){
      this.pageVo={
        appId:'',
        orgId:Cookies.get("orgId"),
        category:1,
        deviceSearch:'',
        currentPage:1,
        pageSize:10,
      },
      this.getTableData()
    },
    closePop(){
      this.popIndex=1;
      this.checkPopTitle='审核';
      this.checkForm.bindFailReseaon='';
    },
    open () {
      this.timer=setTimeout(()=>{
        this.popVisible = false;
        clearTimeout(this.timer)
      },3000)      
    },
    clearSetTimeOut(){
      clearTimeout(this.timer)
    },
    //批量删除
    batchDelete(){
      let ids=[];
      let all= this.$refs.tableChild.selectData;
      all.forEach((item,index)=>{
        ids.push(item.id)
      })
      if(ids.length==0){
        this.popVisible=true;//是否显示信息弹框
        this.popTitle='提示';
        this.popContent='请先选择要删除的住户';
        this.open()
      }else{
        this.$confirm("您确信删除选中的住户?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.utils.http({
            url: "/person/batchDeleteHousehold",
            method: "POST",
            data: {appId:this.appId,personIdList:ids}
          },
          res => {
            if(res.code==200){
              this.utils.tip('success','删除成功');
              this.getTableData()
            }        
          });  
        })
        .catch(() => {
          
        });
      }
    },
    //go增加页
    goAdd() {
      this.$router.push({
        path: '/ownermanageadd',
        query:{
          type:'1',
        }
      })
    },
    //全部住户导出
    exportBtn(){
      this.outPop=true;
    },
    outBtn(){
      this.isExport=true;
      //所有住户导出
      if(this.tabIndex==0){
        this.outChecked=this.$refs.exportData.outChecked;
        if(this.outChecked){
          this.PersonListForm.withPic=1;
        }else{
          this.PersonListForm.withPic=0;
        }
        let ids=[];
        let all= this.$refs.tableChild.selectData;
        all.forEach((item,index)=>{
          ids.push(item.id)
        })
        this.PersonListForm.ids=ids;
        this.utils.http({
          url: "/person/personExport",
          method: "POST",
          data: this.PersonListForm
        },
        res => {
          this.isExport=false;
          this.outPop=false;
          delete this.PersonListForm.ids;//删除ids属性  防止查询报错
          if(res.code==200){
            this.$alert('人员正在导出请稍后', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('人员导出失败', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'error',
            }).then(() => {
             
            }).catch(() => {});
          }
          
        });  
      }else if(this.tabIndex==1){//审核住户导出
        this.outChecked=this.$refs.exportData.outChecked;
        if(this.outChecked){
          this.PersonListForm1.withPic=1;
        }else{
          this.PersonListForm1.withPic=0;
        }
        let ids=[];
        let all= this.$refs.tableChild1.selectData;
        all.forEach((item,index)=>{
          ids.push(item.id)
        })
        this.PersonListForm1.ids=ids;
        this.utils.http({
          url: "/person/houseExport",
          method: "POST",
          data: this.PersonListForm1
        },
        res => {
          this.isExport=false;
          this.outPop=false;
          delete this.PersonListForm1.ids;//删除ids属性  防止查询报错
          if(res.code==200){
            this.$alert('人员正在导出请稍后', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'success',
            }).then(() => {
             
            }).catch(() => {});
          }else{
            this.$alert('人员导出失败', '提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              closeOnClickModal:true,
              type:'error',
            }).then(() => {
             
            }).catch(() => {});
          }
        });  
      }
      
    },


  // 关闭查看器
  closeViewer() {
    this.showViewer = false
  },

    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.PersonListForm.pageSize=val;
      this.getTableData();
    },
    handleCurrentChange(val) {
       this.PersonListForm.pageNum=val;
       this.getTableData();
    },

    handleSizeChange1(val) {
      this.PersonListForm1.pageSize=val;
      this.getCheckList();
    },
    handleCurrentChange1(val) {
       this.PersonListForm1.pageNum=val;
       this.getCheckList();
    },
    handleClick(tab, event) {
      if(tab.index==0){
        this.tabIndex=0;
      }else if(tab.index==1){
        this.tabIndex=1;
      }
    },



    submitUpload() {
      if(this.fileList.length>0){
        this.$refs.upload.submit();
      }else{
        this.$message.error('请选择文件');
      }
    },
    //文件选择变化
    selectChange(file,fileList){    
      var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
      let types = ['zip'];
      const isZip = types.includes(fileType);
      if (!isZip) {
        this.$message.error('只支持.zip压缩文件');
        this.fileList=[];
        return false
      }
      this.fileList=fileList;
    },
   //上传之前
   beforeAvatarUpload(file,fileList){
    var fileType=file.name.substring(file.name.lastIndexOf('.')+1)
    let types = ['zip'];
    const isZip = types.includes(fileType);
    const isLtSize = file.size / 1024 / 1024 < 128;
    if (!isZip) {
      this.$message.error('只支持.zip压缩文件');
      return false
    }
    if (!isLtSize) {
      this.$message.error('文件大小不能超过 128MB!');
      return false
    }
    //提示弹框
    this.importPop=false;
    this.popVisible=true;//是否显示信息弹框
    this.popTitle='提示';
    this.popContent='人员正在导入请稍后';
  },
  //上传成功
  successCheck(response, file, fileList) {
    console.log(response);
    this.$refs.upload.clearFiles()
    this.popVisible=false;
    if (response.code == 200) {
      if(response.data.isOpen==1){
        this.exportErrList=response.data.list;
        this.exporterrPop=true;
      }else if(response.data.isOpen==0){
        this.$alert('人员导入成功', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          closeOnClickModal:true,
          type:'success',
        }).then(() => {
         
        }).catch(() => {});
      }else if(response.data.isOpen==2){
        this.$message.error('模板解析异常');
      }
         
    }else{
      this.$message.error(response.msg);
    }   
  },
  //删除
  removeFile(){
    this.fileList=[];
  },
  //上传失败
  uploadErr(err, file, fileList){
    this.$message.error('导入失败');
  },
    //删除图片
    remove(index) {
        this.images.splice(index, 1);
    },
    exceed(){
      this.$message.error('不支持多文件上传');
    },

    //查看授权状态
    goView(id,name){
      this.authPopVisible=true;
      this.authId=id;
      this.authPopTitle=name;
    },
  },
}