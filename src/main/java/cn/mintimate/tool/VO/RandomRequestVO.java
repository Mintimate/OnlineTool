package cn.mintimate.tool.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * Desc 随机数列表
 *
 * @author Mintimate
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RandomRequestVO {
    /**
     * 随机列表的模式（可重复｜不可重复）
     */
    private String mode;
    /**
     * 列表长度
     */
    @Max(100000)
    private int totalNum;
    /**
     * 列表左区间
     */
    @Min(0)
    private int firstNum;
    /**
     * 列表右区间
     */
    @Max(10000000)
    private int lastNum;
}
