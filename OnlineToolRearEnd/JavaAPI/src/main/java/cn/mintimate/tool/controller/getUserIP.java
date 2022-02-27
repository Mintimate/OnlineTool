package cn.mintimate.tool.controller;

import cn.mintimate.tool.DTO.IP_InfoDTO;
import cn.mintimate.tool.service.writeIPLogService;
import cn.mintimate.tool.util.IPUtil;
import com.github.jarod.qqwry.IPZone;
import com.github.jarod.qqwry.QQWry;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/IP")
public class getUserIP {
    @Resource
    private writeIPLogService writeIPLogService;

    @GetMapping("/getIP")
    public String getIP(HttpServletRequest request) {
        String IP = IPUtil.getIpAddr(request);
        writeIPLogService.writeIP(IP);
        return IP;
    }

    /**
     * 根据IP查找IP归属地和详情
     *
     * @param IP
     * @return
     */
    @RequestMapping("/getInfo/{IP}")
    public ResponseEntity getIP_Info(@PathVariable("IP") String IP) {
        boolean isIPv4 = IP.matches("([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}");
        if (!isIPv4) {
            return ResponseEntity.badRequest().body("Error: This is not IPv4!!!");
        }
        try {
            QQWry qqwry = new QQWry();
            IPZone ipzone = qqwry.findIP(IP);
            IP_InfoDTO infoDTO = IP_InfoDTO.builder()
                    .ip(ipzone.getIp())
                    .mainInfo(ipzone.getMainInfo())
                    .appendInfo(ipzone.getSubInfo())
                    .build();
            return ResponseEntity.ok(infoDTO);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: Can't Find It!!!");
        }
    }
}
