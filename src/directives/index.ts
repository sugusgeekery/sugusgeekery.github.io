export default (Vue: any) => {
  Vue.directive("paste", {
    bind(el: any, binding: any, vnode: any) {
      el.addEventListener("paste", function (event: any) {
        binding.value(event)
      })
    }
  });

  Vue.directive("dialogDrag", {
    bind(el: any, binding: any, vnode: any) {
      // 可拖动整体对象
      const dragDom = el.querySelector(".model-wrapper");

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

      // 可拖动触发区域
      const dialogHeaderEl = el.querySelector(".model-header");

      // 对触发拖动区域做手势样式变化
      dialogHeaderEl.style.cursor = "move";

      // 可拖动触发区域监听鼠标事件
      dialogHeaderEl.onmousedown = (e: any) => {
        // 获取到的值带px 正则匹配替换
        let styL = 0, styT = 0, styW = 0, styH = 0;

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes("%")) {
          styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
          styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
          styW = +document.body.clientWidth * (+sty.width.replace(/\%/g, "") / 100);
          styH = +document.body.clientHeight * (+sty.height.replace(/\%/g, "") / 100);
        } else {
          styL = +sty.left.replace(/\px/g, "");
          styT = +sty.top.replace(/\px/g, "");
          styW = +sty.width.replace(/\px/g, "");
          styH = +sty.height.replace(/\px/g, "");
        }

        // 计算最大最小值
        const minX = styW / 2;
        const minY = styH / 2;
        const maxX = window.innerWidth - styW / 2;
        const maxY = window.innerHeight - styH / 2;

        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        document.onmousemove = function (e: any) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX + styL;
          const t = e.clientY - disY + styT;

          // 限制最大最小值
          const x = l < minX ? minX : l > maxX ? maxX : l;
          const y = t < minY ? minY : t > maxY ? maxY : t;

          // 移动当前元素
          dragDom.style.left = `${x}px`;
          dragDom.style.top = `${y}px`;
        }

        document.onmouseup = function (e: any) {
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
  });
};