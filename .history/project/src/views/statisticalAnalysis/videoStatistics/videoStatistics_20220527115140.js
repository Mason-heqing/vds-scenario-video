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
      yearStartTime: '',
      yearEndTime: '',
      dataForm:{
        operateType:1,
        orgId:Cookies.get("orgId"),//机构
        startDate:'',
        endDate:'',
        webmaster: 'false' == Cookies.get( "isMaster" ) ? false : true,
       orders:null
      },
      videoPayLine:null,
      dateStrList:[],
      durationMaxNumList:[],
      tabOrgInfoList:[],
      pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
      },
      monthPickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      pickerStartYear: {
        disabledDate: time => {
          if (this.yearEndTime) {
            return time.getFullYear() > this.yearEndTime
          }
        }
      },
      pickerEndYear: {
        disabledDate: time => {
          return time.getFullYear() < this.yearStartTime
        }
      },
      tableLabel: [
        //{ label: '机构', param: 'orgName', align: 'left', sortable:"custom", isshow: true},
        { label: '时间', param: 'dateStr', align: 'left', sortable:"custom", isshow: true},
        // { label: '时长包峰值并行数', param: 'durationMaxNum', align: 'left', sortable:"custom", isshow: true},
        { label: '专线包峰值并行数', param: 'specialMaxNum', align: 'left', sortable:"custom", isshow: true},
        { label: '合计峰值', param: 'totalMax', align: 'left', sortable:"custom", isshow: true},
      ],
      listData: [],//表格数据
      isShowSelect: false,
      loading: false,
    }
  },

  watch: {
    
  },
  filters: {

  },
  created() {
    this.getTimeFn();
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
     this.$nextTick( () => {
       this.getListData();
     })
  },
  beforeDestroy() {
    if(this.videoPayLine) this.videoPayLine.clear();
  },
  methods: {
    //设置默认时间
    getTimeFn() {
        let nowDate = new Date();
        let cloneNowDate = new Date();
        let fullYear = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
        let endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
        let endDate = this.getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
        let starDate = this.getFullDate(cloneNowDate.setDate(1));//当月第一天
        this.timers = [starDate,endDate];
        this.dataForm.startDate = starDate.replace(/-/g,'');
        this.dataForm.endDate = endDate.replace(/-/g,'');
      },
  
      getFullDate(targetDate) {
        var D, y, m, d;
        if (targetDate) {
            D = new Date(targetDate);
            y = D.getFullYear();
            m = D.getMonth() + 1;
            d = D.getDate();
        } else {
            y = fullYear;
            m = month;
            d = date;
        }
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;
        return y + '-' + m + '-' + d;
    },
  
        /**
         * 格式化时间
        */
        formatDate(date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
  
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return myyear + "-" + mymonth;
        },
      //更改时间
      changeTime(e){
        console.log(e);
        if (this.timers !== null && this.timers.length > 0) {
          this.dataForm.startDate = this.timers[0].replace(/-/g,'');
          this.dataForm.endDate = this.timers[1].replace(/-/g, '');
          this.getListData();
        } else {
          this.dataForm.startDate  = "";
          this.dataForm.endDate  = "";
          this.timers = [];
        }
    },
    
      //更改月份
    changeMonth(e) {
      console.log(e);
      if (e !== null && e.length > 0) {
        this.dataForm.startDate = e[0].replace(/-/g,'');
        this.dataForm.endDate = e[1].replace(/-/g, '');
        this.getListData();
      } else {
        this.dataForm.startDate  = "";
        this.dataForm.endDate  = "";
        this.currentMonth = [];
      }
    },

    startYearChange(e) {
      this.dataForm.startDate = e;
      this.getListData();
    },

    endYearChange(e) {
      this.dataForm.endDate = e;
      this.getListData();
    },


    //切换年月日
    dateChange() {
      if (1 === this.dataForm.operateType) {
        this.$nextTick(() => {
          this.getTimeFn();
        })
      } else if (2 === this.dataForm.operateType) {
        this.currentMonth = [this.formatDate(new Date()), this.formatDate(new Date())];
        this.dataForm.startDate = this.currentMonth[0].replace(/-/g, '');
        this.dataForm.endDate = this.currentMonth[1].replace(/-/g,'');
      } else {
        this.yearStartTime = new Date().getFullYear().toString();
        this.yearEndTime = new Date().getFullYear().toString();
        this.dataForm.startDate = new Date().getFullYear().toString();
        this.dataForm.endDate = new Date().getFullYear().toString();
      }
      this.getListData();
    },

    sortableChange( obj ) {
      let order = [ { 'column': obj.prop, 'asc': 'ascending' == obj.order ? true : false } ];
      this.dataForm.orders = order;
      // this.dataForm.sortProp = obj.prop;
      // this.dataForm.sortOrder = obj.order;
      this.getListData();
    },
    

    //数据
    getListData() {
      this.loading = true;
      this.utils.http({
        url: "/stat/play/video",
        method: "post",
        data: this.dataForm
      },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.dateStrList = res.data.dateStrList;
            this.durationMaxNumList = res.data.durationMaxNumList;
            this.specialMaxNumList = res.data.specialMaxNumList;
            this.tabOrgInfoList = res.data.tabOrgInfoList;
            this.chartVideoPay();
          }
        });
    },

    //图形 - 播放统计
    chartVideoPay(){
      this.videoPayLine = this.$echarts.init(this.$refs.chartVideo);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [/*'时长包峰值并行数',*/ '专线包峰值并行数']
        },
        grid: {
          left: '1%',
          right: '1%',
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
        series: [
          // {
          //   name: '时长包峰值并行数',
          //   type: 'line',
          //   stack: 'Total',
          //   data: this.durationMaxNumList
          // },
          {
            name: '专线包峰值并行数',
            type: 'line',
            stack: 'Total',
            data: this.specialMaxNumList
          },
        ]
      };
      this.videoPayLine.setOption( option );
      window.addEventListener('resize', () => {
      if(this.videoPayLine){
        this.videoPayLine.resize();
      }
    })
    },

  },
}