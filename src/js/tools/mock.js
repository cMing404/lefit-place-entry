import Mock from 'mockjs'
import API from './api'
let mockData = {}
mockData.getAreaOrderList = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "list": [
      {
        "id": 120,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "IS_FINISHED"
      },
      {
        "id": 123,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "IS_FINISHED"
      },
      {
        "id": 124,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 158,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 125,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 127,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 158,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 128,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 158,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 129,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 159,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 130,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 159,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 131,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 132,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 133,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      },
      {
        "id": 134,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "coverPic": "http://cdn.leoao.com/send_giftbg-m-1.png",
        "classPrice": 2000,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "HAS_APPOINTMENTED"
      }
    ]
  }
}
mockData.getStoreAreaList = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "list": [
      {
        "id": 166,
        "storeName": "场地名称（不能重复）",
        "coverPic": "图片URL",
        "provinceId": 12596,
        "city": 12597,
        "cityName": "杭州市",
        "countyId": 1,
        "countyName": "西湖区",
        "storeArea": 1,
        "address": "具体地址信息",
        "status": 2
}
]
}
}
mockData.getAreaTypeList = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "list": [
      {
        "storeAreaTypeKey": "swimmingPool",
        "storeAreaTypeName": "游泳池"
      },
      {
        "storeAreaTypeKey": "golfCourse",
        "storeAreaTypeName": "高尔夫球场"
      },
      {
        "storeAreaTypeKey": "shoolGround",
        "storeAreaTypeName": "学校操场"
      },
      {
        "storeAreaTypeKey": "hotel",
        "storeAreaTypeName": "酒店"
      },
      {
        "storeAreaTypeKey": "village",
        "storeAreaTypeName": "小区"
      },
      {
        "storeAreaTypeKey": "oownHouse",
        "storeAreaTypeName": "自己家"
      }
    ]
  }
}
mockData.addStoreArea = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "id": 167   //    场地id（对应后面更新场地的 id 字段）（ 对应表 leoao_coach.store_area）
  }
}
mockData.updateStoreArea = {
  "code": 200,
  "resultmessage": "success"
}
mockData.getStoreClassSet = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "storeClassSetResps": [
      {
        "id": 16,
        "storeId": 221,
        "classId": 34235,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 2213,
        "classId": 3342,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 22211,
        "classId": 3535,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 241,
        "classId": 3545,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 241,
        "classId": 355,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 34235,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 354235,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 3234,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 342355,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 42355,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 3243,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 35342,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },{
        "id": 16,
        "storeId": 221,
        "classId": 3432,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 34235,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      },
      {
        "id": 16,
        "storeId": 221,
        "classId": 355,
        "className": "增肌max",
        "classServiceType": 2,
        "classIsOpen": 1,
        "classServiceName": "团操"
      }

    ],
    "classStatus": 1
  }
}
mockData.getMyCoreProfile = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "monthClassIncome": 2000
  }
}
mockData.getStoreAreaInfo = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "status":2, //    1：编辑中   2：审核中  3：审核失败   4：已下架  5：营业中  6：停业
    "coverPic": "图片URL",
    "classPrice": 2000,
    "officeBeginTime": "09:00:00",
    "officeEndTime": "20:00:00",
    "storeAreaBaseInfoResp": {
      "storeName": "场地名称（不能重复）",
      "operatorId": 123123,
      "telPhone": "18370097325",
      "isOutdoors": 1,
      "areaType":"golfCourse",
      "storeSpaceResps": [
        {
          "id": 48,
          "storeId": 166,
          "spaceName": "总面积(修改)",
          "spaceArea": 343.35,
          "classArea": 100.22,
          "spaceType": 2,
          "remark": "备注（可不填）"
        },
        {
          "id": 49,
          "storeId": 166,
          "spaceName": "总面积",
          "spaceArea": 343.35,
          "classArea": 100.22,
          "spaceType": 1,
          "remark": "备注（可不填）"
        }
      ]
    },
    "addressInfo": {
      "lat": 354.54,
      "lng": 120.35,
      "address": "具体地址信息",
      "provinceId": 17359,
      "city": 17999,
      "storeArea": 1,
      "cityName": "杭州市",
      "countyId": 18037,
      "countyName": "西湖区",
      "addressInfoStatus": 1  // 地址配置  状态   1：已完成   0：未完成
    },
    "classSetResp": {
      "storeClassSetResps": [
        {
          "id": 13,
          "storeId": 166,
          "classId": 355,
          "className": "增肌max",
          "classServiceType": "团操",
          "classIsOpen": 1,
          "classServiceName": "团操"
        },
        {
          "storeId": 166,
          "classId": 356,
          "className": "产后恢复",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 357,
          "className": "康复训练",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 358,
          "className": "综合格斗",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 359,
          "className": "体重管理",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 360,
          "className": "普拉提（私教）",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 361,
          "className": "拉伸疗法",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 362,
          "className": "瑜伽（私教）",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 363,
          "className": "舞蹈（私教）",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 364,
          "className": "减脂塑形（私教）",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 365,
          "className": "壶铃",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 366,
          "className": "crossfit（综合体能训练）",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        },
        {
          "storeId": 166,
          "classId": 367,
          "className": "新人专享，5节起售",
          "classServiceType": "私教",
          "classIsOpen": 0,
          "classServiceName": "私教"
        }
      ],
      "classStatus": 1   // 授课配置  状态   1：已完成   0：未完成
    }
  }
}
mockData.deleteStoreArea = {
  "code": 200,
  "resultmessage": "success"
}
mockData.getBalanceCountArea ={
  "code": 200,
  "resultmessage": "success",
  "data": {
    "monthClassIncome": 2000,
    "monthOrderNum": 1,
    "areaOrderListBeans": [
      {
        "id": 123,
        "appointmentBeginTime": 1234567890,
        "appointmentEndTime": 1234567890,
        "storeAreaId": 166,
        "storeAreaName": "场地门店名称",
        "classPrice": 0,
        "classInfoName": "课程名",
        "coachId": 18,
        "coachStageName": "Sabrina",
        "status": "IS_FINISHED"
      }
    ]
  }
}
mockData.getConditionStoreAreaList = {
  "code": 200,
  "resultmessage": "success",
  "data": {
    "list": [
      {
        "storeAreaId": 158,
        "storeName": "杭州第一站001",
        "coverPic": "coverpic"
      },
      {
        "storeAreaId": 159,
        "storeName": "杭州第一站003",
        "coverPic": "coverpic"
      }
    ]
  }
}
mockData.getPaymentAccountInfo = {
  "code": 200,
  "resultmessage": "success",
  "data":{
    "id":2,
    "token":"8d26bb07f62257fd0858add630e397cb",
    "bankName":"招商银行（修改）",
    "bankCardNo":"1234567890000",
    "userName":"戴小冬",
    "subBankName":"杭州分行"
  }
}
export default  mockData
