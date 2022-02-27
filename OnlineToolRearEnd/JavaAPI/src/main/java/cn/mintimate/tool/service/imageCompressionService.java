package cn.mintimate.tool.service;

import cn.mintimate.tool.VO.IMG_SourceVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface imageCompressionService {
    // 保存原图
    String saveOriginalImage(MultipartFile file, String OriginalImageName);
    // 保存缩略图（等比例）
    String saveThumbnailImageByScale(File originalImage, IMG_SourceVO imgSourceVO);
    // 保存缩略图（固定大小）
    String saveThumbnailImageBySize(File originalImage, IMG_SourceVO imgSourceVO);
    // 使用API接口，判断图片分类
    List<String> judgeImageType(String imagePath);
}
