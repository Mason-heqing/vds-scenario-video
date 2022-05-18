import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: 'home',
  data() {
    return {
      timers: [],
      currentMonth: [],
      yearTime: '',
      dataForm:{
        activateYear:null,
        // orgId:Cookies.get("orgId"),//机构
      },
      videoPayLine:null,
      dateStrList:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      durationMaxNumList:[],
      tabOrgInfoList:[],
      tableLabel: [],
      listData: [],//表格数据
      dataInfo:[],
      isShowSelect: false,
      loading: false,
    }
  },

  watch: {
    
  },
  filters: {

  },
  created() {
    this.defaultYaer();
  },
  components: {
    MsgBox,
    FromDialog,
    TableCmp
  },
  computed: {
  },
  watch:{

  },
  mounted() {
    this.initTableData();  
    this.getListData();
    window.addEventListener('resize', () => {
      if(this.videoPayLine){
        this.videoPayLine.resize();
      }
    })
  },
    methods: {
        columnStyle({row, column, rowIndex, columnIndex}) {
            if (this.tabOrgInfoList.length-1 === rowIndex && columnIndex === 0) {
                return "font-weight:bold;color:#333";
            }

            
        },
        headerStyle({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 13) {
                return "font-weight:bold;color:#333";
            }
        },
        //数字转大写
        toChinesNum(num){
            let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
            let unit = ["", "十", "百", "千", "万"];
            num = parseInt(num);
            let getWan = (temp) => {
                let strArr = temp.toString().split("").reverse();
                let newNum = "";
                for (var i = 0; i < strArr.length; i++) {
                    newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]]  + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
                }
                return newNum;
            }
            let overWan = Math.floor(num / 10000);
            let noWan = num % 10000;
            if (noWan.toString().length < 4) noWan = "0" + noWan;
            return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num).length>1?getWan(num).substring(1):getWan(num);
            
        },

        //数组某个属性求和
        countTotal(arr, keyName) {
            let $total = 0;
            $total = arr.reduce(function (total, currentValue){
                return currentValue[keyName] ? (total + currentValue[keyName]) : total;
            }, 0);
            return $total;
        },
    
     //初始化表格数据
      initTableData() {
          let formLabel = [];
          let dataFirst = {
              label: '机构', param: 'orgName', align: 'left', sortable: true, isshow: true
          };
          let dataLast = {label: '合计', param: 'orgActiveTotal', align: 'left', sortable: true, isshow: true,className:'font-weight-900'}
          formLabel.unshift(dataFirst);
          for (let i = 1; i <= 12; i++){ 
              let json = {
                label: `${this.toChinesNum(i)}月`, param:`${i}`, align: 'left', sortable: true, isshow: true
              }
              formLabel.push(json);
          } 
          formLabel.push(dataLast);

          this.tableLabel = formLabel
    }, 
      
    //默认年份 今年
    defaultYaer() {
          this.yearTime = new Date().getFullYear().toString();
          this.dataForm.activateYear = new Date().getFullYear();
    },  
    

    currentYearChange(e) {
      this.dataForm.activateYear = e;
      this.getListData();
    },
    
    
    //数据
    getListData() {
      this.loading = true;
      this.utils.http({
        url: "/stat/video/device/activate/record",
        method: "post",
        data: this.dataForm
      },
        res => {
          this.loading = false;
            if (res.code == 200) {
                this.dataInfo = res.data.statVideoDeviceActivateRecordDtoList || [];
                if (res.data.statVideoDeviceActivateRecordDtoList && res.data.statVideoDeviceActivateRecordDtoList.length > 0) {
                    let arr = [];
                    res.data.statVideoDeviceActivateRecordDtoList.forEach((item) => {
                        let json = {};
                        let total = 0;
                        item.activateNumList.reduce((pre,cur) => {
                            total = pre + cur;
                            return total;
                        })
                        item.activateNumList.forEach((list, idx) => {
                           json[idx+1] = list 
                        })
                        console.log("@@", json)
                        json.orgName = item.orgName;
                        json.orgActiveTotal = total;
                        arr.push(json);
                    });
                    let orgNumTotal = {};
                    for (let i in this.tableLabel) {
                        if (this.tableLabel[i].param == 'orgName') {
                            orgNumTotal[this.tableLabel[i].param] = '合计';
                        } else{
                            orgNumTotal[this.tableLabel[i].param] = this.countTotal(arr, this.tableLabel[i].param);
                        }
                        
                    }
                    arr.push(orgNumTotal);
                    this.tabOrgInfoList = arr; 
                } else {
                    this.tabOrgInfoList = [];
                }   
                this.chartVideoPay();
          }
        });
    },

    //图形 - 播放统计
    chartVideoPay() {
        let orgName = [];
        let dataShow = [];
      if (this.dataInfo.length>0) {
          this.dataInfo.forEach((item, index) => {
              let json = {};
              orgName.push(item.orgName);
              json.name = item.orgName;
              json.type = 'line';
              json.stack = 'Total';
              json.data = item.activateNumList;
              dataShow.push(json);
          })
        }
      console.log("@@@@@#",dataShow)  
      this.videoPayLine = this.$echarts.init(document.getElementById('chartVideo'));
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: orgName
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dateStrList
        },
        yAxis: {
          type: 'value'
        },
          series:dataShow
      };
      this.videoPayLine.setOption(option,true);
    },

  },
}