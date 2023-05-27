package cn.mintimate.tool.util;

import cn.mintimate.tool.fitter.ThumbnailsImgFilter;
import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.exception.TencentCloudSDKException;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.tiia.v20190529.TiiaClient;
import com.tencentcloudapi.tiia.v20190529.models.*;
import net.coobird.thumbnailator.Thumbnails;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static cn.mintimate.tool.constant.IMG_SavePath.INPUT_IMAGE_PATH;
import static cn.mintimate.tool.constant.IMG_SavePath.TEMP_IMAGE_PATH;
import static cn.mintimate.tool.constant.tencentKey.secretID;
import static cn.mintimate.tool.constant.tencentKey.secretKey;

public class TencentImageAPI {
    private static Credential cred = new Credential(secretID, secretKey);


    public static List TencentOCR(File file) {
        List<String> list =new ArrayList<>();
        try {
            HttpProfile httpProfile = new HttpProfile();
            httpProfile.setEndpoint("tiia.tencentcloudapi.com");

            ClientProfile clientProfile = new ClientProfile();
            clientProfile.setHttpProfile(httpProfile);

            TiiaClient client = new TiiaClient(cred, "ap-shanghai", clientProfile);

            DetectLabelRequest req = new DetectLabelRequest();

            req.setImageBase64(Base64Img.encodeImgageToBase64(file));
            DetectLabelResponse resp = client.DetectLabel(req);
            for (DetectLabelItem item : resp.getLabels()){
                list.add(item.getName());
            }
        } catch (TencentCloudSDKException e) {
            System.out.println(e.toString());
        }
        return list;
    }

    public static String EnhanceImage(File originalImage) {
        String ImageName = originalImage.getName();
        String originalType=ImageName.substring(ImageName.lastIndexOf("."));
        String ImageTemp = TEMP_IMAGE_PATH + ImageName.substring(0,ImageName.lastIndexOf("."))+".jpg";;
        if(originalType.equals(".webp")){
            try {
                originalImage=new File(INPUT_IMAGE_PATH + ImageName.substring(0,ImageName.lastIndexOf("."))+".jpg");
                Thumbnails.of(originalImage).scale(1.0)
                        .addFilter(new ThumbnailsImgFilter())
                        .outputFormat("jpg")
                        .outputQuality(0.5)
                        .toFile(ImageTemp);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        try {
            HttpProfile httpProfile = new HttpProfile();
            httpProfile.setEndpoint("tiia.tencentcloudapi.com");
            ClientProfile clientProfile = new ClientProfile();
            clientProfile.setHttpProfile(httpProfile);
            TiiaClient client = new TiiaClient(cred, "ap-shanghai", clientProfile);
            EnhanceImageRequest req = new EnhanceImageRequest();
            System.out.println(Base64Img.imageSize(Base64Img.encodeImgageToBase64(originalImage)));
            req.setImageBase64(Base64Img.encodeImgageToBase64(originalImage));
            EnhanceImageResponse resp = client.EnhanceImage(req);
            Base64Img.encodeBase64ToImage(resp.getEnhancedImage(), ImageTemp);
        } catch (TencentCloudSDKException e) {
            System.out.println(e.toString());
            return null;
        }
        return ImageTemp;
    }
}
