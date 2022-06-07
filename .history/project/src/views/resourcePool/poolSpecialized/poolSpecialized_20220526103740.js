import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import TableBmp from '../../../components/nice.vue'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
import ligature from '../../../utils/ligature.js';
import Cookies from "js-cookie";
export default {
  name: "home",
  data() {
    let validateNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("客户端播放数不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error("请输入数字值"));
        } else {
          console.log("@@@", value);
          if (parseInt(value) < 1) {
            callback(new Error("客户端播放数不能少于1"));
          } else if (parseInt(value) > 99) {
            callback(new Error("客户端播放数不能大于99"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      msg: "视频资源-时长包",
      isBtn: false,
      currentPage: 1,
      currentPage1: 1,
      popVisible: false, //是否显示信息弹框
      popTitle: "这个是标题",
      popContent: "这个是内容",
      total: 0,
      isCreate: true,
      poolId: "",
      multipleSelection: [], //表格选中
      tableData: [],
      tableLabel: [
        {
          label: "id",
          param: "id",
          align: "left",
          sortable: false,
          isshow: false,
          width: "100"
        },
        {
          label: "orgId",
          param: "orgId",
          align: "left",
          sortable: false,
          isshow: false,
          width: "100"
        },
        { slot: "editResourceName", isshow: true },
        // { label: '资源池名称', param: 'name', align: 'center', sortable: true ,isshow:true,width:'120'},
        {
          label: "创建时间",
          param: "createTime",
          align: "center",
          sortable: "custom",
          isshow: true,
          width: "80"
        },
        {
          label: "机构数",
          param: "orgNum",
          align: "center",
          sortable: "custom",
          isshow: false,
          width: "60"
        },
        {
          label: "项目(车场)数",
          param: "appNum",
          align: "center",
          isshow: false,
          sortable: "custom",
          width: "60"
        },
        { slot: "editPackageNum", isshow: true, width: "60" },
        // { label: '专线包个数', param: 'packageNum', align: 'center',isshow:true, sortable: true ,width:'100'},
        { slot: "devicesNum", isshow: true },
        // { label: '已绑定设备数/总限制数', param: 'deviceNumDesc', align: 'center',isshow:true, sortable: true ,width:'100'},
        { slot: "parallelNum", isshow: true },
        // { label: '播放路数/总路数限制', param: 'parallelNumDesc', align: 'center',isshow:true, sortable: true ,width:'100'},
        // { label: '自动添加设备', param: 'icNum', align: 'center',isshow:true, sortable: true ,width:'100'},
        { slot: "operate1", isshow: true },
        { slot: "operate", isshow: true } // 操作列
      ],
      tableData1: [], //专线包列表
      tableLabel1: [
        {
          label: "ID",
          param: "id",
          align: "center",
          sortable: false,
          isshow: false,
          width: "120"
        },
        {
          label: "产品名称",
          param: "goodsName",
          align: "center",
          sortable: "custom",
          isshow: true,
          width: "80"
        },
        {
          label: "规格",
          param: "specificationDesc",
          align: "center",
          sortable: "custom",
          isshow: true,
          width: "80"
        },
        {
          label: "有效时长",
          param: "durationDesc",
          align: "center",
          sortable: "custom",
          isshow: true,
          width: "80"
        },
        {
          label: "可绑设备数",
          param: "limitDeviceNum",
          align: "center",
          isshow: true,
          sortable: "custom",
          width: "80"
        },
        {
          label: "购买时间",
          param: "purchaseTimeFormat",
          align: "center",
          isshow: true,
          sortable: "custom",
          width: "120"
        },
        {
          label: "过期时间",
          param: "expireTimeFormat",
          align: "center",
          isshow: true,
          sortable: "custom",
          width: "120"
        },
        // { label: '剩余时间', param: 'remainingSecondsFormat', align: 'center',isshow:false, sortable: true ,width:'80'},
        {
          label: "来源",
          param: "sourceFormat",
          align: "center",
          isshow: false,
          sortable: true,
          width: "80"
        },
        { slot: "operate", isshow: true } // 操作列
      ],
      isOperate: false,
      deviceDialogVisible: false, //设备列表
      deviceToal: 0,
      selectDevice: [],
      tableOption: [],
      tableSelect: [],
      activeName: "first",
      isShowSelect: true,
      isShowSelect1: true,
      personType: [
        {
          value: "1",
          label: "户主"
        },
        {
          value: "2",
          label: "家庭成员"
        },
        {
          value: "3",
          label: "租客"
        },
        {
          value: "5",
          label: "其他"
        }
      ],
      poolForm: {
        resourcesName: "", //资源池名称
        limitParallelNumPerDevice: 3 //客户端播放数
      },
      rules: {
        resourcesName: [
          { required: true, message: "请输入资源池名称", trigger: "blur" }
        ],
        limitParallelNumPerDevice: [
          { required: true, validator: validateNum, trigger: "blur" }
        ]
      },
      dedicatedPoolDialogVisible: false, //选择专线池弹框
      selectdeDicatedPool: "", //专线池Id
      resourceList: {
        orgId: Cookies.get("orgId"),
        name: "",
        currentPage: 1,
        pageSize: 10,
        orders: null
        // sortProp: 'orgNum',
        // sortOrder: 'descending'
      },
      unbindDeviceForm: {
        deviceIdList: null,
        orgId: "",
        poolId: ""
      },
      VideoPayDialogVisible: false, //播放情况弹框
      tableData2: [],
      tableLabel2: [
        {
          label: "设备序列号",
          param: "deviceSn",
          align: "left",
          isshow: true,
          sortable: "custom",
          width: "70"
        },
        {
          label: "设备名称",
          param: "deviceName",
          align: "left",
          isshow: true,
          sortable: "custom",
          width: "80"
        },
        {
          label: "所属机构",
          param: "orgId",
          align: "left",
          sortable: "custom",
          isshow: true,
          width: "100"
        },
        {
          label: "项目(车场)",
          param: "appName",
          align: "left",
          sortable: "custom",
          isshow: true,
          width: "80"
        },
        {
          label: "总播放时长(秒)",
          param: "playSeconds",
          align: "left",
          isshow: true,
          sortable: "custom",
          width: "65"
        },
        { slot: "online", isshow: true },
        // { label: '播放状态', param: 'playing', align: 'center',isshow:true, sortable: true ,width:'80'},
        {
          label: "播流客户端数",
          param: "playClientNum",
          align: "left",
          isshow: true,
          sortable: "custom",
          width: "65"
        },
        { slot: "operate", isshow: true } // 操作列
      ],
      isShowSelect2: true,
      currentPage2: 1,
      total2: 0,
      selectTab: "first",
      orgIdToDevice: [
        // {
        //   label:'机构1',
        //   key:1,
        // },
        // {
        //   label:'机构2',
        //   key:2,
        // },
        // {
        //   label:'机构3',
        //   key:3,
        // },
        // {
        //   label:'机构4',
        //   key:4,
        // },
        // {
        //   label:'机构5',
        //   key:5,
        // }
      ],
      selectOrgId: [],
      orgIdListDefaultProps: {
        key: "id",
        label: "name"
      },
      appIdToDevice: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      appIdDefaultProps: {
        children: "subsList",
        label: "name"
      },
      containChild: false, //选择下级所有子机构
      checkedAppIds: [],
      PersonListForm: {
        appId: "",
        pageNum: 1,
        pageSize: 10,
        personName: "", //人名门牌号
        subtype: "", //人员类型
        groupId: "" //选中房屋最后一级的ids
      },
      PersonListForm1: {
        //住户审核列表
        appId: "",
        pageNum: 1,
        pageSize: 10,
        personName: "", //姓名或手机号
        subtype: "", //人员类型
        time: "",
        bindStatus: "" //审核状态
      },
      total1: 0,
      specialPageForm: {
        currentPage: 1,
        pageSize: 10,
        orgId: Cookies.get("orgId"), //机构
        category: 2, //商品类别，1：时长包 2：专线包
        binded: 0, //绑定状态：0：未绑定，1：已绑定，不传为null，则表示全部
        orders: null,
        bindTarget: ""
        // sortProp: 'limitDeviceNum',
        // sortOrder: 'descending'
      },
      resourcePoolBindedDeviceForm: {
        appId: "",
        currentPage: 1,
        deviceSearch: "",
        orgId: "",
        pageSize: 10,
        playIng: "", //播放状态，0未播放，1播放中，null为查询全部
        specialId: "",
        orders: null
        // sortProp: 'playClientNum',
        // sortOrder: 'descending'
      },
      isFlag: true,
      payStatusList: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "播放中",
          id: 1
        },
        {
          name: "未播放",
          id: 0
        }
      ],
      orgIdList: [], //机构列表
      appIdList: [], //项目列表
      deviceList: [],
      resourcePoolId: "",
      currentSpecialId: "", //当前资源池Id
      specializedParallelForm: {
        appId: "",
        currentPage: 1,
        deviceSearch: "",
        orgId: Cookies.get("orgId"),
        pageSize: 10,
        playIng: "",
        specialId: ""
      },
      orgIdDefaultProps: {
        key: "id",
        label: "name"
      },
      tableOption1: [],
      tableSelect1: [],
      deviceListForm: {
        appId: "",
        currentPage: 1,
        orgId: "",
        pageSize: 10,
        searchStr: "",
        orders: null
        // sortProp: 'serial',
        // order:'descending'
      },
      tableData5: [],
      tableLabel5: [
        {
          label: "车场",
          param: "appId",
          align: "left",
          sortable: "true",
          isshow: true,
          width: "100"
        },
        {
          label: "设备名称",
          param: "name",
          align: "left",
          sortable: "custom",
          isshow: true,
          width: "80"
        },
        {
          label: "设备S/N",
          param: "serial",
          align: "left",
          isshow: true,
          sortable: "custom",
          width: "80"
        },
        {
          label: "IP",
          param: "ip",
          align: "left",
          isshow: false,
          sortable: "custom",
          width: "80"
        },
        // { label: '视频流', param: 'playSeconds', align: 'center',isshow:true, sortable: true ,width:'80'},
        {
          label: "软件版本",
          param: "version",
          align: "left",
          isshow: true,
          sortable: "custom",
          width: "120"
        },
        //{ label: '激活状态', param: 'videoActivated', align: 'center',isshow:true, sortable:"custom",width:'60'},
        { slot: "videoActivated", isshow: true, label: "激活状态" }
      ],
      isShowSelect5: true,
      currentPage5: 1,
      total5: 0,
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      cascaderData: [],
      groupProps: {
        children: "groups",
        label: "name",
        value: "id",
        checkStrictly: true,
        expandTrigger: "hover"
      },
      bindStatus: [
        {
          value: "0",
          label: "待物业审核"
        },
        {
          value: "1",
          label: "户主审核通过"
        },
        {
          value: "2",
          label: "户主审核未通过"
        },
        {
          value: "3",
          label: "物业审核通过"
        },
        {
          value: "4",
          label: "物业审核未通过"
        },
        {
          value: "5",
          label: "待户主审核"
        },
        {
          value: "8",
          label: "已取消"
        },
        {
          value: "9",
          label: "已绑定"
        }
      ],
      popIndex: 1, //审核弹框
      checkPopVisible: false,
      checkPopTitle: "审核",
      checkForm: {
        bindStatus: "", //状态
        id: "",
        bindFailReseaon: "" //不通过原因
      },
      checkMsg: "", //审核的信息
      showCheckTip: false,
      outPop: false,
      outChecked: false,
      previewImg: [], //图片预览
      showViewer: false,
      imgurl: "",
      tabIndex: 0,
      importPop: false, //批量导入弹框
      fileList: [],
      uploadData: {
        //上传额外参数appid
        appId: ""
      },
      authPopVisible: false, //授权弹框
      authPopTitle: "",
      authId: "", //授权人员的id
      authName: "", //授权人员的name
      isExport: false,
      exportUrl: "",
      exportErrList: [], //导入失败的数据
      exporterrPop: false,
      timer: null,
      elcascaderkey: 1,
      transferType: "我的",
      timePacketForm: {
        source: "",
        timesLength: ""
        // bindStatus
      },
      sourceType: [
        //来源方式
        {
          name: "购买",
          id: 1
        },
        {
          name: "赠送",
          id: 2
        }
      ],
      statusList: [
        {
          name: "全部",
          id: 0
        },
        {
          name: "已绑定",
          id: 1
        },
        {
          name: "为绑定",
          id: 2
        }
      ],
      dialogVisible: false,
      activeNamePaytype: "first",
      exportVisible: false, //导入模块
      activationCode: "", //激活码,
      transferInstitutionVisible: false, //转让机构模块
      props: {
        label: "name",
        children: "zones"
      },
      count: 1
    };
  },

  filters: {},
  created() {
    for (let i = 0; i < this.tableLabel.length; i++) {
      if (this.tableLabel[i].label) {
        this.tableOption.push(this.tableLabel[i].label);
      }
      if (this.tableLabel[i].isshow) {
        this.tableSelect.push(this.tableLabel[i].label);
      }
    }
    this.imgurl = this.tools.global.API_URL;
    ligature.$on("sortable", name => {
      console.log("监听排序:", name);
    });
  },
  computed: {
    appId: {
      get() {
        return this.$store.state.project.projectId;
      },
      set(v) {
        this.$store.commit("changeProjectId", v);
      }
    }
  },
  watch: {},
  components: {
    MsgBox,
    TableCmp,
    TableBmp,
    ElImageViewer,
    ExportBox,
    AuthBox
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //购买弹框
    paySelect() {
      this.isCreate = true;
      this.poolForm.resourcesName = "";
      this.poolForm.limitParallelNumPerDevice = 3;
      this.dialogVisible = true;
    },

    //导入弹框
    exportModel() {
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
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
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

        document
          .querySelectorAll(".el-cascader-panel .el-radio")
          .forEach(el => {
            el.onclick = function() {
              that.$refs.elcascader.dropDownVisible = false;
            };
          });
      }, 100);
    },

    //转让弹框
    assignmentBtn() {
      this.transferInstitutionVisible = true;
    },

    //动态表头数据
    checkboxChange(e) {
      for (let j = 0; j < this.tableLabel.length; j++) {
        if (this.tableSelect.indexOf(this.tableLabel[j].label) > -1) {
          this.tableLabel[j].isshow = true;
        } else {
          this.tableLabel[j].isshow = false;
        }
      }
    },
    checkboxChange1(e) {
      for (let j = 0; j < this.tableLabel1.length; j++) {
        if (this.tableSelect1.indexOf(this.tableLabel1[j].label) > -1) {
          this.tableLabel1[j].isshow = true;
        } else {
          this.tableLabel1[j].isshow = false;
        }
      }
    },

    //创建资源池
    creatResources(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isBtn = true;
          this.utils.http(
            {
              url: "/pool/specialized/update",
              method: "POST",
              data: this.isCreate
                ? {
                    orgId: Cookies.get("orgId"),
                    poolName: this.poolForm.resourcesName,
                    limitParallelNumPerDevice: parseInt(
                      this.poolForm.limitParallelNumPerDevice
                    )
                  }
                : {
                    orgId: Cookies.get("orgId"),
                    poolName: this.poolForm.resourcesName,
                    limitParallelNumPerDevice: parseInt(
                      this.poolForm.limitParallelNumPerDevice
                    ),
                    poolId: this.poolId
                  }
            },
            res => {
              this.isBtn = false;
              if (res.code == 200) {
                this.dialogVisible = false;
                this.utils.tip("success", "创建成功!");
                this.getTableData();
              }
            }
          );
        } else {
          return false;
        }
      });
    },

    //获取专线池列表
    getDedicatedPoollist() {
      this.loading1 = true;
      this.utils.http(
        {
          url: "/videoPackage/search",
          method: "POST",
          data: this.specialPageForm
        },
        res => {
          this.loading1 = false;
          if (res.code == 200) {
            this.total1 = res.data.total;
            this.tableData1 = res.data.records;
            this.currentPage1 = res.data.current;
          }
        }
      );
    },

    //添加专线池包
    addParallel( value ) {
      this.resourcePoolId = value;
      this.isShowSelect1 = true;
      this.isOperate = true;
      this.dedicatedPoolDialogVisible = true;
      this.specialPageForm.binded = 0;
      this.specialPageForm.bindTarget = "";
      this.getDedicatedPoollist();
    },

    //添加设备
    addDevice(value, num) {
      //  console.log(value);
      this.deviceDialogVisible = true;
      this.resourcePoolId = value;
      //  this.deviceToal = num;
      this.deviceListForm.appId = "";
      this.deviceListForm.currentPage = 1;
      this.deviceListForm.deviceSearch = "";
      this.deviceListForm.orgId = "";
      this.deviceListForm.pageSize = 10;
      this.getmechanism();
      this.getApplist(Cookies.get("orgId"));
      this.getDeviceList();
    },

    //获取设备
    getDeviceList() {
      this.selectDevice = [];
      this.loading4 = true;
      this.utils.http(
        {
          url: "/pool/specialized/search/allow/device/page",
          method: "POST",
          data: this.deviceListForm
        },
        res => {
          this.loading4 = false;
          if (res.code == 200) {
            this.total5 = res.data.total;
            this.tableData5 = res.data.records;
            this.currentPage5 = res.data.current;
          }
        }
      );
    },

    //选择设备
    checkedDevide() {
      let selectDeviceIds = [];
      let all = this.$refs.tableChild5.selectData;
      console.log(all);
      if (0 === all.length) {
        this.$message.error("请选择设备");
        return;
      } else {
        selectDeviceIds = all.map(item => {
          return item.id;
        });
      }
      this.isBtn = true;
      this.utils.http(
        {
          url: "/pool/specialized/plus/special/device",
          method: "POST",
          data: {
            orgId: Cookies.get("orgId"),
            deviceIdList: selectDeviceIds,
            poolId: this.resourcePoolId
          }
        },
        res => {
          this.isBtn = false;
          if (res.code == 200) {
            this.deviceDialogVisible = false;
            this.utils.tip("success", "添加设备成功!");
            this.getTableData();
          }
        }
      );
    },

    editPoolName(row) {
      console.log(row);
      this.isCreate = false;
      this.poolForm.resourcesName = row.name;
      this.poolForm.limitParallelNumPerDevice =
        row.limitParallelNumPerDevice || 3;
      this.poolId = row.id;
      this.dialogVisible = true;
    },

    //专线包个数展示
    editPackageSpecialized( id ) {
      this.getDedicatedPoollist();
      this.isShowSelect1 = false;
      this.isOperate = false;
      this.specialPageForm.binded = 1;
      this.specialPageForm.bindTarget = id;
      this.dedicatedPoolDialogVisible = true;
    },

    // 播放详情 - 设备解绑
    unbindDevice(id) {
      this.$confirm("您确信要解绑该设备吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.unbindDeviceForm.deviceIdList = [id];
          this.unbindDeviceForm.orgId = this.resourcePoolBindedDeviceForm.orgId;
          this.unbindDeviceSend();
        })
        .catch(() => {});
    },

    //批量解绑设备
    unbindDeviceAll() {
      let all = this.$refs.tableChild2.selectData;
      console.log(all);
      if (all.length === 0) {
        this.$message.error("请选择要解绑的设备");
        return;
      }
      let arr = [];
      all.forEach(item => {
        arr.push(item.deviceId);
      });
      this.unbindDeviceForm.deviceIdList = arr;
      this.unbindDeviceForm.orgId = this.resourcePoolBindedDeviceForm.orgId;
      this.unbindDeviceSend();
    },

    unbindDeviceSend() {
      this.utils.http(
        {
          url: "/pool/specialized/subtract/special/device",
          method: "POST",
          data: this.unbindDeviceForm
        },
        res => {
          if (res.code == 200) {
            this.isFlag = true;
            this.resourcePoolBindedDeviceForm.playIng = "";
            this.resourcePoolBindedDeviceForm.appId = "";
            this.resourcePoolBindedDeviceForm.currentPage = 1;
            this.resourcePoolBindedDeviceForm.deviceSearch = "";
            this.resourcePoolBindedDeviceForm.orgId = "";
            this.resourcePoolBindedDeviceForm.pageSize = 10;
            this.getResourcePoolBindedDevices();
          }
        }
      );
    },

    //停止推流
    stopPush(id) {
      this.utils.http(
        {
          url: `/pool/specialized/play/client/close?deviceId=${id}`,
          method: "POST"
        },
        res => {
          if (res.code == 200) {
            this.utils.tip("success", "该设备停止推流成功!");
            this.isFlag = true;
            this.resourcePoolBindedDeviceForm.playIng = "";
            this.resourcePoolBindedDeviceForm.appId = "";
            this.resourcePoolBindedDeviceForm.currentPage = 1;
            this.resourcePoolBindedDeviceForm.deviceSearch = "";
            this.resourcePoolBindedDeviceForm.orgId = "";
            this.resourcePoolBindedDeviceForm.pageSize = 10;
            this.this.getResourcePoolBindedDevices();
          }
        }
      );
    },

    //查看并行个数列表
    editParallel(row) {
      this.isFlag = false;
      this.resourcePoolBindedDeviceForm.playIng = 1;
      this.resourcePoolBindedDeviceForm.appId = "";
      this.resourcePoolBindedDeviceForm.currentPage = 1;
      this.resourcePoolBindedDeviceForm.deviceSearch = "";
      this.resourcePoolBindedDeviceForm.orgId = "";
      this.resourcePoolBindedDeviceForm.pageSize = 10;
      this.resourcePoolBindedDeviceForm.specialId = row.id;
      this.unbindDeviceForm.poolId = row.id;
      this.getmechanism();
      this.getApplist(Cookies.get("orgId"));
      this.getResourcePoolBindedDevices();
      this.VideoPayDialogVisible = true;
    },

    //获取房屋下拉
    getLeftData() {
      this.cascaderData = [];
      this.utils.http(
        {
          url: "/base/house/list",
          method: "GET",
          params: { appId: this.appId }
        },
        res => {
          if (res.code == 200 && res.data.groups) {
            this.cascaderData = res.data.groups;
          }
        }
      );
    },
    //资源池列表
    getTableData() {
      this.loading = true;
      this.utils.http(
        {
          url: "/pool/specialized/search/page",
          method: "POST",
          data: this.resourceList
        },
        res => {
          this.loading = false;
          if (res.code == 200) {
            this.total = res.data.total;
            this.tableData = res.data.records;
            this.currentPage = res.data.current;
          }
        }
      );
    },

    sortableChange(obj, type) {
      let order = [
        { column: obj.prop, asc: "ascending" == obj.order ? true : false }
      ];
      const matchingStr = {
        editResourceName: "name",
        editPackageNum: "packageNum",
        devicesNum: "deviceNum",
        specificationDesc: "specification",
        durationDesc: "duration",
        bindTargetName: "bindTarget"
      };
      if (0 === type) {
        this.resourceList.propMap = matchingStr;
        this.resourceList.orders = order;
        this.getTableData();
      } else if (1 === type) {
        this.specialPageForm.propMap = matchingStr;
        this.specialPageForm.orders = order;
        this.getDedicatedPoollist();
      } else if (2 === type) {
        this.resourcePoolBindedDeviceForm.propMap = matchingStr;
        this.resourcePoolBindedDeviceForm.orders = order;
        this.getResourcePoolBindedDevices();
      } else if (5 === type) {
        this.deviceListForm.propMap = matchingStr;
        this.deviceListForm.orders = order;
        this.getDeviceList();
      }
    },

    //选择专线池
    checkedDedicatedPool() {
      let allList = this.$refs.tableChild1.selectData;
      if (allList.length === 0) {
        this.$message.error("请选择专线包");
        return;
      }
      let arr = [];
      allList.forEach((item, index) => {
        arr.push(item.id);
      });
      let json = {
        orgId: Cookies.get("orgId"),
        packageIdList: arr,
        poolId: this.resourcePoolId
      };
      this.utils.http(
        {
          url: "/pool/specialized/plus/special/package",
          method: "POST",
          data: json
        },
        res => {
          if (res.code == 200) {
            this.dedicatedPoolDialogVisible = false;
            this.utils.tip("success", "添加专线包绑定到资源池成功");
            this.getTableData();
            // this.total1=res.data.total;
            // this.tableData1=res.data.records;
            // this.currentPage1=res.data.current;
          }
        }
      );
    },

    //解绑专线包
    noBind(row) {
      console.log(row);
      this.$confirm("确信解绑该专线包吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.utils.http(
            {
              url: `/videoPackage/un/bind?packageId=${row.id}`,
              method: "POST"
            },
            res => {
              if (res.code == 200) {
                this.utils.tip( "success", "解绑成功!" );
                this.getDedicatedPoollist();
                this.getTableData();
              }
            }
          );
        })
        .catch(() => {});
    },

    //查询设备情况
    editDevice(row) {
      this.isFlag = true;
      this.isOperate = true;
      this.resourcePoolBindedDeviceForm.playIng = "";
      this.resourcePoolBindedDeviceForm.appId = "";
      this.resourcePoolBindedDeviceForm.currentPage = 1;
      this.resourcePoolBindedDeviceForm.deviceSearch = "";
      this.resourcePoolBindedDeviceForm.orgId = "";
      this.resourcePoolBindedDeviceForm.pageSize = 10;
      this.resourcePoolBindedDeviceForm.specialId = row.id;
      this.unbindDeviceForm.poolId = row.id;
      this.getmechanism();
      this.getApplist(Cookies.get("orgId"));
      this.getResourcePoolBindedDevices();
      this.VideoPayDialogVisible = true;
    },

    //查询专线包资源池已绑定的设备
    getResourcePoolBindedDevices() {
      this.loading2 = true;
      this.utils.http(
        {
          url: this.isFlag
            ? "/pool/specialized/search/device/page"
            : "/pool/specialized/search/parallel/page",
          method: "POST",
          data: this.resourcePoolBindedDeviceForm
        },
        res => {
          this.loading2 = false;
          if (res.code == 200) {
            this.total2 = res.data.total;
            this.tableData2 = res.data.records;
            this.currentPage2 = res.data.current;
          }
        }
      );
    },

    //切换播放状态
    radioChangeS() {
      //  console.log(this.resourcePoolBindedDeviceForm.playIng)
      this.getResourcePoolBindedDevices();
    },

    //获取车场列表
    getApplist(orgId) {
      this.utils.http(
        {
          url: `/org/search/child/app?orgId=${orgId}`,
          method: "POST"
        },
        res => {
          if (res.code == 200) {
            // this.pageVo.orgId = res.data[0].orgId
            // this.orgIdList = res.data;
            if (res.data && res.data.length > 0) {
              this.appIdList = res.data;
            } else {
              this.appIdList = [];
            }
          }
        }
      );
    },

    //获取机构列表
    getmechanism() {
      this.utils.http(
        {
          url: `/org/search/select?orgId=${Cookies.get("orgId")}`,
          method: "POST"
        },
        res => {
          if (res.code == 200) {
            // this.pageVo.orgId = res.data[0].orgId
            this.orgIdList = res.data;
          }
        }
      );
    },

    //切换设备列表中的机构
    deviceOrgChange(value) {
      this.getApplist(value);
    },

    //切换播放情况中的机构
    videoOrgchang(value) {
      this.getApplist(value);
    },

    //专线包资源池查询配置信息
    getSpecializedInfo(id) {
      this.loading3 = true;
      this.utils.http(
        {
          url: "/pool/specialized/search/set/info",
          method: "POST",
          data: { orgId: Cookies.get("orgId"), specialId: id }
        },
        res => {
          this.loading3 = false;
          if (res.code == 200) {
            this.$refs.tree.setCheckedKeys([]);
            let selectAppIds = [];
            this.orgIdToDevice =
              res.data.allOrgList.filter(item => {
                return item.name && item.id;
              }) || [];
            if (res.data.boundOgrList && res.data.boundOgrList.length > 0) {
              this.selectOrgId =
                res.data.boundOgrList.map(item => {
                  return item.id;
                }) || [];
            } else {
              this.selectOrgId = [];
            }
            this.appIdToDevice =
              res.data.appTreeList.filter(item => {
                return item.name && item.id;
              }) || [];
            res.data.appTreeList.forEach((item, index) => {
              if (item.subsList && item.subsList.length > 0) {
                item.subsList.forEach((list, inds) => {
                  if (list.bindStatus) {
                    selectAppIds.push(list.id);
                  }
                });
              }
            });
            this.containChild = 1 === res.data.containChild ? true : false;
            this.checkedAppIds = selectAppIds;
          }
        }
      );
    },

    //节点被点击时的回调  树结构点击文本选中再点击取消
    handleNodeClick(data, node) {
      node.checked = !node.checked;
    },

    //配置设备
    setDataInfo() {
      console.log(this.selectTab);
      let updateVo = {};
      if ("first" == this.selectTab) {
        updateVo.containChild = this.containChild ? 1 : 0;
        updateVo.operateType = 1;
        updateVo.orgId = Cookies.get("orgId");
        updateVo.orgIdList = this.selectOrgId;
        updateVo.specialId = this.currentSpecialId;
      } else {
        // console.log(this.$refs.tree.getCheckedKeys());
        console.log("a:", this.$refs.tree.getCheckedNodes());
        let checkEdNodeList = this.$refs.tree.getCheckedNodes();
        if (0 < checkEdNodeList.length) {
          updateVo.operateType = 2;
          updateVo.orgId = Cookies.get("orgId");
          updateVo.appIdList = this.setRecombinationData(checkEdNodeList);
          updateVo.specialId = this.currentSpecialId;
        } else {
          updateVo.operateType = 2;
          updateVo.orgId = Cookies.get("orgId");
          updateVo.appIdList = [];
          updateVo.specialId = this.currentSpecialId;
        }
      }
      this.isBtn = true;
      this.utils.http(
        {
          url: "/pool/specialized/search/set",
          method: "POST",
          data: updateVo
        },
        res => {
          this.isBtn = false;
          if (res.code == 200) {
            this.transferInstitutionVisible = false;
            if ("first" == this.selectTab) {
              this.getTableData();
              this.utils.tip("success", "自动配置机构下的设备加入资源池成功");
            } else {
              this.utils.tip("success", "自动配置项目下的设备加入资源池成功");
            }
          }
        }
      );
    },

    //数据重组
    setRecombinationData(data) {
      let arr = [];
      data.forEach((item, index) => {
        if (!item.subsList) {
          arr.push(item.id);
        }
      });
      return arr;
    },
    //下拉改变
    cascaderChange(e) {
      if (e) {
        this.PersonListForm.groupId = e[e.length - 1];
      }
    },
    //重置
    resetBtn() {
      (this.resourceList = {
        orgId: Cookies.get("orgId"),
        name: "",
        currentPage: 1,
        pageSize: 10,
        orders: null
      }),
        this.getTableData();
    },
    resetBtn1() {
      this.PersonListForm1 = {
        appId: this.appId,
        pageNum: 1,
        pageSize: 10,
        personName: "", //姓名或手机号
        subtype: "", //人员类型
        time: "",
        bindStatus: "" //审核状态
      };
      this.getCheckList();
    },

    resetBtn2() {
      this.resourcePoolBindedDeviceForm.appId = "";
      this.resourcePoolBindedDeviceForm.currentPage = 1;
      this.resourcePoolBindedDeviceForm.deviceSearch = "";
      this.resourcePoolBindedDeviceForm.orgId = "";
      this.resourcePoolBindedDeviceForm.pageSize = 10;
      this.resourcePoolBindedDeviceForm.playIng = this.isFlag ? "" : 1;
      this.resourcePoolBindedDeviceForm.orders = null;
      // this.resourcePoolBindedDeviceForm.sortProp = 'playClientNum';
      // this.resourcePoolBindedDeviceForm.sortOrder = 'descending'
      this.getResourcePoolBindedDevices();
    },

    resetBtn3() {
      this.deviceListForm = {
        appId: "",
        currentPage: 1,
        orgId: "",
        pageSize: 10,
        searchStr: "",
        orders: null
        // sortProp: 'serial',
        // order:'descending'
      };
      this.getDeviceList();
    },

    //自动添加设备弹框
    goEdit(row) {
      this.selectTab = "first";
      this.currentSpecialId = row.id;
      this.getSpecializedInfo(row.id);
      this.transferInstitutionVisible = true;
    },
    //删除员工
    deleteOwner(id) {
      this.$confirm("您确信删除选中的资源池吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.utils.http(
            {
              url: `/pool/specialized/remove?poolId=${id}`,
              method: "post"
            },
            res => {
              if (res.code == 200) {
                this.utils.tip("success", "删除成功");
                this.getTableData();
              }
            }
          );
        })
        .catch(() => {});
    },
    //点击审核
    goCheck(row) {
      this.checkMsg = row.personName + ",申请" + row.houseAddress;
      this.checkPopVisible = true;
      this.popIndex = 1;
      this.checkForm.id = row.id;
    },
    //审核通过
    checkAgree() {
      this.checkForm.bindStatus = 9;
      this.checkRequest();
    },
    //点击拒绝
    clickRefuse() {
      this.popIndex = 2;
      this.checkPopTitle = "请输入拒绝原因";
    },
    //取消拒绝
    cancelRefuse() {
      this.popIndex = 1;
      this.checkPopTitle = "审核";
      this.checkForm.bindFailReseaon = "";
      this.showCheckTip = false;
    },
    //拒绝确认
    refuse() {
      this.checkForm.bindStatus = 4;
      if (this.checkForm.bindFailReseaon) {
        this.checkRequest();
      } else {
        this.showCheckTip = true;
      }
    },
    //审核接口
    checkRequest() {
      this.utils.http(
        {
          url: "/person/updateBindStatus",
          method: "POST",
          data: this.checkForm
        },
        res => {
          if (res.code == 200) {
            this.checkPopVisible = false;
            this.showCheckTip = false;
            this.utils.tip("success", "审核成功");
            this.getCheckList();
          }
        }
      );
    },
    closePop() {
      this.popIndex = 1;
      this.checkPopTitle = "审核";
      this.checkForm.bindFailReseaon = "";
    },
    open() {
      this.timer = setTimeout(() => {
        this.popVisible = false;
        clearTimeout(this.timer);
      }, 3000);
    },
    clearSetTimeOut() {
      clearTimeout(this.timer);
    },
    //批量删除
    batchDelete() {
      let ids = [];
      let all = this.$refs.tableChild.selectData;
      all.forEach((item, index) => {
        ids.push(item.id);
      });
      if (ids.length == 0) {
        this.popVisible = true; //是否显示信息弹框
        this.popTitle = "提示";
        this.popContent = "请先选择要删除的住户";
        this.open();
      } else {
        this.$confirm("您确信删除选中的住户?", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.utils.http(
              {
                url: "/person/batchDeleteHousehold",
                method: "POST",
                data: { appId: this.appId, personIdList: ids }
              },
              res => {
                if (res.code == 200) {
                  this.utils.tip("success", "删除成功");
                  this.getTableData();
                }
              }
            );
          })
          .catch(() => {});
      }
    },
    //go增加页
    goAdd() {
      this.$router.push({
        path: "/ownermanageadd",
        query: {
          type: "1"
        }
      });
    },
    //全部住户导出
    exportBtn() {
      this.outPop = true;
    },
    outBtn() {
      this.isExport = true;
      //所有住户导出
      if (this.tabIndex == 0) {
        this.outChecked = this.$refs.exportData.outChecked;
        if (this.outChecked) {
          this.PersonListForm.withPic = 1;
        } else {
          this.PersonListForm.withPic = 0;
        }
        let ids = [];
        let all = this.$refs.tableChild.selectData;
        all.forEach((item, index) => {
          ids.push(item.id);
        });
        this.PersonListForm.ids = ids;
        this.utils.http(
          {
            url: "/person/personExport",
            method: "POST",
            data: this.PersonListForm
          },
          res => {
            this.isExport = false;
            this.outPop = false;
            delete this.PersonListForm.ids; //删除ids属性  防止查询报错
            if (res.code == 200) {
              this.$alert("人员正在导出请稍后", "提示", {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: "success"
              })
                .then(() => {})
                .catch(() => {});
            } else {
              this.$alert("人员导出失败", "提示", {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: "error"
              })
                .then(() => {})
                .catch(() => {});
            }
          }
        );
      } else if (this.tabIndex == 1) {
        //审核住户导出
        this.outChecked = this.$refs.exportData.outChecked;
        if (this.outChecked) {
          this.PersonListForm1.withPic = 1;
        } else {
          this.PersonListForm1.withPic = 0;
        }
        let ids = [];
        let all = this.$refs.tableChild1.selectData;
        all.forEach((item, index) => {
          ids.push(item.id);
        });
        this.PersonListForm1.ids = ids;
        this.utils.http(
          {
            url: "/person/houseExport",
            method: "POST",
            data: this.PersonListForm1
          },
          res => {
            this.isExport = false;
            this.outPop = false;
            delete this.PersonListForm1.ids; //删除ids属性  防止查询报错
            if (res.code == 200) {
              this.$alert("人员正在导出请稍后", "提示", {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: "success"
              })
                .then(() => {})
                .catch(() => {});
            } else {
              this.$alert("人员导出失败", "提示", {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true,
                closeOnClickModal: true,
                type: "error"
              })
                .then(() => {})
                .catch(() => {});
            }
          }
        );
      }
    },

    //查看附件
    onPreview(url) {
      this.previewImg = [];
      let urlList = url.split(",");
      urlList.forEach((item, index) => {
        let realUrl = this.imgurl + "/file/download?path=" + item;
        this.previewImg.push(realUrl);
      });

      this.showViewer = true;
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
    },

    //表格的选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    //分页
    handleSizeChange(val) {
      this.PersonListForm.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.PersonListForm.currentPage = val;
      this.getTableData();
    },

    handleSizeChange1(val) {
      this.specialPageForm.pageSize = val;
      this.getDedicatedPoollist();
    },
    handleCurrentChange1(val) {
      this.specialPageForm.currentPage = val;
      this.getDedicatedPoollist();
    },

    handleSizeChange2(val) {
      // this.specialPageForm.pageSize=val;
      // this.getDedicatedPoollist();
    },
    handleCurrentChange2(val) {
      //  this.specialPageForm.currentPage=val;
      //  this.getDedicatedPoollist();
    },

    handleSizeChange5(val) {
      this.deviceListForm.pageSize = val;
      this.getDeviceList();
    },
    handleCurrentChange5(val) {
      this.deviceListForm.currentPage = val;
      this.getDeviceList();
    },

    handleClick(tab, event) {
      if (tab.index == 0) {
        this.tabIndex = 0;
      } else if (tab.index == 1) {
        this.tabIndex = 1;
      }
    },

    submitUpload() {
      if (this.fileList.length > 0) {
        this.$refs.upload.submit();
      } else {
        this.$message.error("请选择文件");
      }
    },
    //文件选择变化
    selectChange(file, fileList) {
      var fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
      let types = ["zip"];
      const isZip = types.includes(fileType);
      if (!isZip) {
        this.$message.error("只支持.zip压缩文件");
        this.fileList = [];
        return false;
      }
      this.fileList = fileList;
    },
    //上传之前
    beforeAvatarUpload(file, fileList) {
      var fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
      let types = ["zip"];
      const isZip = types.includes(fileType);
      const isLtSize = file.size / 1024 / 1024 < 128;
      if (!isZip) {
        this.$message.error("只支持.zip压缩文件");
        return false;
      }
      if (!isLtSize) {
        this.$message.error("文件大小不能超过 128MB!");
        return false;
      }
      //提示弹框
      this.importPop = false;
      this.popVisible = true; //是否显示信息弹框
      this.popTitle = "提示";
      this.popContent = "人员正在导入请稍后";
    },
    //上传成功
    successCheck(response, file, fileList) {
      console.log(response);
      this.$refs.upload.clearFiles();
      this.popVisible = false;
      if (response.code == 200) {
        if (response.data.isOpen == 1) {
          this.exportErrList = response.data.list;
          this.exporterrPop = true;
        } else if (response.data.isOpen == 0) {
          this.$alert("人员导入成功", "提示", {
            confirmButtonText: "确定",
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            type: "success"
          })
            .then(() => {})
            .catch(() => {});
        } else if (response.data.isOpen == 2) {
          this.$message.error("模板解析异常");
        }
      } else {
        this.$message.error(response.msg);
      }
    },
    //删除
    removeFile() {
      this.fileList = [];
    },
    //上传失败
    uploadErr(err, file, fileList) {
      this.$message.error("导入失败");
    },
    //删除图片
    remove(index) {
      this.images.splice(index, 1);
    },
    exceed() {
      this.$message.error("不支持多文件上传");
    },

    //查看授权状态
    goView(id, name) {
      this.authPopVisible = true;
      this.authId = id;
      this.authPopTitle = name;
    }
  }
};