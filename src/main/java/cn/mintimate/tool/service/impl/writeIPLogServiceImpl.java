package cn.mintimate.tool.service.impl;

import cn.mintimate.tool.service.writeIPLogService;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class writeIPLogServiceImpl implements writeIPLogService {
    static String IP_FINDER=System.getProperty("user.dir") + "/file/UserIP/";
    @Override
    public void writeIP(String userIP) {
        File userIPPath=new File(IP_FINDER+getNowDate()+".log");
        // 判断路径是否存在，如果不存在则创建
        if (!userIPPath.getParentFile().exists()) {
            userIPPath.getParentFile().mkdirs();
        }
        FileWriter fw =null;
        try {
            // 保存到服务器中
            fw=new FileWriter(userIPPath,true);
            fw.append(getNowDetailDate()+"\n");
            fw.append(userIP+"\n\n");
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {
                fw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    public static String getNowDate() {
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = formatter.format(currentTime);
        return dateString;
    }
    public static String getNowDetailDate() {
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        return dateString;
    }
}
