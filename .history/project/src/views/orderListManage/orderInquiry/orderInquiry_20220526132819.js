import MsgBox from '../../../components/dialog.vue'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
import TableCmp from '../../../components/table.vue'
import Cookies from "js-cookie";

export default {
  name: 'home',
  data() {
    return {
      msg: '订单列表',
      currentPage: 1,
      popVisible:false,//是否显示信息弹框
      payDialogVisible:false,//支付二维码弹框
      payImg:'',
      orderName:'',
      orderAmount:0,
      payNum:null,
      socketUrl:'',
      userId:null,
      popTitle:'这个是标题',
      popContent:'这个是内容',
      total: 0,
      tableData: [],
      multipleSelection: [],//表格选中
      value: '',
      value1:'',
      dataForm:{
        orgId:Cookies.get("orgId"),//机构Id
        currentPage:1,
        pageSize:10,
        category:null,//产品类型 1：时长包 2：专线包，全部则为null，不传
        paid: null,//订单是否已支付 0:未支付，1：已支付，全部则为null，不传
        // sortProp: 'quantity',
        // sortOrder: 'descending'
        orders:null
      },
      productTypeList:[
        {
          name:'全部',
          id:''
        },
        {
          name:'激活包',
          id:3
        },
        {
          name:'专线包',
          id:2
        },
      ],
      payType:[{  
        value:'',
        label:'全部'
      },{  
        value:0,
        label:'未支付'
      },{  
        value:1,
        label:'已支付'
      }],
      tableLabel: [
        { label: '订单ID', param: 'orderId', align: 'left', sortable: false, isshow: false, width: '100' },
        { label: '所属机构', param: 'orgId', align: 'left', sortable: false, isshow: false, width: '100' },
        { label: '创建时间', param: 'createTime', align: 'center', sortable:"custom", isshow: true,width:'80'},
        { label: '产品类别', param: 'categoryName', align: 'center', sortable:"custom", isshow: true,width:'60'},
        { label: '产品名称', param: 'goodsDesc', align: 'center', sortable:"custom", isshow: true,width:'60'},
        { label: '规格', param: 'specificationDesc', align: 'left', sortable:"custom", isshow: true,width:'150'},
        { label: '数量', param: 'quantity', align: 'center', sortable:"custom",isshow:true,width:'60'},
        { label: '总价(元)', param: 'totalPrice', align: 'center', sortable:"custom",isshow:true,width:'60'},
        { label: '支付状态', param: 'paidDesc', align: 'center', sortable:"custom", isshow: true,width:'60'},
        { slot: 'operate', isshow: true }, // 操作列
      ],
      listData: [],//表格数据
      tableOption: [],
      tableSelect: [],
      isShowSelect: true,
      loading:false,
      imgurl:'',
      dialogVisible:false,
      activeNamePaytype:"second",
      timesLength:'',
      play_package:'',
      payTimes:'',
      paySpecialNum:'1',//购买专线数量,
      tiemsNum:1,//购买时长数量
      isMaster:false,
      durationGoodsList:[],//时长包
      specialGoodsMap:[],//专线包
      timespackAgeId:'',
      timesPackageprice:0,//时长包单价
      timesTotal:0,
      usefulLife:'',//有效期时间
      specialSubset:[],//专线包子集
      specialSubsetItem:[],
      deviceNum:0,//设备数
      specialPackageprice:0,//专线包单价
      specialPackageTotal:0,//专线包总价
      activePackAgeNum:1,//购买激活包数量
      activeTimesPackageprice:0,//激活包当个数量的价格
      timesActiveTotal:0,//激活包总价
      activePackAgeId:'',//激活包Id
      isBtn: false,
    }
  },
  filters: {

  },
  created() {
    this.isMaster = 'false' == Cookies.get("isMaster") ? false : true;
    for (let i = 0; i < this.tableLabel.length; i++) {
      if (this.tableLabel[i].label) {
        this.tableOption.push(this.tableLabel[i].label)
      }
      if (this.tableLabel[i].isshow) {
        this.tableSelect.push(this.tableLabel[i].label)
      }
    }
    this.imgurl = this.tools.global.API_URL;
  },
  computed: {

  },
  watch:{

  },
  components:{
    MsgBox,
    ExportBox,
    AuthBox,
    TableCmp
  },
  filters: {
    clTime: function(time) {
      return time.split(" ")[0];
    }
  },
  mounted() {
    this.getTableData();
    this.getgoods();
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

    //查看支付码
    goEdit(id){
      console.log(id)
      this.utils.http({
        url: `/wx/native/unifiedOrder?orderId=${id}`,
        method: "post",
      },
      res => {
        if(res.code == 200){
          if (!res.data.tradeState) {
            this.payImg = res.data.codeUrlStr; 
            this.orderName = res.data.goodsDesc;
            this.orderAmount = res.data.totalPrice;
            this.payNum = res.data.quantity
            this.payDialogVisible = true;
            this.socketApi.initWebSocket();
            this.websocketToLogin();
          } else {
            this.utils.tip("success",'订单购买成功!');
            this.getTableData();
          }
        }    
      });
    },


    //创建订单
    addSpecial(){
      this.activeNamePaytype = "second";
      this.dialogVisible = true;
    },

    addActivate(){
      this.activeNamePaytype = "third";
      this.dialogVisible = true;
    },

    onSubmit() {
      let formData = {
        goodsId:'',
        orderId:'',
        isWebmaster:this.isMaster,
        orgId:Cookies.get("orgId"),
        quantity:0,
      };
      if('first' == this.activeNamePaytype){
         if(0 == this.tiemsNum){
          this.$message.error('购买数量不能为0,请重新输入购买数量!');
          return ;
         }
         formData.goodsId = this.timesLength;
         formData.quantity = this.tiemsNum;
      }else if('second' == this.activeNamePaytype){
        if(0 == this.paySpecialNum){
          this.$message.error('购买数量不能为0,请重新输入购买数量!');
          return ;
        }
        if (this.isMaster) {
          formData.limitDeviceNum = parseInt(this.deviceNum);
        }
        formData.goodsId = this.payTimes;
        formData.quantity = this.paySpecialNum;
      }else {
        if(0 == this.activePackAgeNum){
          this.$message.error('购买数量不能为0,请重新输入购买数量!');
          return ;
         }
         formData.goodsId = this.activePackAgeId
         formData.quantity = this.activePackAgeNum;
      }
      this.isBtn = true;
      this.utils.http({
        url: "/order/create",
        method: "post",
        data:formData
      },
      res => {
        this.isBtn = false;
        if(res.code==200){
          this.dialogVisible = false;
          if (!this.isMaster) {
            this.payImg = res.data.codeUrlStr; 
            this.orderName = res.data.goodsDesc;
            this.orderAmount = res.data.totalPrice;
            this.payNum = res.data.quantity;
            this.payDialogVisible = true;
            this.socketApi.initWebSocket();
            this.websocketToLogin();
          } else {
            this.utils.tip("success",'订单购买成功!');
          }
          this.getTableData();
        }      
      });
    },

    //购买弹框
    pay(){
      this.dialogVisible = true;
    },

    handleClick(tab){
       this.activeNamePaytype = tab.name;
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

    //修改激活包数量
    changeActiveNumTimes(value){
      this.timesActiveTotal = parseInt(this.activeTimesPackageprice)*value
    },

    //激活包使用设备数量限制
    playChangedeviceNum(value) {
      if ('' == value) {
        this.deviceNum = 1
      }
    },

    //切换同时播放
    radioChangeP(e){
      let index = this.specialGoodsMap.indexOf(e);
      this.specialSubsetItem = this.specialSubset[index];
      this.payTimes = this.specialSubsetItem[0].id;
      this.deviceNum = this.specialSubsetItem[0].limitDeviceNum;
      this.specialPackageprice = this.specialSubsetItem[0].price;
      this.specialPackageTotal = parseInt(this.specialPackageprice)*parseInt(this.paySpecialNum);
    },


    //切换购买时长
    radioChangePayTimes(e){
       this.specialSubsetItem.map(item=>{
         if(item.id == e){
          this.specialPackageprice = item.price;
          this.deviceNum = item.limitDeviceNum;
         }
       })
       this.specialPackageTotal = parseInt(this.specialPackageprice)*parseInt(this.paySpecialNum)
    },


    payChangeNum(value){
       if(value > this.deviceNum){
          this.paySpecialNum = this.deviceNum;
      }
      if ('' == value) {
        this.paySpecialNum = 1;
      }
       this.specialPackageTotal = parseInt(this.specialPackageprice)*parseInt(this.paySpecialNum);
    },




    //查询
    querySearch(){
      this.dataForm.currentPage = 1;
      this.getTableData();
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

    //获取表格数据
    getTableData(){
      this.loading=true;
      let json = this.objfilter(this.dataForm);     
      this.utils.http({
        url: "/order/search",
        method: "post",
        data:json
      },
      res => {
        if(res.code==200){
          this.total=res.data.total
          this.listData=res.data.records;
          this.currentPage=res.data.current;
        }      
        this.loading=false;
      });  
    },

    sortableChange( obj ) {
      let order = [{'column':obj.prop,'asc':'ascending'==obj.order?true:false}];
      // this.dataForm.orders[0].column = obj.prop;
      //   this.dataForm.orders[0].asc = 'ascending'==obj.order?true:false;
      this.dataForm.orders = order;
      this.dataForm.propMap = {"categoryName":"category","paidDesc":"paid"};
      this.getTableData();
      
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
          this.specialGoodsMap = [];
          this.specialSubset = [];
          // this.specialGoodsMap = res.data.specialGoodsMap;
          if (res.data.durationGoodsList) {
            this.durationGoodsList = res.data.durationGoodsList;
            this.timesLength = res.data.durationGoodsList[0].id;
            this.timesPackageprice = res.data.durationGoodsList[0].price;
            this.timesTotal = parseInt(res.data.durationGoodsList[0].price)*parseInt(this.tiemsNum);
            this.usefulLife = res.data.durationGoodsList[0].updateTime;
          }
          if ( res.data.specialGoodsMap ) {
            console.log("specialGoodsMap:", res.data.specialGoodsMap);
            for ( let i in res.data.specialGoodsMap ) {
              console.log( "当个:", i );
              this.specialGoodsMap.unshift(res.data.specialGoodsMap[i][0].name+":"+i);
              this.specialSubset.unshift( res.data.specialGoodsMap[ i ] );
            }
            this.play_package =  this.specialGoodsMap[0];
            this.specialSubsetItem = this.specialSubset[0];
            this.payTimes = this.specialSubset[0][0].id;
            this.deviceNum = this.specialSubset[0][0].limitDeviceNum;
            this.specialPackageprice = this.specialSubset[0][0].price;
            this.specialPackageTotal = parseInt(this.paySpecialNum)*parseInt(this.specialPackageprice);
          }
          if (res.data.activationGoods) {
            this.activeTimesPackageprice = parseInt(res.data.activationGoods.price);
            this.timesActiveTotal = parseInt(res.data.activationGoods.price)*parseInt(this.activePackAgeNum)
            this.activePackAgeId = res.data.activationGoods.id;
          }
        }
      }); 
    },

    //重置
    resetBtn(){
      this.dataForm={
        currentPage:1,
        pageSize:10,
        category:null,
        paid:null,
        orgId: Cookies.get( "orgId" ),
        orders:null
      }
      this.getTableData();
    },


    //自定义表头
    checkboxChange(e) {
      console.log(this.tableSelect)
      for (let j = 0; j < this.tableLabel.length; j++) {
        if (this.tableSelect.indexOf(this.tableLabel[j].label) > -1) {
          this.tableLabel[j].isshow = true;
        } else {
          this.tableLabel[j].isshow = false;
        }
      }
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


    handleNodeClick(data) {
      console.log(data);
    },
    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //分页
    handleSizeChange(val) {
      this.dataForm.pageSize=val;
      this.getTableData();
    },
    handleCurrentChange(val) {
       this.dataForm.currentPage=val;
       this.getTableData();
    },
  },
}
