import OSS from "ali-oss";
import { GetOssfsToken } from "@/api";

export const uploadFileOfOSS = async (params: any = {}) => {
  try {
    const { file = "", datas = {} } = params;
    if (!file) {
      return Promise.resolve({
        code: "000",
        msg: "上传文件不能为空",
        data: {}
      });
    }

    const { fileExt = ".jpg", middleDir = "" } = datas;
    const {
      code = "000",
      msg = "获取上传接口信息错误！请稍后再试",
      data = {}
    }: any = (await GetOssfsToken({ fileExt, middleDir })) || {};
    const {
      accessKeyId = "",
      accessKeySecret = "",
      securityToken = "",
      bucket = "",
      endpoint = "",
      uploadImgPath = ""
    } = data;
    const OSSConfig = {
      accessKeyId,
      accessKeySecret,
      stsToken: securityToken,
      bucket,
      endpoint,
      isRequestPay: true,
      cname: true,
      secure: true
    };
    const client = new OSS(OSSConfig);
    const getImageInfo = (url: string) => {
      return new Promise((resolve, reject) => {
        const image: any = new Image();
        let width: number | undefined = void 0;
        let height: number | undefined = void 0;
        image.src = url;
        image.onload = function() {
          width = this.width;
          height = this.height;
          resolve({ width, height });
        };
        image.onerror = function() {
          reject({ width, height });
        };
      });
    };
    const obj =
      (await client.put(
        uploadImgPath.substring(1, uploadImgPath.length),
        file
      )) || {};
    const { res = {}, name = "", url = "" }: any = obj;
    const { statusCode = 0 } = res;
    if (code == "999") {
      if (statusCode == 200) {
        const { width, height }: any = await getImageInfo(url);
        return Promise.resolve({
          code: "999",
          msg: "上传资源到OSS服务器成功",
          data: { ...obj, width, height, path: "/" + name }
        });
      } else {
        return Promise.resolve({
          code: "000",
          msg: "上传资源到OSS服务器失败",
          data: {}
        });
      }
    } else {
      return Promise.resolve({ code: "000", msg, data: {} });
    }
  } catch (e) {
    console.error(e);
  }
};
