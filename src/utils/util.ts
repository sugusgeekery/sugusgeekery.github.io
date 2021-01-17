/**
 * 判断是否有值
 */
const hasVal = (v: any): boolean => {
  return typeof v !== "undefined" && v !== null;
};

/**
 * 判断是否是字符串
 */
const isStr = (v: any): boolean => {
  return typeof v === "string";
};

/**
 * 判断是否是函数
 */
const isFn = (v: any): boolean => {
  return typeof v === "function";
};

/**
 * 判断是否是数组
 */
const isArr = (v: any): boolean => {
  return Array.isArray
    ? Array.isArray(v)
    : Object.prototype.toString.call([]) === "[object Array]";
};

/**
 * 判断是否是对象
 */
const isObj = (v: any): boolean => {
  return v !== null && typeof v === "object";
};

/**
 * 判断是否是空对象
 */
const isEmptyObj = (v: any): boolean => {
  if (v !== null && typeof v === "object") {
    for (const i in v) {
      return false;
    }
    return true;
  }
  return true;
};

/**
 * 对个位数前补零
 */
const formatNumber = (n: any): string => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

/**
 * 当前时间戳 (秒级)
 */
const timeStamp = (): number => ~~(new Date().getTime() / 1000);

/**
 * 日期时间格式化
 */
const formatDateTime = ({
  date = new Date(),
  formatType = "yyyy-mm-dd hh:mm:ss"
} = {}): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  switch (formatType) {
    case "yyyy":
      return [year].map(formatNumber).join("");
    case "mm":
      return [month].map(formatNumber).join("");
    case "dd":
      return [day].map(formatNumber).join("");
    case "yyyymmdd":
      return [year, month, day].map(formatNumber).join("");
    case "yyyy-mm-dd":
      return [year, month, day].map(formatNumber).join("-");
    case "yyyy/mm/dd":
      return [year, month, day].map(formatNumber).join("/");
    case "yyyy.mm.dd":
      return [year, month, day].map(formatNumber).join(".");
    case "hhmmss":
      return [hour, minute, second].map(formatNumber).join("");
    case "hh:mm:ss":
      return [hour, minute, second].map(formatNumber).join(":");
    case "yyyymmddhhmmss":
      return (
        [year, month, day].map(formatNumber).join("") +
        "" +
        [hour, minute, second].map(formatNumber).join("")
      );
    case "yyyy-mm-dd hh:mm:ss":
      return (
        [year, month, day].map(formatNumber).join("-") +
        " " +
        [hour, minute, second].map(formatNumber).join(":")
      );
    case "yyyy/mm/dd hh:mm:ss":
      return (
        [year, month, day].map(formatNumber).join("/") +
        " " +
        [hour, minute, second].map(formatNumber).join(":")
      );
    default:
      return (
        [year, month, day].map(formatNumber).join("-") +
        " " +
        [hour, minute, second].map(formatNumber).join(":")
      );
  }
};

/**
 * 路径格式化
 */
const formatUrl = (url: string, obj: any): string => {
  const arr = [];
  if (isObj(obj)) {
    for (const i in obj) {
      arr.push(`${i}=${obj[i]}`);
    }
    return url.indexOf("?") < 0
      ? url + "?" + arr.join("&")
      : url + "&" + arr.join("&");
  }
  return url;
};

/**
 * 获取路径后面指定的参数
 */
const getUrlParas = (name: string, url?: string): string => {
  const exp = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  let s = url || window.location.hash;
  if (s.indexOf("#/?") > -1) {
    s = s.substr(3);
  }
  const v = s.match(exp);
  if (v) {
    return v[2];
  }
  return "";
};

/**
 * 判断当前月份的总天数
 */
const thisMonthLenth = ({ year, month }: any = {}): number => {
  let len = 0;
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    len = 31;
  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
    len = 30;
  } else if (month == 2) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      len = 29;
    } else {
      len = 28;
    }
  }
  return len;
};

/**
 * 节流
 * fn是我们需要包装的事件回调, interval是时间间隔的阈值
 */
const throttle: any = function(fn: any, interval = 1000): any {
  // last为上一次触发回调的时间
  let last: any = 0;

  // 将throttle处理结果当作函数返回
  return function(this: void) {
    // 保留调用时的this上下文
    const context = this;
    // 保留调用时传入的参数
    const args = arguments;
    // 记录本次触发回调的时间
    const now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  };
};

