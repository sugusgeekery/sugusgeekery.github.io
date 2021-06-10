import fetch from "@/axios";

// 获取竞价单，竞价中列表
export const GetSelectByUser = (params: object = {}): object => fetch({ url: "/supplier/userMouldBidding/selectByUser", method: "GET", params });

// 获取我的竞价单，竞价历史列表
export const GetSelectMyBidding = (params: object = {}): object => fetch({ url: "/supplier/userMouldBidding/selectMyBidding", method: "GET", params });

// 参与竞价
export const JoinBidding = (data: object = {}): object => fetch({ url: "/supplier/userMouldBidding/joinMouldBidding", data });

// 取消竞价
export const RemoveBidding = (data: object = {}): object => fetch({ url: "/supplier/userMouldBidding/removeMouldBidding", data });

// 修改竞价详情
export const UpdateMouldBidding = (data: object = {}): object => fetch({ url: "/supplier/userMouldBidding/updateMouldBidding", data });

// 获取竞价单详情
export const GetMouldBiddingDetail = (params: any = {}): object => {
  const { headId = "" } = params;
  return fetch({ url: `/supplier/userMouldBidding/getMouldBiddingDetail/${headId}`, method: "GET", params: {} });
};

// 获取竞价单详情的二次工艺信息
export const GetProductTechnology = (params: any = {}): object => {
  const { headId = "" } = params;
  return fetch({ url: `/supplier/userMouldBidding/getProductTechnology/${headId}`, method: "GET", params: {} });
};

// 获取竞价单详情的材料和颜色
export const GetMaterialAndColor = (params: any = {}): object => {
  const { headId = "" } = params;
  return fetch({ url: `/supplier/userMouldBidding/getMaterialAndColor/${headId}`, method: "GET", params: {} });
};

// 获取塑胶合模方案
export const GetPolyteneMatchedMould = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getPolyteneMatchedMould`, method: "GET", params });

// 获取硅胶合模方案
export const GetSilicagelMould = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getSilicagelMould`, method: "GET", params });

// 获取金属合模方案
export const GetMetalMould = (params: any = {}): object => fetch({ url: `/supplier/orderCenter/getMetalMould`, method: "GET", params });