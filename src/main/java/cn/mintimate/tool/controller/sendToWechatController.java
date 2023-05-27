package cn.mintimate.tool.controller;

import cn.mintimate.tool.util.sendMessageToWechat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Mintimate
 */
@RestController
public class sendToWechatController {
    /**
     * 发送消息至企业微信
     * @param text 发送信息
     */
    @ResponseBody
    @RequestMapping({"/wcp"})
    public void index(@RequestParam(value = "text") String text) {
        sendMessageToWechat.sendText(text);
    }
}
