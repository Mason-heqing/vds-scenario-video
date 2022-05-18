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
      currentPage: 1,
      currentPage1: 1,
      popVisible: false,//是否显示信息弹框
      popTitle: '这个是标题',
      popContent: '这个是内容',
      payDialogVisible:false,//支付二维码弹框
      payImg:'',
      orderName:'',
      orderAmount:0,
      payNum:null,
      socketUrl:'',
      userId:null,
      total: 0,
      multipleSelection: [],//表格选中
      tableData: [],
      tableLabel: [
        // { label: '激活码', param: 'activationCode', align: 'center', sortable: true ,isshow:true,width:'120'},     
        { label: '时长(小时)', param: 'duration', align: 'center', sortable: true ,isshow:true,width:'120'},
        { label: '购买时间', param: 'purchaseTime', align: 'center', sortable: true ,isshow:true,width:'100'},
        { label: '绑定设备S/N', param: 'bindTarget', align: 'center',isshow:true, sortable: true,width:'120'},
        { label: '激活时间', param: 'activationTimeFormat', align: 'center',isshow:true, sortable: true ,width:'100'},
        { label: '过期时间', param: 'expireTimeFormat', align: 'center',isshow:true, sortable: true ,width:'100'},
	    	{ label: '剩余时长', param: 'remainingSecondsFormat', align: 'center',isshow:true, sortable: true ,width:'100'},
		    { label: '来源', param: 'sourceFormat', align: 'center',isshow:false, sortable: true ,width:'100'},
        { label: '是否转让', param: 'transfered', align: 'center',isshow:true, sortable: true ,width:'100',render(h) {
           return 1 === h.transfered?"已转让":'未转让'
        },},
        { label: '绑定状态', param: 'bindedFormat', align: 'center',isshow:true, sortable: true ,width:'100'},
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
      total1:1,
      tableOption1:[],
      tableSelect1: [],
      loading:false,
      cascaderData:[],
      groupProps: {
        children:'groups',
        label:'name',
        value:'id',
        checkStrictly:true,
        expandTrigger: 'hover'
      },
      popIndex:1,//审核弹框
      checkPopVisible:false,
      checkPopTitle:'审核',
      checkForm:{
        bindStatus:'',//状态
        id:'',
        bindFailReseaon:'',//不通过原因
      },
      checkMsg:'',//审核的信息
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
	    timePacketForm:{
        currentPage:1,
        pageSize:10,
        orgId:Cookies.get("orgId"),//机构
        transferFlag:false,
        category:1,//商品类别，1：时长包 2：专线包
        source:'',//来源：0：随设备赠送，1：购买，2：转让，不传为null，则表示全部
        timesLength:'',//时长
        binded:'',//绑定状态：0：未绑定，1：已绑定，不传为null，则表示全部
        deviceSearch:'',//设备搜索
	  },
    isMaster:false,//管理员权限
	  sourceType:[//来源方式
      {
        name:'全部',
        id:null
      },
      {
        name:'随设备赠送',
        id:0
      },
		  {
			  name:'购买',
			  id:1
		  },
		  {
		   	name:'转让',
			  id:2
	   	},
	  ],
	  statusList:[
		  {
        name:'全部',
        id:null
		  },
		  {
			  name:'已绑定',
			  id:1
		  },
		  {
			  name:'未绑定',
			  id:0
		  }
	  ],
	  dialogVisible:false,
	  activeNamePaytype:'first',
    tiemsNum:1,//时长包数量
    timesTotal:0,//时长包总价
    timesPackageprice:0,//时长包单价
    usefulLife:null,//有效期
    durationGoodsList:[],
    timesLength:'',//规格
	  exportVisible:false,//导入模块
	  activationCode:'',//激活码,
	  transferInstitutionVisible:false,//转让机构模块
    isBtn:false,
    mechanismDialogVisible:false,//机构弹框
    selectMechanism:'',//选择机构
    mechanismList:[],//机构列表
    deviceDialogVisible:false,//设备弹框
    selectDevice:'',//选择设备
    deviceList:[],//设备列表
    toolForm:{},
    toolType:null,
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
    this.isMaster = 'false' == Cookies.get("isMaster") ? false : true;
    this.imgurl = this.tools.global.API_URL;
  },
  computed: {
    appId:{
      get(){
        return this.$store.state.project.projectId
      },
      set(v){
        this.$store.commit('changeProjectId', v)
      }
    }
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
      this.getgoods();
    this.getPersonList();
    this.getWebsocketUrl();
  },
  destroyed(){
    if(this.payImg && '' != this.payImg){
      this.socketApi.websocketclose();
    }
  },
  methods: {

    //websocket start
   //注册
   websocketToLogin(){
    let HeartBeat={
      type:"WS_SUBSCRIBE",
      userId:this.userId
    }
    // 【agentData：发送的参数；this.getConfigResult：回调方法】
    this.socketApi.sendSock(HeartBeat, this.getConfigResult)
   },

   getConfigResult (res) {
    // 接收回调函数返回数据的方法
    console.log('接收回调函数返回数据的方法',res);
    if(res.type=='WS_SUBSCRIBE'){
      // console.log('订阅成功')
    }else if(res.type=='WS_PAY_COMP'){
      this.payDialogVisible = false;
      this.utils.tip('success','支付成功!');
      this.socketApi.websocketclose();
      this.getTableData();
    }
    },
   
  //websocket end
   
   
   //获取socket地址
   getWebsocketUrl(){
    this.utils.http({
      url: "/wx/native/getNativeSocketUrl",
      method: "post",
    },
    res => {
      if(res.code == 200){
         this.socketUrl = res.data;
         Cookies.set("payWebsocketUrl",res.data.webSocketUtl);
         this.userId = res.data.userId;
      }
      console.log("获取socket地址",res);      
    });
  },

    //切换转让状态
    radioChangeS(value){
      this.timePacketForm.transferFlag = value;
      this.getPersonList();
    }, 

    //切换来源
    sourceChange(){
      this.getPersonList();
    },

   //切换绑定状态
   bindChange(){
     this.getPersonList();
   },
   
	//购买弹框
	paySelect(){
      this.dialogVisible = true;
	},


  radioChangeG(id){
    this.timespackAgeId = id
    this.durationGoodsList.map(item=>{
      if(item.id == id){
        this.timesPackageprice = item.price
        this.usefulLife = item.updateTime
      }
    })

    if(this.tiemsNum == ''){
        this.timesTotal = 0;
    }else{
      this.timesTotal = parseInt(this.timesPackageprice)*this.tiemsNum
    }
  },

  
  changeNumTimes(value){
    this.timesTotal = parseInt(this.timesPackageprice)*value
  },

  onSubmit() {
    let formData = {
      goodsId:'',
      orderId:'',
      orgId:Cookies.get("orgId"),
      isWebmaster:this.isMaster,
      quantity:0,
    };
    if(0 == this.tiemsNum){
      this.$message.error('购买数量不能为0,请重新输入购买数量!');
      return ;
     }else if(10000 <= this.tiemsNum){
      this.$message.error('购买数量不能超过10000个,请重新输入购买数量!');
      return ;
     }
     formData.goodsId = this.timesLength;
     formData.quantity = this.tiemsNum;
    this.isBtn = true;
    this.utils.http({
      url: "/order/create",
      method: "post",
      data:formData
    },
      res => {
        this.isBtn = false;
        if (res.code == 200) {
          this.dialogVisible = false;
          if (!this.isMaster) {
            this.payImg = res.data.codeUrlStr; 
            this.orderName = res.data.goodsDesc;
            this.orderAmount = res.data.totalPrice;
            this.payNum = res.data.quantity
            this.payDialogVisible = true;
            this.socketApi.initWebSocket();
            this.websocketToLogin();
          } else {
            this.utils.tip('success','订单支付成功')
           }
        this.getPersonList();
      }      
    });
  },

  //操作 //转让或绑定
  gooperation(row,type){
    if(1 === type){
      this.mechanismDialogVisible = true;
    this.getmechanism();
    this.toolForm = {
      category:1,
      operateObjectId:'',
      operateType:2,
      packageIdList:[row.id],
      orgId:Cookies.get("orgId")
    }
    }else{
      this.deviceDialogVisible = true;
      this.getDevice();
      this.toolForm = {
        category:1,
        operateObjectId:'',
        operateType:1,
        packageIdList:[row.id],
        orgId:Cookies.get("orgId")
      }
    }
    this.toolType = type;
  },

  //获取机构列表
  getmechanism(){
    this.utils.http({
      url: `/org/search/child?orgId=${Cookies.get("orgId")}`,
      method: "POST",
    },
    res => {
      if(res.code==200){
        this.mechanismList = res.data;
      }
      
    }); 
  },


  //获取设备列表
  getDevice(){
    this.utils.http({
      url: `/org/search/child/device?orgId=${Cookies.get("orgId")}`,
      method: "POST",
    },
    res => {
      if(res.code==200){
        this.deviceList = res.data.deviceList;
      }
      
    }); 
  },


  //选择机构
  checkedMechanism(){
    if('' == this.selectMechanism){
      this.$message.error('请选择机构!');
    }else{
      this.toolForm.operateObjectId = this.selectMechanism;
      console.log("选择机构:",this.toolForm);
      this.dataSend(this.toolForm,this.toolType)
    }
  },

  //选择设备
  checkedDevide(){
    if('' == this.selectDevice){
      this.$message.error('请选择设备!');
    }else{
      this.toolForm.operateObjectId = this.selectDevice;
      this.dataSend(this.toolForm,this.toolType)
    }
  },



  dataSend(v,type){
    this.isBtn = true;
    this.utils.http({
      url: "/videoPackage/operate",
      method: "POST",
      data: v
    },
    res => {
      this.isBtn = false;
      if(1 == type){
        this.mechanismDialogVisible = false;
        this.selectMechanism = '';
      }else{
        this.deviceDialogVisible = false;
        this.selectDevice = '';
      }
      if(res.code==200){
        this.utils.tip('success',`${type===1?'转让成功':'绑定成功'}`);
        this.getPersonList()
      }
      
    }); 
  },


  //获取商品Id
  getgoods(){
    this.utils.http({
      url: "/goods/tab",
      method: "post",
      // data:this.dataForm
    },
    res => {
      if(res.code==200){
        this.durationGoodsList = res.data.durationGoodsList;
        this.timesLength =  res.data.durationGoodsList[0].id;
        this.timesPackageprice = res.data.durationGoodsList[0].price;
        this.timesTotal = parseInt(res.data.durationGoodsList[0].price)*parseInt(this.tiemsNum);
        this.usefulLife = res.data.durationGoodsList[0].updateTime;
      }
    }); 
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

    //批量转让弹框
	assignmentBtn(){
    let all= this.$refs.tableChild.selectData;
    if(0 >= all.length){
      this.$message.error('请先选择时长包 !');
      return;
    }
    let ids = [];
    all.forEach((item,index)=>{
      ids.push(item.id)
    })
    this.deviceDialogVisible = true;
    this.getmechanism();
    this.toolForm = {
      category:1,
      operateObjectId:'',
      operateType:2,
      packageIdList:ids,
      orgId:Cookies.get("orgId")
    }
    this.toolType = 1;
      // this.transferInstitutionVisible = true;

	},


  //批量绑定弹框
  allBindBtn(){
    let all= this.$refs.tableChild.selectData;
    if(0 >= all.length){
      this.$message.error('请先选择时长包 !');
      return;
    }
    let ids = [];
    all.forEach((item,index)=>{
      ids.push(item.id)
    })
    this.deviceDialogVisible = true;
    this.getDevice();
    this.toolForm = {
      category:1,
      operateObjectId:'',
      operateType:1,
      packageIdList:ids,
      orgId:Cookies.get("orgId")
    }
    this.toolType = 2;
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

    //对象过滤 返回新的对象
    objfilter(obj){
      let json = {};
       for(let i in obj){
         if(obj[i] !== '' && obj[i] !== null){
            json[i] = obj[i]
         }
       } 
       return json
    },

    //视频-时长包列表
    getPersonList(){
      this.loading=true; 
      let json = this.objfilter(this.timePacketForm);      
      this.utils.http({
        url: "/videoPackage/search",
        method: "POST",
        data:json
      },
      res => {
        this.loading=false;
        if(res.code==200){
          this.total=res.data.total;
          this.tableData=res.data.records;
          this.currentPage=res.data.current;         
        }       
      });  
    },
    //审核列表
    getCheckList(){
      this.utils.http({
        url: "/person/queryHouseholderByPage",
        method: "POST",
        data: this.PersonListForm1
      },
      res => {
        if(res.code==200){
          this.total1=res.data.total;
          this.tableData1=res.data.records;
          this.currentPage1=res.data.current;     
        }
        
      });  
    },
      //下拉改变
      cascaderChange(e){
        if(e){
          this.PersonListForm.groupId=e[e.length-1]
        }
        
      },
    //重置
    resetBtn(){
      this.timePacketForm={
        currentPage:1,
        pageSize:10,
        orgId:Cookies.get("orgId"),//机构
        transferFlag:false,
        category:1,//商品类别，1：时长包 2：专线包
        source:'',//来源：0：随设备赠送，1：购买，2：转让，不传为null，则表示全部
        timesLength:'',//时长
        binded:'',//绑定状态：0：未绑定，1：已绑定，不传为null，则表示全部
        deviceSearch:'',//设备搜索
      }
      this.getPersonList()
    },
    
    //导出
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

    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    //分页
    handleSizeChange(val) {
      this.timePacketForm.pageSize=val;
      this.getPersonList();
    },
    handleCurrentChange(val) {
       this.timePacketForm.currentPage=val;
       this.getPersonList();
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

  },
}