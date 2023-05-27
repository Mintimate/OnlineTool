package cn.mintimate.tool.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


/**
 * Desc
 *
 * @author Mintimate
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IMG_SourceVO {
    /**
     * 原图
     */
    private MultipartFile file;
    /**
     * 选择输出格式
     */
    private String format;
    /**
     * 选择输出图片压缩率
     */
    private float compression;
    /**
     * 输出图片模式
     */
    private String mode;
    /**
     * 输出图片的大小
     */
    private float modeDetail;
}
