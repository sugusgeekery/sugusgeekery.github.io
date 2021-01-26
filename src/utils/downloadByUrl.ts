// const _userAgent = navigator.userAgent.toLowerCase();
// const isChrome = _userAgent.indexOf("chrome") > -1;
// const isSafari = _userAgent.indexOf("safari") > -1;
// const isFireFox = _userAgent.indexOf("firefox") > -1;

// const isIE = !!window.ActiveXObject || "ActiveXObject" in window;

// const downloadFile = function(sUrl: string) {
//   if (/(iP)/g.test(navigator.userAgent)) {
//     return false;
//   }

//   if (isChrome || isSafari || isFireFox) {
//     const link = document.createElement("a");
//     link.href = sUrl;
//     if (link.download !== undefined) {
//       link.download = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
//     }

//     if (document.createEvent) {
//       const e = document.createEvent("MouseEvents");
//       e.initEvent("click", true, true);
//       link.dispatchEvent(e);
//       return true;
//     }
//   }

//   if (isIE) {
//     const iframe = document.createElement("iframe");
//     iframe.src = sUrl;
//     iframe.id = "saveFileFrame";
//     iframe.style.display = "none";
//     iframe.onload = function() {
//       document.frames["saveFileFrame"].document.execCommand("saveAs");
//       iframe.removeNode(true);
//     };
//     document.body.appendChild(iframe);
//     return true;
//   }

//   if (sUrl.indexOf("?") === -1) {
//     sUrl += "?download";
//   }

//   window.open(sUrl, "_self");
//   return true;
// };

function download(href = "", filename = "") {
  if (href) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = href;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

function downloadFile(url = "", filename = "") {
  if (url) {
    fetch(url, {
      headers: new Headers({
        Origin: location.origin
      }),
      mode: "cors"
    })
      .then(res => {
        console.log(res);
        return res.blob();
      })
      .then(blob => {
        console.log(blob);
        const blobUrl = window.URL.createObjectURL(blob);
        download(blobUrl, filename);
        window.URL.revokeObjectURL(blobUrl);
      });
  }
}

export default downloadFile;
