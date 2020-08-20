import React, { Component } from "react";
import { Button, Typography } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

const {Title} = Typography;

export default class Install extends Component {
    componentDidMount() {
        let deferredPrompt;
        var banner = document.querySelector("#banner");
    
        window.addEventListener("beforeinstallprompt", (e) => {
          e.preventDefault();
          console.log("beforeinstallprompt fired! ^_^");
          deferredPrompt = e;
          return false;
        });
    
        banner.addEventListener("click", () => {
          if (deferredPrompt !== undefined) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((result) => {
              if (result.outcome === "dismissed") {
                console.log("cancelled");
              } else {
                console.log("added to homescreen");
              }
              deferredPrompt = null;
            });
          }
        });
      }

    render() {
        return (
            <div>
                <Title level={3}>
                    برای نصب نرم‌افزار شرکت پربار کافی است که روی دکمه‌ی نصب زیر کلیک کنید.
                </Title>
                <div>
                    <Button type="primary" icon={<DownloadOutlined />} id="banner" >
                        نصب کردن برنامه‌ی موبایل
                    </Button>
                </div>
            </div>
        )
    }
}
