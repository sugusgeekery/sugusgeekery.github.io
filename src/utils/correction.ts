// @ts-nocheck
import zrender from "zrender";
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
      editProgress: function() {},
      initEnd: function() {},
      initError: function() {}
    };
    // 绘制图片类型 默认0有标注显示标注没有标注显示原图，1只显示原图
    this.drawImageType = 0;
    // 编辑图片类型
    this.editImageType = 2;
    // 导出图片格式
    this.canvas2ImageType = "image/jpeg";
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
    this.menu = [
      // {
      //     text: '图片',
      //     type: 100,
      // },
      // {
      //     text: '口算识别',
      //     type: 127,
      // },
      // {
      //     text: '圆弧',
      //     type: 101,
      // },
      // {
      //     text: '贝塞尔曲线',
      //     type: 102,
      // },
      // {
      //     text: '圆',
      //     type: 103,
      // },
      // {
      //     text: '复合路径',
      //     type: 104,
      // },
      // {
      //     text: '水滴',
      //     type: 105,
      // },
      // {
      //     text: '椭圆',
      //     type: 106,
      // },
      // {
      //     text: '心形',
      //     type: 107,
      // },
      // {
      //     text: '图像',
      //     type: 108,
      // },
      // {
      //     text: '正多边形',
      //     type: 109,
      // },
      // {
      //     text: '直线',
      //     type: 110,
      // },
      // {
      //     text: '路径',
      //     type: 111,
      // },
      // {
      //     text: '多边形',
      //     type: 112,
      // },
      // {
      //     text: '多边形折线段',
      //     type: 113,
      // },
      // {
      //     text: '玫瑰线',
      //     type: 115,
      // },
      // {
      //     text: '扇形',
      //     type: 116,
      // },
      // {
      //     text: '星形',
      //     type: 117,
      // },
      // {
      //     text: '文字',
      //     type: 118,
      // },
      // {
      //     text: '内外旋轮曲线',
      //     type: 119,
      // },
      // {
      //     text: '画笔',
      //     type: 120,
      // },
      // {
      //     text: '虚线笔',
      //     type: 121,
      // },
      // {
      //     text: '逆旋转',
      //     type: 5,
      //     icon: require('@/assets/images/rotation_reverse.png'),
      //     actIcon: '',
      // },
      {
        text: "顺旋转",
        type: 4,
        icon: require("@/assets/images/rotation_smooth.png"),
        actIcon: ""
      },
      {
        text: "撤回",
        type: 2,
        icon: require("@/assets/images/withdraw_prev.png"),
        actIcon: ""
      },
      // {
      //     text: '反撤回',
      //     type: 3,
      //     icon: require('@/assets/images/withdraw_next.png'),
      //     actIcon: '',
      // },
      // {
      //     text: '不规范',
      //     type: 124,
      //     icon: require('@/assets/images/irregular_gray.png'),
      //     actIcon: require('@/assets/images/irregular_red.png'),
      // },
      // {
      //     text: '缺步骤',
      //     type: 125,
      //     icon: require('@/assets/images/step_gray.png'),
      //     actIcon: require('@/assets/images/step_red.png'),
      // },
      {
        text: "不批改",
        type: 126,
        icon: require("@/assets/images/uncorrect_gray.png"),
        actIcon: require("@/assets/images/uncorrect_red.png")
      },
      {
        text: "矩形",
        type: 114,
        icon: require("@/assets/images/rect_gray.png"),
        actIcon: require("@/assets/images/rect_red.png")
      },
      {
        text: "缩小",
        type: 7,
        icon: require("@/assets/images/zoom_out.png"),
        actIcon: ""
      },
      {
        text: "放大",
        type: 6,
        icon: require("@/assets/images/zoom_in.png"),
        actIcon: ""
      },
      // {
      //     text: '错叉',
      //     type: 123,
      //     icon: require('@/assets/images/cross_gray.png'),
      //     actIcon: require('@/assets/images/cross_red.png'),
      // },
      {
        text: "对勾",
        type: 122,
        icon: require("@/assets/images/hook_gray.png"),
        actIcon: require("@/assets/images/hook_red.png")
      },
      {
        text: "移动",
        type: 8,
        icon: require("@/assets/images/move_gray.png"),
        actIcon: require("@/assets/images/move_red.png")
      },
      {
        text: "重置",
        type: 9,
        icon: require("@/assets/images/reset.png"),
        actIcon: ""
      }
      // {
      //     text: '保存',
      //     type: 1,
      // },
    ];
    // zrender实例对象
    this.z = null;
    // zrender实例对象下的组对象，目前功能只有唯一一个组对象
    this.zg = null;
    // 撤销组下标
    this.revokeIdx = -1;
    // 撤销组
    this.revoke = [];
    // 记录编辑图形
    this.shapes = [];
    // 配置项融合
    this.options = Object.assign({}, this.options, opts);
    // zrender扩展方法
    this._zrenderExtension();
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
  //     const { canvas2ImageType } = this
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
  //                 resolve(canvas.toDataURL(canvas2ImageType))
  //             } else {
  //                 canvas.toBlob(blob => {
  //                     resolve(URL.createObjectURL(blob))
  //                 }, canvas2ImageType)
  //             }
  //         }
  //         img.onerror = function (e) {
  //             reject(e)
  //         }
  //     })
  // }
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
      throw e;
    }
    if (!zrender) {
      initError("Please introduce zrender.js Retry");
      throw new Error("Please introduce zrender.js Retry");
    }
    if (!id) {
      initError("Please select DOMID in use");
      throw new Error("Please select DOMID in use");
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
      this.shapes = [];
      if (type) {
        this.drawImageType = 0;
        this._drawImage(imageUrl);
      } else {
        this.drawImageType = +!!editImageUrl;
        if (editImageUrl) {
          this._drawImage(editImageUrl, 100);
        } else {
          this._drawImage(imageUrl);
        }
      }
    };
  }
  _zrenderExtension() {
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
    const { menuIndex, menu } = this;
    const { type } = menu[menuIndex] || {};
    if (type == 120 || type == 121) {
      this.startBrush();
    }
  }
  _mouseup(e) {
    const { zrX, zrY } = e.event;
    e.event.preventDefault();
    const { sx, sy, menuIndex, menu } = this;
    const { type } = menu[menuIndex] || {};
    if (sx > 0 && sy > 0) {
      switch (type) {
        case 103:
          this.drawCircle(sx, sy, zrX, zrY, type);
          break;
        case 106:
          this.drawEllipse(sx, sy, zrX, zrY, type);
          break;
        case 107:
          this.drawHeart(sx, sy, zrX, zrY, type);
          break;
        case 114:
          this.drawRect(sx, sy, zrX, zrY, "", type);
          break;
        case 120:
        case 121:
          this.drawBrush(type);
          break;
        case 122:
          this.drawHook(sx, sy, zrX, zrY, type);
          break;
        case 123:
          this.drawCross(sx, sy, zrX, zrY, type);
          break;
        case 124:
          this.drawRect(sx, sy, zrX, zrY, "不规范", type);
          break;
        case 125:
          this.drawRect(sx, sy, zrX, zrY, "缺步骤", type);
          break;
        case 126:
          this.drawRect(
            sx,
            sy,
            zrX,
            zrY,
            "不批改-题目不全或者非批改题型",
            type
          );
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
    const { sx, sy, menuIndex, menu } = this;
    const { type } = menu[menuIndex] || {};
    if (sx > 0 && sy > 0) {
      const ex = zrX - sx;
      const ey = zrY - sy;
      if (type == 8) {
        this.moveGroup(ex, ey);
      } else if (type == 120) {
        this.moveSolidBrush(zrX, zrY);
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
    const { menuIndex = -1, menu = [] } = this;
    const { type } = menu[index] || {};
    switch (~~type) {
      case 2:
        this.revokePrevious();
        return menuIndex;
      case 3:
        this.revokeNext();
        return menuIndex;
      case 4:
        this.rotate(1);
        return menuIndex;
      case 5:
        this.rotate(2);
        return menuIndex;
      case 6:
        this.scaleGroup(1);
        return menuIndex;
      case 7:
        this.scaleGroup(-1);
        return menuIndex;
      case 9:
        this.reset();
        return menuIndex;
      default:
        this.menuIndex = menuIndex == index ? -1 : index;
        this.draggable = this.menuIndex == -1;
        this._flush();
        return this.menuIndex;
    }
  }
  getMenu() {
    return this.menu;
  }
  getMenuIndex() {
    return this.menuIndex;
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
    // this.options.editProgress()
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
    const tr = rotation - (360 / 180) * Math.PI;
    this.zg.attr({
      scale: [tx, ty],
      position: [px, py],
      rotation: tr,
      style: { cw, ch, minx, miny, maxx, maxy, x, y, w, h }
    });
  }
  revokePrevious() {
    const { revoke, revokeIdx, drawImageType } = this;
    if (revokeIdx <= 1) {
      this.options.editProgress(drawImageType);
    }
    if (revokeIdx < 1) {
      return;
    }
    this.shapes.pop();
    this.zg.remove(revoke[revokeIdx]);
    this.revokeIdx = revokeIdx - 1;
  }
  revokeNext() {
    const { revoke, revokeIdx, editImageType } = this;
    if (revokeIdx > revoke.length - 2) {
      return;
    }
    this.revokeIdx = revokeIdx + 1;
    this.z.add(this.zg.add(revoke[this.revokeIdx]));
    this.options.editProgress(editImageType);
  }
  reset() {
    this.dispose();
    this._init(1);
    // const { revoke } = this
    // this.zg.removeAll()
    // this.zg.add(revoke[0])
    // this.zg.attr({
    //     scale: [1, 1],
    //     position: [0, 0],
    //     rotation: 0,
    // })
    // this.revokeIdx = 0
  }
  saveCorrection({ exportImageType = 0 } = {}) {
    this.zg.attr({
      scale: [1, 1],
      position: [0, 0]
    });
    return this.clipImage(exportImageType);
  }
  rotate(type) {
    const { rotation } = this.zg;
    const tr =
      type == 2
        ? (rotation + (90 / 180) * Math.PI) % (Math.PI * 2)
        : (rotation - (90 / 180) * Math.PI) % (Math.PI * 2);
    this.zg.attr({
      rotation: tr
    });
  }
  startBrush() {
    const { options } = this;
    const { zrender } = options;
    this.brushPaths = new zrender.Group();
  }
  moveSolidBrush(ex, ey) {
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
  drawBrush(type) {
    this.z.add(this.zg.add(this.brushPaths));
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.brushPaths = [];
    this.options.editProgress(this.editImageType);
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
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
  }
  _drawImage(image, type) {
    const { delta, options, zg, drawImageType = 0 } = this;
    const { zrender, initEnd } = options;
    const { scale, rotation, origin, style } = zg;
    const { x, y, w, h } = style;
    const ts = [delta[0] / scale[0], delta[0] / scale[1]];
    const tr = -rotation;
    const zgChild = new zrender.Image({
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
    if (type) {
      this.shapes.push(type);
    }
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;

    this.clipPath();
    initEnd(drawImageType);
    // URL.revokeObjectURL(image)
  }
  async drawImage(image, index = -1, type) {
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
        // if (l) {
        // this.zg.remove(c[1])
        // }
        this.z.add(this.zg);
      } else {
        this.z.add(this.zg.add(zgChild));
      }
    } else {
      this.z.add(this.zg.add(zgChild));
    }
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
    // URL.revokeObjectURL(image)
  }
  clipImage(exportImageType) {
    const { options, zgImg, zg, z, canvas2ImageType } = this;
    const { zrender, devicePixelRatio } = options;
    const { backgroundColor } = options.style;
    const { rotation } = zg;
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
    if (~~(rotation % Math.PI) == 0) {
      cw = canvas.width = width;
      ch = canvas.height = height;
      if (width > height) {
        top = y;
      } else {
        left = x;
      }
    } else {
      cw = canvas.width = height;
      ch = canvas.height = width;
      if (width > height) {
        left = y;
      } else {
        top = x;
      }
    }

    const image_target = z.painter.getRenderedCanvas({
      backgroundColor
    });
    const fileDataFn = (e, exportFileType = 0, canvas2ImageType) => {
      return new Promise((resolve, reject) => {
        if (exportFileType == 1) {
          if (e.toDataURL) {
            const url = e.toDataURL(canvas2ImageType);
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
            }, canvas2ImageType);
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
          canvas2ImageType
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
                  canvas2ImageType
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
  drawEllipse(sx, sy, ex, ey, type) {
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
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
  }
  drawCircle(sx, sy, ex, ey, type) {
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
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
  }
  drawHeart(sx, sy, ex, ey, type) {
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
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
  }
  drawRect(sx, sy, ex, ey, text = "", type = 0) {
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
    const { scale, position, rotation, origin } = zg;
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
    if (text) {
      const tempGroup = new zrender.Group();
      tempGroup.add(zgChild);
      const textChild = new zrender.Text({
        style: {
          x: x,
          y: y - textLineHeight,
          text,
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
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
  }
  drawHook(sx, sy, ex, ey, type) {
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
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
  }
  drawCross(sx, sy, ex, ey, type) {
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
    this.shapes.push(type);
    this.revoke = this.zg.children();
    this.revokeIdx = this.revoke.length - 1;
    this.options.editProgress(this.editImageType);
  }
}
