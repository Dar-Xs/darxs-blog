import React from "react";

const DownloadButton = ({ fileUrl, fileName, children }) => {
  const startDownload = () => {
    // 创建一个新的 a 元素
    const a = document.createElement("a");

    // 设置该元素的 href 属性为你想要下载的文件的 URL
    a.href = fileUrl;

    // 设置下载的文件名
    a.download = fileName;

    // 添加该元素到 body
    document.body.appendChild(a);

    // 模拟点击事件开始下载
    a.click();

    // 下载开始后，从 body 中移除该元素
    document.body.removeChild(a);
  };

  return (
    <button
      className="button button--primary button--lg margin-right--md"
      onClick={startDownload}
    >
      {children}
    </button>
  );
};

export default DownloadButton;
