package cn.mintimate.tool.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Desc
 *
 * @author Mintimate
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IP_InfoDTO {
    /**
     * 请求的IP
     */
    private String ip;
    /**
     * 返回的主要结果
     */
    private String mainInfo;
    /**
     * 格外附加信息
     */
    private String appendInfo;

}