/**
 * 防抖
 * fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
 */
const debounce = function(fn: any, delay: any = 700) {
  // 定时器
  let timer: any = null;

  // 将debounce处理结果当作函数返回
  return function(this: void) {
    // 保留调用时的this上下文
    const context = this;
    // 保留调用时传入的参数
    const args = arguments;

    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 设立新定时器
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

/**
 * 加强版节流
 * fn是我们需要包装的事件回调, delay是时间间隔的阈值
 */
const throttleDebounce = function(fn: any, delay = 1000) {
  // last为上一次触发回调的时间, timer是定时器
  let last: any = 0,
    timer: any = null;
  // 将throttle处理结果当作函数返回

  return function(this: void): any {
    // 保留调用时的this上下文
    const context: any = this;
    // 保留调用时传入的参数
    const args = arguments;
    // 记录本次触发回调的时间
    const now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    }
  };
};

// 把图片路径转成database64
const _url2xml2file = (url: any, exportImageType = 0): any => {
  if (url.indexOf("http") === -1) {
    return;
  }
  url =
    url + (/\?/.test(url) ? "&" : "?") + "timestamp=" + new Date().getTime();
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (!xhr) {
      throw new Error("CORS not supported");
    }
    xhr.open("get", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (this.status == 200) {
        if (exportImageType == 1) {
          // 导出base64格式
          const reader = new FileReader();
          reader.readAsDataURL(this.response);
          reader.onloadend = function(e: any) {
            resolve({ file: e.target.result });
          };
        } else {
          // 默认导出blobURL格式
          resolve(URL.createObjectURL({ file: this.response }));
        }
      } else {
        reject();
      }
    };
    // xhr.onloadstart	= function (e) {
    //     console.log('开始', e)
    // }
    // xhr.onprogress = function (e) {
    //     console.log('请求中', e)
    // }
    // xhr.onabort	= function (e) {
    //     console.log('打断', e)
    // }
    xhr.onerror = function(e) {
      // console.log('错误', e)
      reject(e);
    };
    xhr.ontimeout = function(e) {
      // console.log('超时', e)
      reject(e);
    };
    // xhr.onloadend = function (e) {
    //     console.log('加载完成', e)
    // }
    xhr.send();
  });
};

// 把h5代码中图片路径转化成database64，并返回完整的h5代码
const url2database = (str: any) => {
  const regex = /<img(.*?)src="(.*?)"(.*?)>/g;
  const asyncReplace = async (str: any, regex: any) => {
    const promises: any = [];
    str.replace(regex, (match: any, p1: any, p2: any, p3: any) => {
      if (p3) {
        promises.push(
          _url2xml2file(p2, 1)
            .then((v: any) => [
              p2,
              "<img" + p1 + 'src="' + v.file + '"' + p3 + ">"
            ])
            .catch((v: any) => [p2, "<img" + p1 + 'src=""' + p3 + ">"])
        );
      }
    });
    const results = await Promise.all(promises);
    const replacements: any = results.reduce((a: any, [id, name]: any) => {
      a[id] = name;
      return a;
    }, {});
    return str.replace(regex, (match: any, p1: any, p2: any, p3: any) => {
      if (p3) {
        return replacements[p2];
      }
    });
  };
  return asyncReplace(str, regex);
};

const getWxLoginCodeUrl = (v: any) => {
  const {
    appid = "",
    scope = "snsapi_login",
    redirectUri = "",
    state = "",
    login_type = "jssdk",
    self_redirect = false,
    styletype = "",
    sizetype = "",
    bgcolor = "",
    rst = "",
    style = "",
    href = ""
  } = v;
  return `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&login_type=${login_type}&self_redirect=${
    self_redirect ? "true" : "false"
  }&styletype=${styletype}&sizetype=${sizetype}&bgcolor=${bgcolor}&rst=${rst}&style=${style}&href=${href}`;
};

export {
  hasVal,
  isStr,
  isFn,
  isArr,
  isObj,
  isEmptyObj,
  formatNumber,
  timeStamp,
  formatDateTime,
  formatUrl,
  getUrlParas,
  thisMonthLenth,
  throttle,
  debounce,
  throttleDebounce,
  getWxLoginCodeUrl,
  _url2xml2file,
  url2database,
};
