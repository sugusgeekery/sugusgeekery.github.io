import fetch from "@/axios";
import { Message } from "element-ui";

// 上传文件
export const UploadForm = (data: object = {}): object => fetch({ url: "/supplier/common/uploadForm", headers: { "Content-Type": "multipart/form-data;" }, data });

export default function(options: any) {
  const { files = [] } = options || {};
  const fileLen: number = files.length;
  let fileNum: number = 0;
  const fileList: any = [];

  return new Promise((resolve, reject) => {
    async function uploadFile() {
      try {
        const formData = new FormData();
        formData.append("files", files[fileNum]);
        const { success, message, data }: any = await UploadForm(formData);
        if (success) {
          const { pics = [] } = data || {};
          if (pics.length) {
            const file = pics[0] || {};
            fileList.push(file);
            if (fileNum === fileLen - 1) {
              resolve(fileList);
            } else {
              fileNum++;
              uploadFile();
            }
          }
        } else {
          Message.error(message);
          resolve([]);
        }
      } catch (e) {
        reject(e);
        throw new Error(e);
      }
    }
    if (files.length) {
      uploadFile();
    } else {
      resolve([]);
    }
  });
};