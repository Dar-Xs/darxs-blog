import React from "react";
import { useState, useEffect } from "react";
import {
  toCht as string2Cht,
  toHx as string2HX,
} from "../../utils/text-converter";

function isChinese(char) {
  return /[\u2E80-\u9FFF]/.test(char);
}

function randStringNear(string, radius) {
  const cht = string2Cht(string);
  const hx = string2HX(string);
  let ans = "";
  const length = string.length;
  for (let i = 0; i < length; ++i) {
    const rand = Math.random();
    if (rand >= radius) {
      ans += string[i];
      continue;
    }
    if (string[i] == " ") {
      ans += "\u00A0";
      continue;
    }
    if (isChinese(string[i])) {
      if (rand < (1 / 3) * radius) {
        ans += cht[i];
      } else if (rand < (2 / 3) * radius) {
        ans += hx[i];
      } else {
        const strs = "　，。、～！烫屯葺";
        ans += strs[Math.floor(Math.random() * strs.length)];
      }
      continue;
    }
    if (rand < (2 / 3) * radius) {
      if (/[0-9]/.test(string[i])) {
        ans += "0123456789"[Math.floor(Math.random() * 10)];
      } else if (/[a-z]/.test(string[i])) {
        ans += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
      } else if (/[A-Z]/.test(string[i])) {
        ans += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      }
    } else if (rand < (5 / 6) * radius) {
      ans += "_";
    } else {
      ans += "\u00A0";
    }
  }
  return ans;
}

export default function DistortionString({
  contents = [
    "Fontend Developer",
    "前端工程师",
    "Web Developer",
    "iOS Developer",
  ],
  setIsAn = (isAn) => {},
  charTime = 100,
  rmCharTime = 50,
  holdTime = 3000,
}) {
  const [content, setContent] = useState(contents[0] || "");
  const [inputPromptVisible, setinputPromptVisible] = useState(true);
  let inputPromptVisibleTemp = true;
  let contentsIndex = 0;

  useEffect(() => {
    let n = contents[contentsIndex].length;
    const callback = (r) => {
      let someStr = contents[contentsIndex].substring(
        0,
        Math.floor((1 - r) * contents[contentsIndex].length)
      );
      let randStr = randStringNear(someStr, Math.pow(r, 1.5));
      setContent(randStr);
    };
    let i = n;
    const loop = () => {
      setIsAn("AEIOUaeiou".includes(contents[contentsIndex][0]));
      callback(i / n);
      i--;
      if (i >= 0) {
        setTimeout(loop, charTime);
      } else {
        i = 0;
        setTimeout(loopRevers, holdTime);
      }
    };
    const loopRevers = () => {
      callback(i / n);
      i++;
      if (i < n) {
        setTimeout(loopRevers, rmCharTime);
      } else {
        contentsIndex = (contentsIndex + 1) % contents.length;
        n = contents[contentsIndex].length;
        i = n;
        loop();
      }
    };
    loop();
    setInterval(() => {
      inputPromptVisibleTemp = !inputPromptVisibleTemp;
      setinputPromptVisible(inputPromptVisibleTemp);
    }, 800);
  }, []);

  return (
    <div
      style={{
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        display: "inline-block",
        position: "relative",
        height: "30px",
      }}
    >
      {content}
      {inputPromptVisible ? "|" : "\u00A0"}
    </div>
  );
}
