'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    ChannelIO: any
  }
}

export default function ChannelTalk() {
  useEffect(() => {
    // Channel.io 초기화 스크립트
    const channelIO = `
      (function() {
        var w = window;
        if (w.ChannelIO) {
          return w.console.error("ChannelIO script included twice.");
        }
        var ch = function() {
          ch.c(arguments);
        };
        ch.q = [];
        ch.c = function(args) {
          ch.q.push(args);
        };
        w.ChannelIO = ch;
        function l() {
          if (w.ChannelIOInitialized) {
            return;
          }
          w.ChannelIOInitialized = true;
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
          var x = document.getElementsByTagName("script")[0];
          if (x.parentNode) {
            x.parentNode.insertBefore(s, x);
          }
        }
        if (document.readyState === "complete") {
          l();
        } else {
          w.addEventListener("DOMContentLoaded", l);
          w.addEventListener("load", l);
        }
      })();
    `

    // 스크립트 실행
    const script = document.createElement('script')
    script.innerHTML = channelIO
    document.head.appendChild(script)

    // Channel.io 부팅
    setTimeout(() => {
      if (window.ChannelIO) {
        window.ChannelIO('boot', {
          pluginKey: '9007e29f-fa46-4ff3-b0ad-816981e7a948',
        })
      }
    }, 1000)

    return () => {
      if (window.ChannelIO) {
        window.ChannelIO('shutdown')
      }
    }
  }, [])

  return null
}
