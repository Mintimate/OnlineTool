package cn.mintimate.tool.service.impl;

import cn.mintimate.tool.VO.IMG_SourceVO;
import cn.mintimate.tool.fitter.ThumbnailsImgFilter;
import cn.mintimate.tool.service.imageCompressionService;
import cn.mintimate.tool.util.TencentImageAPI;
import net.coobird.thumbnailator.ThumbnailParameter;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static cn.mintimate.tool.constant.IMG_SavePath.INPUT_IMAGE_PATH;
import static cn.mintimate.tool.constant.IMG_SavePath.OUTPUT_IMAGE_PATH;

@Service
public class imageCompressionServiceImpl implements imageCompressionService {
    @Override
    public String saveOriginalImage(MultipartFile file, String OriginalImageName) {
//        PrintLog.Write("原图大小："+file.getSize());
        String OriginalImagePath=INPUT_IMAGE_PATH + OriginalImageName;
        File OriginalImage=new File(OriginalImagePath);
        // 判断路径是否存在，如果不存在则创建
        if (!OriginalImage.getParentFile().exists()) {
            OriginalImage.getParentFile().mkdirs();
        }
        try {
            // 保存到服务器中
            file.transferTo(OriginalImage);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return OriginalImagePath;
    }

    @Override
    public String saveThumbnailImageByScale(File originalImage, IMG_SourceVO imgSourceVO) {
        if (imgSourceVO.getCompression()>1.0f){
            if (originalImage.length()>=1024*1024*4){
                return null;
            }
            originalImage= new File(TencentImageAPI.EnhanceImage(originalImage));
            imgSourceVO.setCompression(1.0f);
        }
        // 生成新图后缀
        String thumbnailImagePath=OUTPUT_IMAGE_PATH
                + originalImage.getName().substring(0,originalImage.getName().lastIndexOf("."))+"."+imgSourceVO.getFormat().toLowerCase();
        File thumbnailImage = new File(thumbnailImagePath);
        // 判断路径是否存在，如果不存在则创建
        if (!thumbnailImage.getParentFile().exists()) {
            thumbnailImage.getParentFile().mkdirs();
        }
        try {
            // 转换
            switch (imgSourceVO.getFormat()){
                case "JPG":
                    Thumbnails.of(originalImage).scale(imgSourceVO.getModeDetail())
                            .addFilter(new ThumbnailsImgFilter())
                            .outputFormat("jpg")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                case "PNG":
                    Thumbnails.of(originalImage).scale(imgSourceVO.getModeDetail())
                            .outputFormat("png")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                case "WEBP":
                    Thumbnails.of(originalImage).scale(imgSourceVO.getModeDetail())
                            .imageType(ThumbnailParameter.DEFAULT_IMAGE_TYPE)
                            .outputFormat("webp")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                case "BMP":
                    Thumbnails.of(originalImage).scale(imgSourceVO.getModeDetail())
                            .addFilter(new ThumbnailsImgFilter())
                            .outputFormat("bmp")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                default:
                    Thumbnails.of(originalImage).scale(imgSourceVO.getModeDetail())
                            .imageType(ThumbnailParameter.DEFAULT_IMAGE_TYPE)
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
//        PrintLog.Write("压缩后大小："+thumbnailImage.length()+"\n");
        return thumbnailImage.getName();
    }

    @Override
    public String saveThumbnailImageBySize(File originalImage, IMG_SourceVO imgSourceVO) {
        int width = 0;
        int hight = 0 ;
        try {
            BufferedImage sourceImg = ImageIO.read(new FileInputStream(originalImage));
            if(sourceImg.getWidth()>=sourceImg.getHeight()){
                hight=width= (int) (imgSourceVO.getModeDetail()*sourceImg.getHeight());
            }
            else {
                hight=width= (int) (imgSourceVO.getModeDetail()*sourceImg.getWidth());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        String thumbnailImageName=originalImage.getName();
        String thumbnailImagePath;
        if (imgSourceVO.getCompression()>1.0f){
            if (originalImage.length()>=1024*1024*4){
                return null;
            }
            originalImage= new File(TencentImageAPI.EnhanceImage(originalImage));
            imgSourceVO.setCompression(1.0f);
            if (originalImage==null){
                return null;
            }
        }
        // 生成新图后缀
        thumbnailImagePath=OUTPUT_IMAGE_PATH
                + thumbnailImageName.substring(0,thumbnailImageName.lastIndexOf("."))+"."+imgSourceVO.getFormat().toLowerCase();
        File thumbnailImage = new File(thumbnailImagePath);
        // 判断路径是否存在，如果不存在则创建
        if (!thumbnailImage.getParentFile().exists()) {
            thumbnailImage.getParentFile().mkdirs();
        }
        try {
            // 转换
            switch (imgSourceVO.getFormat()){
                case "JPG":
                    Thumbnails.of(originalImage)
                            .sourceRegion(Positions.CENTER,width,hight )
                            .scale(1.0)
                            .addFilter(new ThumbnailsImgFilter())
                            .outputFormat("jpg")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                case "PNG":
                    Thumbnails.of(originalImage)
                            .sourceRegion(Positions.CENTER,width,hight )
                            .scale(1.0)
                            .outputFormat("png")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                case "WEBP":
                    Thumbnails.of(originalImage)
                            .sourceRegion(Positions.CENTER,width,hight )
                            .scale(1.0)
                            .imageType(ThumbnailParameter.DEFAULT_IMAGE_TYPE)
                            .outputFormat("webp")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                case "BMP":
                    Thumbnails.of(originalImage)
                            .sourceRegion(Positions.CENTER,width,hight )
                            .scale(1.0)
                            .addFilter(new ThumbnailsImgFilter())
                            .outputFormat("bmp")
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
                default:
                    Thumbnails.of(originalImage)
                            .sourceRegion(Positions.CENTER,width,hight )
                            .scale(1.0)
                            .imageType(ThumbnailParameter.DEFAULT_IMAGE_TYPE)
                            .outputQuality(imgSourceVO.getCompression())
                            .toFile(thumbnailImage);
                    break;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
//        PrintLog.Write("压缩后大小："+thumbnailImage.length()+"\n");
        return thumbnailImage.getName();
    }

    @Override
    public List<String> judgeImageType(String imagePath) {
        List list=new ArrayList();
        String Type=imagePath.substring(imagePath.lastIndexOf("."));
        if(Type.equals(".heic")){
            list.add("输出类型为HEIC图片，暂时不支持智能识别");
        }
        else {
            File file = new File(INPUT_IMAGE_PATH + imagePath);
            for (Object type : TencentImageAPI.TencentOCR(file)) {
                list.add(type);
            }
        }
        if(list.size()==0){
            list.add("图太复杂，识别失败( ；´Д｀)");
        }
        return list;
    }
}
