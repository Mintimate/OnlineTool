package cn.mintimate.tool.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Desc
 *
 * @author Mintimate
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IMG_DTO {
    /**
     * 原图名称
     */
    private String imageName;
    /**
     * 原图存放地址内的昵称
     */
    private String originalPathName;
    /**
     * 临时存放地址内的昵称
     */
    private String tempPathName;
    /**
     * 真正输出存放地址内的昵称
     */
    private String outPutPathName;
    /**
     * AI识别的图片分类
     */
    private List<String> imgType;
}
