package cn.mintimate.tool.controller;

import cn.mintimate.tool.DTO.IMG_DTO;
import cn.mintimate.tool.VO.IMG_SourceVO;
import cn.mintimate.tool.service.imageCompressionService;
import cn.mintimate.tool.util.SnowFlakeGenerateIdWorker;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RestController
@RequestMapping("/processIMG")
@CrossOrigin
public class processIMG {
    @Resource
    private imageCompressionService compressionService;
    SnowFlakeGenerateIdWorker snowFlakeGenerateIdWorker =
            new SnowFlakeGenerateIdWorker(0L, 0L);

    @PostMapping("/uploadImage")
    public ResponseEntity uploadImage(IMG_SourceVO imgSourceVO) {
        IMG_DTO imgDto = new IMG_DTO();
        imgDto.setImageName(imgSourceVO.getFile().getOriginalFilename());
        // 使用雪花ID重命名图片
        imgDto.setOriginalPathName(snowFlakeGenerateIdWorker.generateNextId() + imgDto.getImageName());
        //判断format
        if (imgSourceVO.getFormat().equals("None")) {
            imgSourceVO.setFormat(imgDto.getImageName().substring(imgDto.getImageName().lastIndexOf(".") + 1));
        }
        // 保存原图，返回原图地址；包装为原图File
        File originalImage = new File(compressionService.saveOriginalImage(imgSourceVO.getFile(), imgDto.getOriginalPathName()));

        // 判断模式,保存缩略图，返回缩略图名称
        if (imgSourceVO.getMode().equals("scale")) {
            // 等比例
            imgDto.setOutPutPathName(compressionService.saveThumbnailImageByScale(originalImage, imgSourceVO));
        } else {
            // 固定尺寸
            imgDto.setOutPutPathName(compressionService.saveThumbnailImageBySize(originalImage, imgSourceVO));
        }
        imgDto.setImgType(compressionService.judgeImageType(imgDto.getOriginalPathName()));

        return ResponseEntity.ok(imgDto);
    }

    @RequestMapping("/download/{filename}")
    public void downloadImage(@PathVariable(value = "filename", required = false) String filename, HttpServletResponse response) {
        File outPutImage = new File(System.getProperty("user.dir") + "/file/Output/" + filename);
        // 穿件输入对象
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(outPutImage);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        // 设置相关格式
        response.setContentType("application/force-download");
        // 设置响应下载文件大小
        response.setContentLengthLong((long) outPutImage.length());
        // 设置下载后的文件名以及header(UTF-8)
        try {
            response.addHeader("Content-disposition", "attachment;fileName=" + new String(filename.getBytes("UTF-8"), "iso-8859-1"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        // 创建输出对象
        OutputStream os = null;
        try {
            os = response.getOutputStream();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 常规操作
        byte[] buf = new byte[1024];
        int len = 0;
        while (true) {
            try {
                if (!((len = fis.read(buf)) != -1)) break;
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                os.write(buf, 0, len);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @GetMapping("/delete/{imageName}")
    @ResponseBody
    public ResponseEntity Delete(@PathVariable(value = "imageName", required = false) String imageName) {
        File file = new File(System.getProperty("user.dir") + "/file/Output/" + imageName);
        if (file.delete()) {
            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.ok("Fail");
        }
    }
}
