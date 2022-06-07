import HeaderDiv from '../../components/header.vue';
import footerDiv from '../../components/footer.vue';
import Sidebar from '../../components/sidebar.vue';
import Cookies from "js-cookie";
export default {
  name: 'home',
  data() {
    return {
      msg: '首页',
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      specialPackageTotalNum:0,//专线包总数
      specialPackageUnuseTotalNum:0,//未使用的专线包总数
      specialPackageInvalidTotalNum:0,//无效的专线包总数
      specialPoolNum:0,//专线池数量
      specialPackageParallelTotalNum: 0,//当前专线包用量
      specialPackageLimitParallelTotalNum: 0, //当前专线包总路数限制
      videoActivatePackageUseNum: 0,//当前激活包已使用数量
      videoActivatePackageTotalNum: 0,//当前激活包购买总数量
      videoActivatePackageNum:0,//当前激活包剩余总数量
      durationPackageTotalNum:0,//时长包总数
      durationPackageUseNum:0,//当前使用中的时长包
      durationPackageNotUseNum:0,//未使用的时长包
      deviceTotalNum:0,//设备总数，单位：台
      deviceOnlineNum:0,//在线设备数，单位：台
      devicePlayVideoNum:0,//视频播放的设备数量，单位：台
      totalPrice:0,//消费金额，单位：元
      parentPrice:0,//本账户消费金额，单位：元
      childPrice:0,//下属账户消费金额，单位：元
      mayNotSpecialPackageTotalNum:0,//专线包未使用总数
      maySpecialPackageTotalNum:0,//专线包已使用总数
      useNotPlayVideoDeviceNum:0,//不可播放视频设备数量
      usePlayVideoDeviceNum:0,//可播放视频设备数量
      orgList:[],
      specialTimes:[],//专线包时间表
      pieSpecialPackage:null,
      pieDurationRate:null,
      columnarDuration: null,
      pieActivatePackage:null,//激活包总利率
      chartParallelPackageResourcePoolLine:null,
      chartpayVideoLine:null,
      timeStrList:[],//剩余时长包时间表
      deviceNumListRemainingTimes:[],//剩余时长设备数
      specialForm:{
        orgId:Cookies.get("orgId"),
        isWebmaster:'false' == Cookies.get("isMaster")?false:true,
        startTime:'',
        endTime:'',
      },
      videoDateStrList:[],//播放时间表
      playNumList:[],//最大同时播放路数列表
      condition: {},
      $tab_list: null,
      timeArr:[],
      timeout:45000,
      timer:null,
      realTimeList:[],
      currentToken:'',
      recordContentPop:false,
      contentMsg:{},//识别记录详情
    }
  },
  components: {
    Sidebar,
    HeaderDiv,
    footerDiv
  },
  computed: {
    
  },
  watch:{
   
  },
  filters: {

  },
  created() {
    this.currentToken=this.utils.getUUID();
    // this.socketApi.initWebSocket();
    // this.websocketToLogin();
  },
  mounted() {
    this.getTimeFn();
    this.getTopInfo();//获取头部信息
    this.$nextTick( () => {
      this.getPlayVedio();//获取视频播放数量
      this.getRealTimesDuration();//获取实时专线包数据
      this.getRealTimesPackage();//获取时长包数据
    })

    let date = new Date();
      let year =date.getFullYear();
      let month =date.getMonth()+1; 
      let ri=date.getDate()
      if(month<10){
        month='0'+month
      }
      if(ri<10){
        ri='0'+ri
      }
    window.addEventListener('resize', () => {
      if(this.pieSpecialPackage){
        this.pieSpecialPackage.resize();
      }
      // if(this.pieDurationRate){
      //   this.pieDurationRate.resize();
      // }
      if(this.columnarDuration){
        this.columnarDuration.resize();
      }
      if(this.chartParallelPackageResourcePoolLine){
        this.chartParallelPackageResourcePoolLine.resize();
      }
      if(this.chartpayVideoLine){
         this.chartpayVideoLine.resize();
      }
    })

  },
  beforeDestroy() {
    if ( this.pieSpecialPackage ) this.pieSpecialPackage.clear();
    if ( this.columnarDuration ) this.columnarDuration.clear();
    if ( this.chartParallelPackageResourcePoolLine ) this.chartParallelPackageResourcePoolLine.clear();
    if ( this.chartpayVideoLine ) this.chartpayVideoLine.clear();
  },
  methods: {
    //获取userId
    
    // 心跳检测 每隔一段时间主动推送 证明客户端活着
    heartCheckStart() {
      this.timer = setInterval(() => {
        let date=new Date();
        let HeartBeat={
          type:"WS_HEARTBEAT",
          requestId:this.utils.getUUID(),
          timestamp:this.utils.formatTimestamp(date),
          token:this.currentToken,
        }
      //  var cmd = JSON.stringify(HeartBeat);
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
        // console.log('心跳发送成功，发送时间：', new Date().toLocaleString('zh'))
      }, this.timeout)
      
    },
    getConfigResult (res) {
      // 接收回调函数返回数据的方法
      // console.log(res)
      if(res.type=='WS_REGISTER'){
        // console.log('注册成功')
        this.websocketGetData();
        this.heartCheckStart();
      }else if(res.type=='WS_PUBLISH_FACE'){
        this.realTimeList.unshift(res.body)
        console.log(this.realTimeList,'00++')
      }
    },
    //注册
    websocketToLogin () {
      let date=new Date();
      let HeartBeat={
        type:"WS_REGISTER",
        requestId:this.utils.getUUID(),
        timestamp:this.utils.formatTimestamp(date),
        token:this.currentToken,
      }
    //  var cmd = JSON.stringify(HeartBeat);
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
    },
    //订阅实时记录
    websocketGetData(){
      var appids=this.appId.split(',')
      let date=new Date();
      let HeartBeat={
        type:"WS_SUBSCRIBE_FACE",
        requestId:this.utils.getUUID(),
        timestamp:this.utils.formatTimestamp(date),
        token:this.currentToken,
        body: {
          applist: appids
        }
      }
    //  var cmd = JSON.stringify(HeartBeat);
      // 【agentData：发送的参数；this.getConfigResult：回调方法】
      this.socketApi.sendSock(HeartBeat, this.getConfigResult)
    },
    


    changeSocket() {
      this.$store.commit('changeData', '这个是改变之后的信息')
    },
    //实时记录
    timeRecord(){
      // var nice='2e74ef743548421abb72acd4b82e649d'
      this.utils.http({
        url: "/home/page/realTimeRecord",
        method: "GET",
        params: {appId:this.appId}
        // params: {appId:nice}
      },
      res => {
        if(res.code==200){
          this.realTimeList=res.data;
        }
        
      });  
    },


    colorRandom(){
      var color = "#";
      var randomArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];//这是颜色构成的所有情况
      for (var i=0;i<6;i++) {
          color += randomArr[parseInt(Math.random()*15)];
      }
      return color;
    },

    
    getTimeFn(){
      var newDay=new Date();
      var year=newDay.getFullYear();
      var month=newDay.getMonth()+1;
      var day=newDay.getDate();
      month=month<10?"0"+month:month;
      day=day<10?"0"+day:day;
      console.log(year+"-"+month+"-"+day)
      this.timeArr = [year+"-"+month+"-"+day+" "+"00:00:00",year+"-"+month+"-"+day+" "+"23:59:59"];
      this.specialForm.startTime = year+"-"+month+"-"+day+" "+"00:00:00";
      this.specialForm.endTime = year+"-"+month+"-"+day+" "+"23:59:59";
      console.log("日期:",this.timeArr);
    },


    //获取头部数据
    getTopInfo(){
      this.loading = true;
      this.utils.http({
        url: "/stat/dashboard/top/search",
        method: "POST",
        data: {orgId:Cookies.get("orgId"),isWebmaster:'false' == Cookies.get("isMaster")?false:true}
        // params: {appId:nice}
      },
      res => {
        this.loading = false;
        if (res.code == 200) {
           this.videoActivatePackageNum = res.data.videoActivatePackageNum ||0;
           this.videoActivatePackageTotalNum = res.data.videoActivatePackageTotalNum ||0;
           this.videoActivatePackageUseNum = res.data.videoActivatePackageUseNum ||0;
           this.childPrice = res.data.childPrice ||0;
           this.deviceOnlineNum = res.data.deviceOnlineNum ||0;
           this.devicePlayVideoNum = res.data.devicePlayVideoNum ||0;
           this.deviceTotalNum = res.data.deviceTotalNum ||0;
           this.durationPackageNotUseNum = res.data.durationPackageNotUseNum ||0;
           this.durationPackageTotalNum = res.data.durationPackageTotalNum ||0;
           this.durationPackageUseNum = res.data.durationPackageUseNum ||0;
           this.parentPrice = res.data.parentPrice ||0;
           this.specialPackageTotalNum = res.data.specialPackageTotalNum ||0;
           this.specialPackageUnuseTotalNum = res.data.specialPackageUnuseTotalNum ||0;
           this.specialPackageParallelTotalNum = res.data.specialPackageParallelTotalNum ||0;
           this.specialPackageLimitParallelTotalNum = res.data.specialPackageLimitParallelTotalNum ||0;
           this.specialPackageInvalidTotalNum = res.data.specialPackageInvalidTotalNum ||0;
           this.specialPoolNum = res.data.specialPoolNum||0;
          this.totalPrice = res.data.totalPrice || 0;
          this.chartActivatePackageRate();
        }
        
      }); 
    },

    //获取实时专线包数据
    getRealTimesDuration(){
      this.loading1 = true;
      this.utils.http({
        url: "/stat/dashboard/special/search",
        method: "POST",
        data:this.specialForm
        // params: {appId:nice}
      },
      res => {
        this.loading1 = false;
        if(res.code==200){
           this.mayNotSpecialPackageTotalNum = res.data.mayNotSpecialPackageTotalNum;
           this.maySpecialPackageTotalNum = res.data.maySpecialPackageTotalNum;
           this.orgList = res.data.orgUseEfficiencyList;
          this.specialTimes = res.data.dateStrList;
          this.chartParallelPackageRate();
            this.chartSpecialPoolOrgIdStatistics();
          
        }
        
      });  
    },

    //获取实时时长包数据
    getRealTimesPackage(){
      this.loading2 = true;
      this.utils.http({
        url: "/stat/dashboard/duration/search",
        method: "POST",
        data: {orgId:Cookies.get("orgId"),isWebmaster:'false' == Cookies.get("isMaster")?false:true}
        // params: {appId:nice}
      },
      res => {
        this.loading2 = false;
        if(res.code==200){
           this.useNotPlayVideoDeviceNum = res.data.useNotPlayVideoDeviceNum;
           this.usePlayVideoDeviceNum = res.data.usePlayVideoDeviceNum;
           this.timeStrList = res.data.timeStrList;
           this.deviceNumListRemainingTimes = res.data.deviceNumList;
          //  this.chartTimesPackAgePayRate();
          //  this.chartRemainingTimeLine();
        }
        
      });
    },


    //获取视频播放数
    getPlayVedio(){
      this.loading3 = true;
      this.utils.http({
        url: "/stat/dashboard/play/video",
        method: "POST",
        data:{orgId:Cookies.get("orgId"),isWebmaster:'false' == Cookies.get("isMaster")?false:true}
        // params: {appId:nice}
      },
      res => {
        this.loading3 = false;
        if(res.code==200){
           this.videoDateStrList = res.data.dateStrList;
          this.playNumList = res.data.playNumList;
          this.chartPayVideoStatistics();
        
        }
        
      }); 
    },

    //图形- 专线包总利率
    chartParallelPackageRate() {
        let maySpecialPackageTotalNum = Math.floor(this.specialPackageParallelTotalNum / this.specialPackageLimitParallelTotalNum*100) ||0;
        this.pieSpecialPackage = this.$echarts.init(
          this.$refs.chartSpecialPackageRate
        );
        if (this.pieSpecialPackage) {
          this.pieSpecialPackage.setOption({
            series: [
              {
                type: "gauge",
                // radius: ["50%", "70%"],
                grid: {
                  left: "0",
                  right: "0",
                  bottom: "0%",
                  containLabel: true
                },
                progress: {
                  show: true,
                  width: 18
                },
                axisLine: {
                  lineStyle: {
                    width: 18
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 5,
                  lineStyle: {
                    width: 2,
                    color: "#999"
                  }
                },
                axisLabel: {
                  distance: 25,
                  color: "#999",
                  fontSize: 12
                },
                anchor: {
                  show: true,
                  showAbove: true,
                  size: 10,
                  itemStyle: {
                    borderWidth: 10
                  }
                },
                title: {
                  show: false
                },
                detail: {
                  valueAnimation: true,
                  fontSize: 30,
                  offsetCenter: [0, "70%"]
                },
                data: [
                  {
                    value: maySpecialPackageTotalNum
                  }
                ]
              }
            ]
          });
        }
    },
    

    //图形-激活包总利率
    chartActivatePackageRate() {
       this.pieActivatePackage = this.$echarts.init(
         this.$refs.activatePackageRate
      );
      if (this.pieActivatePackage) {
        this.pieActivatePackage.setOption({
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: "5%",
            left: "center"
          },
          series: [
            {
              name: "激活包总利率",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2
              },
              label: {
                show: false,
                position: "center",
                formatter: function(p) {
                  //指示线对应文字,百分比
                  return p.percent + "%";
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "20",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: this.videoActivatePackageNum,
                  name: "已使用",
                  itemStyle: { color: "#00bfff" }
                },
                {
                  value: this.videoActivatePackageUseNum,
                  name: "未使用",
                  itemStyle: { color: "#9acd32" }
                }
              ]
            }
          ]
        });
      }
    },


    //图形- 时长包设备可播放率 
    chartTimesPackAgePayRate(){
      this.pieDurationRate = this.$echarts.init( this.$refs.chartRemainingTimes );
         if (this.pieDurationRate) {
            this.pieDurationRate.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '时长包设备可播比率',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center',
              formatter: function (p) {   //指示线对应文字,百分比
                return p.percent + "%";
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.useNotPlayVideoDeviceNum, name: '不可播放',itemStyle: { color: '#bdb76b' }},
              { value: this.usePlayVideoDeviceNum, name: '可播放',itemStyle: { color: '#daa520' }},
            ]
          }
        ]})
         }
     
    },


    //图形- 剩余时长统计
    chartRemainingTimeLine(){
       this.columnarDuration = this.$echarts.init( this.$refs.chartColumnar );
      if ( this.columnarDuration ) {
           let option = {
        color:['#6cacde','rgb(200,200,169)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.timeStrList,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '剩余设备数',
            type: 'bar',
            barWidth: '40%',
            data: this.deviceNumListRemainingTimes
          }
        ]
      };
        this.columnarDuration.setOption( option );
        }
    },


    //图形- 专线包资源池机构统计
    chartSpecialPoolOrgIdStatistics(){
     this.chartParallelPackageResourcePoolLine = this.$echarts.init( this.$refs.chartParallelPackageResourcePool );
      if (this.chartParallelPackageResourcePoolLine) {
           let orgName = [];
      let orgTlist = [];
      this.orgList.forEach(item=>{
        orgName.push(item.specialName)
        let json = {};
        let _lineStyle = {
          normal:{
            width:1
          }
        };
        let _itemStyle = {
          normal:{
            color:this.colorRandom(),
            borderColor:this.colorRandom(),
            borderWidth:10
          }
        }
        json.name = item.specialName;
        json.type = 'line';
        json.smooth = true;
        json.symbol = 'circle';
        json.symbolSize = 1;
        json.showSymbol = false;
        json.lineStyle = _lineStyle;
        json.itemStyle = _itemStyle;
        json.data = item.useEfficiencyList;
        orgTlist.push(json);
      })

      let option = {
        title: {
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            // color: "#F1F1F3",
          },
          left: "6%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B",
            },
          },
        },
        legend: {
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: orgName,
          right: "4%",
          textStyle: {
            fontSize: 16,
            // color: "",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.specialTimes,
          }
        ],
        yAxis: [
          {
            // type: "value",
            name: "百分比",
            max:100,
            min:0,
            interval:20,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: "#CCC",
              },
            },
          },
        ],
        series: orgTlist
      };
      this.chartParallelPackageResourcePoolLine.setOption(option);
        }
      
    },


    //图形- 视频播放统计
    chartPayVideoStatistics(){
       this.chartpayVideoLine = this.$echarts.init( this.$refs.chartVideo );
      if (this.chartpayVideoLine) {
          if (this.chartpayVideoLine) {
         let option = {
        color:['#6cacde','rgb(200,200,169)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.videoDateStrList,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '最大同时播放路数',
            type: 'bar',
            barWidth: '40%',
            data: this.playNumList
          }
        ]
        };
        this.chartpayVideoLine.setOption(option)
      }
        }
      
    },
    
    //搜索的时间改变
    changeTime(e){
      this.specialForm.startTime = e[0];
      this.specialForm.endTime = e[1];
      this.getRealTimesDuration()
    },




    
  },
}
