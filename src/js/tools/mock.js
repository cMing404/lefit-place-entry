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
        "id": 128,
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
        "id": 129,
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
        "id": 130,
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
export default  mockData
