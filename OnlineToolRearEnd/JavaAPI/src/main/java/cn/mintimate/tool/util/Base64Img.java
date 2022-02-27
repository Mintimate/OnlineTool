package cn.mintimate.tool.util;


import java.io.*;

public class Base64Img {
    public static String encodeImgageToBase64(File imageFile) {
        // 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        // 其进行Base64编码处理
        byte[] data = null;
        // 读取图片字节数组
        try {
            InputStream in = new FileInputStream(imageFile);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        Base64Util encoder = new Base64Util();
        String encoding=encoder.encode(data);
        return encoding;// 返回Base64编码过的字节数组字符串
    }

    public static boolean encodeBase64ToImage(String imageBase64, String imagePath) {
        //对字节数组字符串进行Base64解码并生成图片
        if (imageBase64 == null) //图像数据为空
            return false;
        Base64Util decoder = new Base64Util();
        // 判断路径是否存在，如果不存在则创建
        if (!new File(imagePath).getParentFile().exists()) {
            new File(imagePath).getParentFile().mkdirs();
        }
        try {
            //Base64解码
            byte[] b = decoder.decode(imageBase64);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {//调整异常数据
                    b[i] += 256;
                }
            }
            //生成jpeg图片
            OutputStream out = new FileOutputStream(imagePath);
            out.write(b);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public static Integer imageSize(String imageBase64Str){
        //1.原来的字符流大小，单位为字节
        Integer strLength=imageBase64Str.length();
        System.out.println("imageBase64Str Length = "+strLength);
        //2.计算后得到的文件流大小，单位为字节
        Integer size=strLength-(strLength/8)*2;
        return size;
    }

}
