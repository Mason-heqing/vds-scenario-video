import MsgBox from '../../../components/dialog.vue'
import FromDialog from '../../../components/fromDialog.vue'
import TableCmp from '../../../components/table.vue'
import Cookies from 'js-cookie';
export default {
  name: "order",
  data() {
    return {
      currentPage: 1,
      total: 0,
      timers: [],
      currentMonth: [],
      yearStartTime: "",
      yearEndTime: "",
      orderList: [],
      durationTotalPrice: 0, //时长包总金额
      specialTotalPrice: 0, //专线包总金额
      activateTotalPrice: 0, //激活包总金额
      totalPrice: 0, //所有订单总金额
      orderAnalysis: null,
      timesList: [],//X抽时间表
      orgList: [],//机构数据列表
      pieShowData:[],//图表中时间对应的机构数量
      dataForm: {
        operateType: 2,
        orgId: Cookies.get("orgId"), //机构
        startDate: "",
        endDate: "",
        webmaster: "false" == Cookies.get("isMaster") ? false : true,
        orders: null
        // sortProp: 'orgName',
        // sortOrder: 'descending'
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      monthPickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      pickerStartYear: {
        disabledDate: time => {
          if (this.yearEndTime) {
            return time.getFullYear() > this.yearEndTime;
          }
        }
      },
      pickerEndYear: {
        disabledDate: time => {
          return time.getFullYear() < this.yearStartTime;
        }
      },
      tableLabel: [
        //{ label: '机构', param: 'orgName', align: 'left', sortable:"custom", isshow: true},
        // {
        //   label: "时间",
        //   param: "dateStr",
        //   align: "left",
        //   sortable: "custom",
        //   isshow: true
        // },
        // // { label: '时长包(元)', param: 'durationTotalPrice', align: 'left', sortable: true, isshow: true},
        // {
        //   label: "专线包",
        //   param: "specialTotalPrice",
        //   align: "left",
        //   sortable: "custom",
        //   isshow: true
        // },
        // {
        //   label: "激活包",
        //   param: "activateTotalPrice",
        //   align: "left",
        //   sortable: "custom",
        //   isshow: true
        // },
        // {
        //   label: "合计",
        //   param: "totalPrice",
        //   align: "left",
        //   sortable: "custom",
        //   isshow: true
        // }
      ],
      tableOption: [],
      tableSelect: [],
      leftData: [], //左边侧边栏数据
      listData: [], //表格数据
      isShowSelect: false,
      loading: false,
      secHeaderData:[],
      tableData: [
        // {
        //   orgName: "机构1",
        //   specialTotalPrice: "123",
        //   activateTotalPrice: "2222",
        //   totalPrice: "6666"
        // },
        // {
        //   orgName: "机构1",
        //   specialTotalPrice: "123",
        //   activateTotalPrice: "2222",
        //   totalPrice: "6666"
        // },
        // {
        //   orgName: "机构1",
        //   specialTotalPrice: "123",
        //   activateTotalPrice: "2222",
        //   totalPrice: "6666"
        // },
        // {
        //   orgName: "机构1",
        //   specialTotalPrice: "123",
        //   activateTotalPrice: "2222",
        //   totalPrice: "6666"
        // }
      ]
    };
  },

  watch: {},
  filters: {},
  created() {
    this.getTimeFn();
  },
  components: {
    MsgBox,
    FromDialog,
    TableCmp
  },
  computed: {},
  beforeDestroy() {
    if (this.orderAnalysis) this.orderAnalysis.clear();
  },
  mounted() {
    this.$nextTick(() => {
      this.getListData();
    });
  },
  methods: {
    // 设置默认时间
    getTimeFn() {
      const that = this;
      if (1 == this.dataForm.operateType) {
        let nowDate = new Date();
        let cloneNowDate = new Date();
        let fullYear = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
        let endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
        let endDate = this.getFullDate(cloneNowDate.setDate(endOfMonth)); //当月最后一天
        let starDate = this.getFullDate(cloneNowDate.setDate(1)); //当月第一天
        this.timers = [starDate, endDate];
        this.dataForm.startDate = starDate.replace(/-/g, "");
        this.dataForm.endDate = endDate.replace(/-/g, "");
      } else if (2 === this.dataForm.operateType) {
        this.currentMonth = [
          this.formatDate(new Date()),
          this.formatDate(new Date())
        ];
        this.dataForm.startDate = this.currentMonth[0].replace(/-/g, "");
        this.dataForm.endDate = this.currentMonth[1].replace(/-/g, "");
      } else {
        this.yearStartTime = new Date().getFullYear().toString();
        this.yearEndTime = new Date().getFullYear().toString();
        this.dataForm.startDate = new Date().getFullYear().toString();
        this.dataForm.endDate = new Date().getFullYear().toString();
      }
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
      m = m > 9 ? m : "0" + m;
      d = d > 9 ? d : "0" + d;
      return y + "-" + m + "-" + d;
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
    changeTime(e) {
      console.log(e);
      if (this.timers !== null && this.timers.length > 0) {
        this.dataForm.startDate = this.timers[0].replace(/-/g, "");
        this.dataForm.endDate = this.timers[1].replace(/-/g, "");
        this.getListData();
      } else {
        this.dataForm.startDate = "";
        this.dataForm.endDate = "";
        this.timers = [];
      }
    },

    //更改月份
    changeMonth(e) {
      console.log(e);
      if (e !== null && e.length > 0) {
        this.dataForm.startDate = e[0].replace(/-/g, "");
        this.dataForm.endDate = e[1].replace(/-/g, "");
        this.getListData();
      } else {
        this.dataForm.startDate = "";
        this.dataForm.endDate = "";
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
        });
      } else if (2 === this.dataForm.operateType) {
        this.currentMonth = [
          this.formatDate(new Date()),
          this.formatDate(new Date())
        ];
        this.dataForm.startDate = this.currentMonth[0].replace(/-/g, "");
        this.dataForm.endDate = this.currentMonth[1].replace(/-/g, "");
      } else {
        this.yearStartTime = new Date().getFullYear().toString();
        this.yearEndTime = new Date().getFullYear().toString();
        this.dataForm.startDate = new Date().getFullYear().toString();
        this.dataForm.endDate = new Date().getFullYear().toString();
      }
      this.getListData();
    },

    //数据
    getListData() {
      this.loading = true;
      this.utils.http(
        {
          url: "/stat/order/search",
          method: "post",
          data: this.dataForm
        },
        res => {
          this.loading = false;
          if ( res.code == 200 ) {
            if ( res.data && res.data.length ) {
              let secHeaderColumn = [];
              let tableData = [];
              let timesArr = [];
              let pieOrgList = [];
              let pieData = [];
              res.data.forEach( ( item, index ) => {
                //列表数据
                let json = {};
                let pieJson = {};
                json.orgName = item.orgName;
                json.totalPrice = item.totalPrice;
                pieOrgList.push( item.orgName );//将机构传入数组,用于图表
                //图表数据每个机构对应时间所展示的金额数据
                 let currentOrgData = [];
                pieJson.name = item.orgName;
                if ( '合计' == item.orgName ) {
                  pieJson.type = "line";
                } else {
                  pieJson.type = "bar";
                }
                  item.statList.forEach(d => {
                    currentOrgData.push(d.totalPrice);
                  } );
                
                 pieJson.data = currentOrgData;
                 pieData.push( pieJson );
                if (index == 0) {
                  item.statList.forEach( item1 => {
                  
                    //二级表头
                    let secHeaderJson = {};
                    secHeaderJson.orderDay = item1.orderDay.toString();
                    secHeaderJson.speciaName = "专线包";
                    secHeaderJson.activateName = "激活包";
                    secHeaderJson.spciaNameParam = item1.orderDay + "specialTotalPrice";
                    secHeaderJson.activateParam = item1.orderDay + "activateTotalPrice";
                    secHeaderColumn.push( secHeaderJson );
                    
                    json[ item1.orderDay + "specialTotalPrice" ] = item1.specialTotalPrice;
                    json[ item1.orderDay + "activateTotalPrice" ] = item1.activateTotalPrice;
                    
                    //图表时间获取
                    timesArr.push(item1.orderDay.toString());
                    
                 });
                } else {
                  item.statList.forEach( item2 => {
                    json[item2.orderDay + "specialTotalPrice"] =
                      item2.specialTotalPrice;
                    json[item2.orderDay + "activateTotalPrice"] =
                      item2.activateTotalPrice;
                  })
                }
                tableData.push( json );
                
              } )
              this.secHeaderData = secHeaderColumn;
              console.log("数据源", tableData);
              this.tableData = tableData;//table数据
              this.timesList = timesArr;//X抽时间表
              this.orgList = pieOrgList;//图表展示机构
              this.pieShowData = pieData;
              this.parkingRevenues();
            } else {
            }
          }
        }
      );
    },

    //初始化表头
    initHeaderColumn(data) {
      let formHeaderData = [];
      data.forEach( ( item, index ) => {
        let json = {};
        if (0 === index) {
          json.label = "机构";
          json.param = "orgName";
          json.align = "left";
          json.sortable = "custom";
          json.isshow = true;
        } else if (data.length-1 === index) {
          json.label = "合计";
          json.param = "totalPrice";
          json.align = "left";
          json.sortable = "custom";
          json.isshow = true;
        } else {
          json.secHeader = true;
          json.isshow = true;
          json.secHeaderData = item.secHeaderColumn;
        }
        formHeaderData.push(json);
      } );
      this.tableLabel = formHeaderData;
      console.log("表头:", this.tableLabel);
    },

    sortableChange(obj) {
      let order = [
        { column: obj.prop, asc: "ascending" == obj.order ? true : false }
      ];
      this.dataForm.orders = order;
      // this.dataForm.sortProp = obj.prop;
      // this.dataForm.sortOrder = obj.order;
      this.getListData();
    },

    //订单统计
    parkingRevenues() {
                        this.orderAnalysis = this.$echarts.init(
                          this.$refs.parkingRevenue,
                          "light"
                        );
                        let option = {
                          // color: ["#00BFFF", "#9AFF9A", "#EEC900", "#7A67EE"],
                          legend: {
                            data: this.orgList
                          },
                          xAxis: {
                            type: "category",
                            data: this.timesList
                          },
                          yAxis: {
                            type: "value"
                          },
                          tooltip: {
                            trigger: "axis",
                            axisPointer: {
                              type: "shadow"
                            }
                          },
                          series: this.pieShowData
                        };

                        this.orderAnalysis.setOption(option);
                        window.addEventListener("resize", () => {
                          this.orderAnalysis.resize();
                        });
                      }
  }
};