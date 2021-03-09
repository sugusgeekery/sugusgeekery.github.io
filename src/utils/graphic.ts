// @ts-nocheck
import zrender from "zrender";
import EXIF from "exif-js";
// import { EXIF } from '@/js/exif'
export default class Correction {
  constructor(opts) {
    this.options = {
      devicePixelRatio: window.devicePixelRatio || 1,
      renderer: "canvas",
      id: null,
      zrender,
      width: 0,
      height: 0,
      imageUrl: null,
      editImageUrl: null,
      style: {
        fill: "transparent",
        stroke: "#fd1954",
        backgroundColor: "white",
        lineWidth: 2,
        textLineHeight: 20,
        fontSize: 16,
        textFill: "#fd1954",
        colorGreen: "#0cfb9e",
        textShadowColor: "#ffffff",
        textShadowBlur: 0,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1
      },
      initEnd: function() {},
      initProgress: function() {},
      initError: function() {}
    };
    // 导出图片格式
    this.exportCanvasImageType = "image/jpeg";
    // 是否可以拖拽图形元素
    this.draggable = false;
    // 图形元素最小宽高
    this.minDisplayable = 5;
    // 椭圆等复杂图形半径系数
    this.ratio = 0.5522848;
    // 整体放大比率，【最小倍数，最大倍数】
    this.delta = [1, 2];
    // 移动速率
    this.motionSpeed = 0.2;
    // 放大缩小速率
    this.scaleSpeed = 0.1;
    // 画笔存储路径
    this.brushPaths = [];
    // 编辑按钮类型下标
    this.menuIndex = -1;
    // 编辑按钮组
    this.menus = [
      // {
      //     name: '图片',
      //     type: 100,
      // },
      // {
      //     name: '圆弧',
      //     type: 101,
      // },
      // {
      //     name: '贝塞尔曲线',
      //     type: 102,
      // },
      // {
      //     name: '圆',
      //     type: 103,
      // },
      // {
      //     name: '复合路径',
      //     type: 104,
      // },
      // {
      //     name: '水滴',
      //     type: 105,
      // },
      // {
      //     name: '椭圆',
      //     type: 106,
      // },
      // {
      //     name: '心形',
      //     type: 107,
      // },
      // {
      //     name: '图像',
      //     type: 108,
      // },
      // {
      //     name: '正多边形',
      //     type: 109,
      // },
      // {
      //     name: '直线',
      //     type: 110,
      // },
      // {
      //     name: '路径',
      //     type: 111,
      // },
      // {
      //     name: '多边形',
      //     type: 112,
      // },
      // {
      //     name: '多边形折线段',
      //     type: 113,
      // },
      // {
      //     name: '玫瑰线',
      //     type: 115,
      // },
      // {
      //     name: '扇形',
      //     type: 116,
      // },
      // {
      //     name: '星形',
      //     type: 117,
      // },
      // {
      //     name: '文字',
      //     type: 118,
      // },
      // {
      //     name: '内外旋轮曲线',
      //     type: 119,
      // },
      // {
      //     name: '画笔',
      //     type: 120,
      //     icon: require('@/assets/images/uncorrect_gray.png'),
      //     actIcon: require('@/assets/images/uncorrect_red.png'),
      // },
      // {
      //     name: '虚线笔',
      //     type: 121,
      // },
      // {
      //     name: '逆旋转',
      //     type: 5,
      //     icon: require('@/assets/images/rotation_reverse.png'),
      //     actIcon: '',
      // },
      {
        name: "顺旋转",
        type: 4,
        icon: require("@/assets/images/rotation_smooth.png"),
        actIcon: ""
      },
      {
        name: "撤回",
        type: 2,
        icon: require("@/assets/images/withdraw_prev.png"),
        actIcon: ""
      },
      // {
      //     name: '反撤回',
      //     type: 3,
      //     icon: require('@/assets/images/withdraw_next.png'),
      //     actIcon: '',
      // },
      // {
      //     name: '不规范',
      //     type: 124,
      //     content: '不规范',
      //     icon: require('@/assets/images/irregular_gray.png'),
      //     actIcon: require('@/assets/images/irregular_red.png'),
      // },
      // {
      //     name: '缺步骤',
      //     type: 125,
      //     content: '缺步骤',
      //     icon: require('@/assets/images/step_gray.png'),
      //     actIcon: require('@/assets/images/step_red.png'),
      // },
      {
        name: "不批改",
        type: 126,
        content: "不批改-题目不全/非批改题型/部分模糊",
        contentWidth: 285,
        icon: require("@/assets/images/uncorrect_gray.png"),
        actIcon: require("@/assets/images/uncorrect_red.png")
      },
      // {
      //     name: 'AI识别结果图片',
      //     type: 127,
      //     icon: require('@/assets/images/uncorrect_gray.png'),
      //     actIcon: require('@/assets/images/uncorrect_red.png'),
      // },
      {
        name: "矩形",
        type: 114,
        icon: require("@/assets/images/rect_gray.png"),
        actIcon: require("@/assets/images/rect_red.png")
      },
      {
        name: "缩小",
        type: 7,
        icon: require("@/assets/images/zoom_out.png"),
        actIcon: ""
      },
      {
        name: "放大",
        type: 6,
        icon: require("@/assets/images/zoom_in.png"),
        actIcon: ""
      },
      // {
      //     name: '错叉',
      //     type: 123,
      //     icon: require('@/assets/images/cross_gray.png'),
      //     actIcon: require('@/assets/images/cross_red.png'),
      // },
      {
        name: "对勾",
        type: 122,
        icon: require("@/assets/images/hook_gray.png"),
        actIcon: require("@/assets/images/hook_red.png")
      },
      {
        name: "移动",
        type: 8,
        icon: require("@/assets/images/move_gray.png"),
        actIcon: require("@/assets/images/move_red.png")
      },
      {
        name: "重置",
        type: 9,
        icon: require("@/assets/images/reset.png"),
        actIcon: ""
      }
      // {
      //     name: '保存',
      //     type: 1,
      // },
    ];
    // zrender实例对象
    this.z = null;
    // zrender实例对象下的组对象，目前功能只有唯一一个组对象
    this.zg = null;
    // 底层基准图片对象
    this.zgImg = null;
    // 图片原生信息
    this.imageOriginInfo = {};
    // 配置项融合
    this.options = Object.assign({}, this.options, opts);
    // zrender扩展自定义图形方法
    this._customGraphics();
    // 自动初始化
    this._init();
  }
  _url2xml2file(url, exportImageType = 0) {
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
            reader.onload = function() {
              resolve(this.result);
            };
          } else {
            // 默认导出blobURL格式
            resolve(URL.createObjectURL(this.response));
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
  }
  // _url2canvas2file (url, exportImageType = 0) {
  //     url = url + ((/\?/).test(url) ? '&' : '?') + 'timestamp=' + new Date().getTime()
  //     const { exportCanvasImageType } = this
  //     return new Promise((resolve, reject) => {
  //         const canvas = document.createElement('canvas')
  //         const img = new Image()
  //         img.src = url
  //         img.crossOrigin = "Anonymous"
  //         img.onload = function (e) {
  //             const { width, height, } = e.target
  //             canvas.width = width
  //             canvas.height = height
  //             const ctx = canvas.getContext('2d')
  //             ctx.drawImage(img, 0, 0, width, height)
  //             if (exportImageType == 1) {
  //                 resolve(canvas.toDataURL(exportCanvasImageType))
  //             } else {
  //                 canvas.toBlob(blob => {
  //                     resolve(URL.createObjectURL(blob))
  //                 }, exportCanvasImageType)
  //             }
  //         }
  //         img.onerror = function (e) {
  //             reject(e)
  //         }
  //     })
  // }
  _fixPictureOrientation(obj = {}) {
    const { Orientation = 1 } = obj;
    const { rotation, rotationType } = (o => {
      let rotation = 0;
      let rotationType = 0;
      switch (o) {
        case 6:
          //需要顺时针90度旋转（原图向左）
          rotation -= ((90 / 180) * Math.PI) % (Math.PI * 2);
          rotationType = 3;
          break;
        case 8:
          //需要逆时针90度旋转（原图向右）
          rotation += ((90 / 180) * Math.PI) % (Math.PI * 2);
          rotationType = 4;
          break;
        case 3:
          //需要180度旋转
          rotation += (((90 / 180) * Math.PI) % (Math.PI * 2)) * 2;
          rotationType = 6;
          break;
        default:
          rotation = 0;
          rotationType = 0;
          break;
      }
      return { rotation, rotationType };
    })(Orientation);
    if (rotation) {
      this.zg.attr({
        rotation,
        rotationType
      });
    }
  }
  async _init(type = 0) {
    const { options } = this;
    let { imageUrl, editImageUrl, zrender, renderer, id, initError } = options;
    try {
      if (type == 1) {
        if (imageUrl) {
          imageUrl = await this._url2xml2file(imageUrl, 1);
        }
      } else {
        if (imageUrl) {
          imageUrl = await this._url2xml2file(imageUrl, 1);
        }
        if (editImageUrl) {
          editImageUrl = await this._url2xml2file(editImageUrl, 1);
        }
      }
    } catch (e) {
      initError(e);
      return;
    }
    if (!zrender) {
      initError("Please introduce zrender.js Retry");
      return;
    }
    if (!id) {
      initError("Please select DOMID in use");
      return;
    }
    const img = new Image();
    img.src = type == 1 ? imageUrl : editImageUrl || imageUrl;
    img.onerror = e => {
      initError(e);
    };
    img.onload = e => {
      let {
        width,
        height,
        x = 0,
        y = 0,
        w = options.width,
        h = options.height,
        cw = options.width,
        ch = options.height,
        minx = 0,
        miny = 0,
        maxx = 0,
        maxy = 0,
        devicePixelRatio = 1
      } = e.target;

      if (width > height) {
        devicePixelRatio = width / options.width;
        h = (w * height) / width;
        y = (ch - h) / 2;
      } else {
        devicePixelRatio = height / options.height;
        w = (h * width) / height;
        x = (cw - w) / 2;
      }
      this.z = zrender.init(id, {
        width: cw,
        height: ch,
        devicePixelRatio,
        renderer
      });
      this.options.devicePixelRatio = devicePixelRatio;
      this.zg = new zrender.Group({
        origin: [cw / 2, ch / 2],
        style: {
          cw,
          ch,
          minx,
          miny,
          maxx,
          maxy,
          x,
          y,
          w,
          h
        }
      });
      this.z.add(this.zg);
      this._bindEvent();
      if (type) {
        this._drawImage(imageUrl, { name: "原图片", type: 0 });
      } else {
        if (editImageUrl) {
          this._drawImage(editImageUrl, { name: "编辑过图片", type: 100 });
        } else {
          this._drawImage(imageUrl, { name: "原图片", type: 0 });
        }
      }
      // 调整图片为正水平方向
      EXIF.getData(img, () => {
        const imageOriginInfo = EXIF.getAllTags(img);
        this.imageOriginInfo = imageOriginInfo;
        this._fixPictureOrientation(imageOriginInfo);
      });
    };
  }
  _customGraphics() {
    const { zrender } = this.options;
    // 勾
    this.options.zrender.Hook = zrender.Path.extend({
      type: "hook",
      shape: {
        x: 0,
        y: 0,
        d: 0
      },
      buildPath(path, shape) {
        const { x, y, d } = shape;
        path.moveTo(x, y + (d / 30) * 14);
        path.lineTo(x + (d / 30) * 12, y + d * (29 / 30));
        path.lineTo(x + d, y);
      }
    });
    // 叉
    this.options.zrender.Cross = zrender.Path.extend({
      type: "cross",
      shape: {
        x: 0,
        y: 0,
        d: 0
      },
      buildPath(path, shape) {
        const { x, y, d } = shape;
        const t = d / 10;
        path.moveTo(x, y);
        path.lineTo(x + d - t, y + d);
        path.moveTo(x, y + d);
        path.lineTo(x + d - t, y);
      }
    });
  }
  _bindEvent() {
    const eventArray = ["mousedown", "mouseup", "mousemove"];
    for (const i in eventArray) {
      this.z.on(eventArray[i], this[`_${eventArray[i]}`], this);
    }
  }
  _mousedown(e) {
    const { zrX, zrY } = e.event;
    e.event.preventDefault();
    this.sx = zrX;
    this.sy = zrY;
    const { menuIndex, menus } = this;
    const { type } = menus[menuIndex] || {};
    if (type == 120 || type == 121) {
      this.startBrush();
    }
  }
  _mouseup(e) {
    const { zrX, zrY } = e.event;
    e.event.preventDefault();
    const { sx, sy, menuIndex, menus } = this;
    const { type } = menus[menuIndex] || {};
    if (sx > 0 && sy > 0) {
      switch (type) {
        case 103:
          this.drawCircle(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        case 106:
          this.drawEllipse(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        case 107:
          this.drawHeart(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        case 114:
          this.drawRect(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        case 120:
        case 121:
          this.drawBrush();
          break;
        case 122:
          this.drawHook(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        case 123:
          this.drawCross(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        case 124:
        case 125:
        case 126:
          this.drawRect(sx, sy, zrX, zrY, menus[menuIndex]);
          break;
        default:
          break;
      }
    }
    this.sx = 0;
    this.sy = 0;
  }
  _mousemove(e) {
    const { zrX, zrY } = e.event;
    e.event.preventDefault();
    const { sx, sy, menuIndex, menus } = this;
    const { type } = menus[menuIndex] || {};
    if (sx > 0 && sy > 0) {
      const ex = zrX - sx;
      const ey = zrY - sy;
      if (type == 8) {
        this.moveGroup(ex, ey);
      } else if (type == 120) {
        this.moveSolidBrush(zrX, zrY, menus[menuIndex]);
      }
    }
  }
  _flush() {
    this.zg.eachChild((e, i) => {
      if (i > 1) {
        e.attr("draggable", this.draggable);
      }
    });
  }
  dispose() {
    this.z && this.z.dispose && this.z.dispose();
  }
  setMenuIndex(index = -1) {
    const { menus = [], menuIndex = -1 } = this;
    const { type } = menus[index] || {};
    switch (~~type) {
      case 2:
        this.revokePrevious();
        break;
      case 3:
        this.revokeNext();
        break;
      case 4:
        this.rotate(1);
        break;
      case 5:
        this.rotate(2);
        break;
      case 6:
        this.scaleGroup(1);
        break;
      case 7:
        this.scaleGroup(-1);
        break;
      case 9:
        this.reset();
        break;
      default:
        this.menuIndex = index === -1 || menuIndex === index ? -1 : index;
        this.draggable = this.menuIndex == -1;
        this._flush();
    }
  }
  moveGroup(x1, y1) {
    const { motionSpeed, zg } = this;
    const { position, style } = zg;
    const { minx, miny, maxx, maxy } = style;
    const tx = position[0] + x1 * motionSpeed;
    const ty = position[1] + y1 * motionSpeed;
    const tempx = tx < minx ? minx : tx > maxx ? maxx : tx;
    const tempy = ty < miny ? miny : ty > maxy ? maxy : ty;
    this.zg.attr({
      position: [tempx, tempy]
    });
  }
  scaleGroup(number) {
    const { delta, scaleSpeed, zg } = this;
    const { position, scale, style, rotation } = zg;
    let { cw, ch, minx, miny, maxx, maxy, x, y, w, h } = style;
    const t = number * scaleSpeed;
    const tx = scale[0] + t;
    const ty = scale[1] + t;
    if (tx < delta[0] || ty < delta[0] || tx > delta[1] || ty > delta[1])
      return;
    minx = ((delta[0] - tx) * cw) / 2;
    miny = ((delta[0] - ty) * ch) / 2;
    maxx = (-(delta[0] - tx) * cw) / 2;
    maxy = (-(delta[0] - ty) * ch) / 2;
    const py =
      position[1] > maxy ? maxy : position[1] < miny ? miny : position[1];
    const px =
      position[0] > maxx ? maxx : position[0] < minx ? minx : position[0];
    const tr = rotation - 2 * Math.PI;
    this.zg.attr({
      scale: [tx, ty],
      position: [px, py],
      rotation: tr,
      style: { cw, ch, minx, miny, maxx, maxy, x, y, w, h }
    });
  }
  revokePrevious() {
    const { zg = {} } = this;
    const zgArr = zg.children() || [];
    const len = zgArr.length || 0;
    if (len < 2) {
      return;
    }
    this.zg.remove(zgArr[len - 1]);
  }
  reset() {
    this.dispose();
    this._init(1);
  }
  getCanvasRenderGroup() {
    const { zg = {} } = this;
    const fn = list => {
      const arr = [];
      if (list.length > 0) {
        for (const v of list) {
          if (v.children) {
            const c = v.children() || [];
            if (c.length > 0) {
              arr.push(c[0]["expansion"]["type"]);
            } else {
              arr.push(v["expansion"]["type"]);
            }
          } else {
            arr.push(v["expansion"]["type"]);
          }
        }
      }
      return arr;
    };
    return fn(zg.children() || []);
  }
  saveCorrection({ exportImageType = 0 } = {}) {
    this.zg.attr({
      scale: [1, 1],
      position: [0, 0]
    });
    return this.clipImage(exportImageType);
  }
  rotate(type) {
    const { rotation, rotationType = 0 } = this.zg;
    const tr =
      type == 2
        ? (rotation + (90 / 180) * Math.PI) % (Math.PI * 2)
        : (rotation - (90 / 180) * Math.PI) % (Math.PI * 2);
    const trType =
      type == 2
        ? rotationType - 1 === -4
          ? 0
          : rotationType - 1
        : rotationType + 1 === 4
        ? 0
        : rotationType + 1;
    this.zg.attr({
      rotation: tr,
      rotationType: trType
    });
  }
  startBrush() {
    const { options } = this;
    const { zrender } = options;
    this.brushPaths = new zrender.Group();
  }
  moveSolidBrush(ex, ey, expansion) {
    const { delta, options, zg, sx, sy } = this;
    if (sx == 0 || sy == 0) return;
    const { zrender, style } = options;
    const { fill, stroke, lineWidth } = style;
    const { scale, position, rotation, origin } = zg;
    const x1 = sx - position[0];
    const y1 = sy - position[1];
    const x2 = ex - position[0];
    const y2 = ey - position[1];
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    const zgChild = new zrender.Line({
      expansion,
      shape: {
        x1,
        y1,
        x2,
        y2,
        percent: 1
      },
      origin,
      scale: ts,
      rotation: tr,
      style: {
        fill,
        stroke,
        lineWidth
      }
    });
    this.sx = ex;
    this.sy = ey;
    this.brushPaths.add(zgChild);
  }
  drawBrush() {
    this.z.add(this.zg.add(this.brushPaths));
    this.brushPaths = [];
  }
  clipPath() {
    const { delta, options, zg, zgImg } = this;
    const { zrender } = options;
    const { fill, stroke, lineWidth } = options.style;
    const { scale, rotation, origin } = zg;
    const { x, y, width, height } = zgImg.style;
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    const zgChild = new zrender.Rect({
      shape: {
        r: [1],
        x,
        y,
        width,
        height
      },
      rotation: tr,
      scale: ts,
      origin,
      style: {
        fill,
        stroke,
        lineWidth
      }
    });
    this.zg.setClipPath(zgChild);
    this.z.add(this.zg);
  }
  _drawImage(image, expansion) {
    const { delta, options, zg } = this;
    const { zrender, initEnd } = options;
    const { scale, rotation, origin, style } = zg;
    const { x, y, w, h } = style;
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    const zgChild = new zrender.Image({
      expansion,
      origin,
      rotation: tr,
      scale: ts,
      style: {
        image,
        x,
        y,
        width: w,
        height: h
      }
    });
    this.zgImg = zgChild;
    this.z.add(this.zg.add(zgChild));
    this.clipPath();
    initEnd();
  }
  async drawImage(image, index = -1, expansion) {
    if (image) {
      image = await this._url2xml2file(image, 1);
    }
    const { delta, options, zg } = this;
    const { zrender, editImageUrl } = options;
    const { scale, rotation, origin, style } = zg;
    const { x, y, w, h } = style;
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    const zgChild = new zrender.Image({
      expansion,
      origin,
      rotation: tr,
      scale: ts,
      style: {
        image,
        x,
        y,
        width: w,
        height: h
      }
    });
    this.zgImg = zgChild;
    if (index > -1) {
      const c = this.zg.children();
      const l = !!editImageUrl + index;
      if (c.length > l) {
        const e = c[l];
        this.zg.addBefore(zgChild, e);
        this.z.add(this.zg);
      } else {
        this.z.add(this.zg.add(zgChild));
      }
    } else {
      this.z.add(this.zg.add(zgChild));
    }
  }
  clipImage(exportImageType) {
    const { options, zgImg, zg, z, exportCanvasImageType } = this;
    const { zrender, devicePixelRatio } = options;
    const { backgroundColor } = options.style;
    const { rotationType = 0 } = zg;
    let { x, y, width, height } = zgImg.style;
    x *= devicePixelRatio;
    y *= devicePixelRatio;
    width *= devicePixelRatio;
    height *= devicePixelRatio;
    const canvas = new zrender.util.createCanvas();
    let left = 0;
    let top = 0;
    let cw = 0;
    let ch = 0;

    const orientation = Math.abs(rotationType);
    if (orientation === 1 || orientation === 3) {
      cw = canvas.width = height;
      ch = canvas.height = width;
      if (width > height) {
        left = y;
      } else {
        top = x;
      }
    } else {
      cw = canvas.width = width;
      ch = canvas.height = height;
      if (width > height) {
        top = y;
      } else {
        left = x;
      }
    }

    const image_target = z.painter.getRenderedCanvas({
      backgroundColor
    });
    const fileDataFn = (e, exportFileType = 0, exportCanvasImageType) => {
      return new Promise((resolve, reject) => {
        if (exportFileType == 1) {
          if (e.toDataURL) {
            const url = e.toDataURL(exportCanvasImageType);
            resolve({ url, file: url });
          } else {
            reject("toDataURL is not defined");
          }
        } else {
          if (e.toBlob) {
            e.toBlob(blob => {
              // const url = window.URL.createObjectURL(blob)
              // window.URL.revokeObjectURL(url)
              resolve({ url: blob, file: blob });
            }, exportCanvasImageType);
          } else {
            reject("toBlob is not defined");
          }
        }
      });
    };
    return new Promise(async (resolve, reject) => {
      try {
        const { file = null } = await fileDataFn(
          image_target,
          exportImageType,
          exportCanvasImageType
        );
        if (file) {
          const img = new Image();
          const url = exportImageType ? file : window.URL.createObjectURL(file);
          img.src = url;
          img.onload = async () => {
            if (!exportImageType) {
              window.URL.revokeObjectURL(url);
            }
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, left, top, cw, ch, 0, 0, cw, ch);
            try {
              const { file = null } =
                (await fileDataFn(
                  ctx.canvas,
                  exportImageType,
                  exportCanvasImageType
                )) || "";
              resolve({ file });
            } catch (e) {
              reject(e);
            }
          };
          img.onerror = e => {
            reject(e);
          };
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  drawEllipse(sx, sy, ex, ey, expansion) {
    const { delta, ratio, options, zg, minDisplayable, draggable } = this;
    const { zrender } = options;
    const { fill, stroke, lineWidth } = options.style;
    const { scale, position, rotation, origin } = zg;
    const rx = Math.abs(ex - sx) * ratio;
    const ry = Math.abs(ey - sy) * ratio;
    const cx = (ex + sx) / 2 - position[0];
    const cy = (ey + sy) / 2 - position[1];
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    if (rx < minDisplayable || ry < minDisplayable) return;
    const zgChild = new zrender.Ellipse({
      expansion,
      shape: {
        rx,
        ry,
        cx,
        cy
      },
      origin,
      rotation: tr,
      scale: ts,
      style: {
        fill,
        stroke,
        lineWidth
      },
      draggable
    });
    this.z.add(this.zg.add(zgChild));
    this.options.initProgress();
  }
  drawCircle(sx, sy, ex, ey, expansion) {
    const { delta, options, zg, minDisplayable, draggable } = this;
    const { zrender } = options;
    const { fill, stroke, lineWidth } = options.style;
    const { scale, position, rotation, origin } = zg;
    const width = Math.abs(ex - sx);
    const height = Math.abs(ey - sy);
    const cx = (ex + sx) / 2 - position[0];
    const cy = (ey + sy) / 2 - position[1];
    const r = Math.min(width, height) / 2;
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    if (r < minDisplayable) return;
    const zgChild = new zrender.Circle({
      expansion,
      shape: {
        r,
        cx,
        cy
      },
      scale: ts,
      origin,
      rotation: tr,
      style: {
        fill,
        stroke,
        lineWidth
      },
      draggable
    });
    this.z.add(this.zg.add(zgChild));
    this.options.initProgress();
  }
  drawHeart(sx, sy, ex, ey, expansion) {
    const { delta, options, zg, ratio, minDisplayable, draggable } = this;
    const { zrender } = options;
    const { fill, stroke, lineWidth } = options.style;
    const { scale, position, rotation, origin } = zg;
    const width = Math.abs(ex - sx) * ratio;
    const height = Math.abs(ey - sy) * ratio;
    const cx = (ex + sx) / 2 - position[0];
    const cy = (ey + sy) / 2 - position[1];
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    if (width < minDisplayable || height < minDisplayable) return;
    const zgChild = new zrender.Heart({
      expansion,
      shape: {
        cx,
        cy,
        width,
        height
      },
      scale: ts,
      origin,
      rotation: tr,
      style: {
        fill,
        stroke,
        lineWidth
      },
      draggable
    });
    this.z.add(this.zg.add(zgChild));
    this.options.initProgress();
  }
  drawRect(sx, sy, ex, ey, expansion) {
    const { content = "", contentWidth = 200 } = expansion;
    const { delta, options, zg, minDisplayable, draggable } = this;
    const { zrender } = options;
    const {
      fill,
      stroke,
      lineWidth,
      textLineHeight,
      fontSize,
      textFill,
      textShadowColor,
      textShadowBlur,
      textShadowOffsetX,
      textShadowOffsetY
    } = options.style;
    const { scale, position, rotation, rotationType = 0, origin, style } = zg;
    const w = ex - sx;
    const h = ey - sy;
    const x = (w < 0 ? ex : sx) - position[0];
    const y = (h < 0 ? ey : sy) - position[1];
    const width = Math.abs(w);
    const height = Math.abs(h);
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    if (width < minDisplayable || height < minDisplayable) return;

    const zgChild = new zrender.Rect({
      expansion,
      shape: {
        r: [1],
        x,
        y,
        width,
        height
      },
      rotation: tr,
      scale: ts,
      origin,
      style: {
        fill,
        stroke,
        lineWidth
      },
      draggable
    });
    if (content) {
      const tempGroup = new zrender.Group();
      tempGroup.add(zgChild);
      const orientation = Math.abs(rotationType);
      const isOrientation = orientation === 1 || orientation === 3;
      // const minw = isOrientation ? style.y * scale[1] : style.x * scale[0]
      const minh = isOrientation
        ? style.x + style.minx * (delta[0] / scale[0])
        : style.y + style.miny * (delta[0] / scale[1]);
      const maxw = isOrientation
        ? style.y + style.h + style.maxy * (delta[0] / scale[1])
        : style.x + style.w + style.maxx * (delta[0] / scale[0]);
      // const maxh = isOrientation ? (style.x + style.w) * scale[0] : (style.y + style.h) * scale[1]
      const textWidth = contentWidth;
      const textHeight = textLineHeight * 1.2;
      const tx = x > maxw - textWidth ? maxw - textWidth : x;
      const ty =
        y - textHeight > minh
          ? y - textHeight
          : y + height + textLineHeight * 0.2;

      const textChild = new zrender.Text({
        style: {
          x: tx,
          y: ty,
          text: content,
          fontSize,
          textLineHeight,
          textFill,
          textShadowColor,
          textShadowBlur,
          textShadowOffsetX,
          textShadowOffsetY
        },
        rotation: tr,
        scale: ts,
        origin
      });
      tempGroup.add(textChild);
      this.z.add(this.zg.add(tempGroup));
    } else {
      this.z.add(this.zg.add(zgChild));
    }
    this.options.initProgress();
  }
  drawHook(sx, sy, ex, ey, expansion) {
    const { delta, options, zg, minDisplayable, draggable } = this;
    const { zrender } = options;
    const { fill, colorGreen, lineWidth } = options.style;
    const { scale, position, rotation, origin } = zg;
    const w = ex - sx;
    const h = ey - sy;
    const x = (w < 0 ? ex : sx) - position[0];
    const y = (h < 0 ? ey : sy) - position[1];
    const d = Math.min(w, h);
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    if (d < minDisplayable) return;
    const zgChild = new zrender.Hook({
      expansion,
      shape: {
        x,
        y,
        d
      },
      rotation: tr,
      scale: ts,
      origin,
      style: {
        fill,
        stroke: colorGreen,
        lineWidth: lineWidth * 2
      },
      draggable
    });
    this.z.add(this.zg.add(zgChild));
    this.options.initProgress();
  }
  drawCross(sx, sy, ex, ey, expansion) {
    const { delta, options, zg, minDisplayable, draggable } = this;
    const { zrender } = options;
    const { fill, stroke, lineWidth } = options.style;
    const { scale, position, rotation, origin } = zg;
    const w = ex - sx;
    const h = ey - sy;
    const x = (w < 0 ? ex : sx) - position[0];
    const y = (h < 0 ? ey : sy) - position[1];
    const d = Math.min(w, h);
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    if (d < minDisplayable) return;
    const zgChild = new zrender.Cross({
      expansion,
      shape: {
        x,
        y,
        d
      },
      rotation: tr,
      scale: ts,
      origin,
      style: {
        fill,
        stroke,
        lineWidth: lineWidth * 2
      },
      draggable
    });
    this.z.add(this.zg.add(zgChild));
    this.options.initProgress();
  }
}
