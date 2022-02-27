package cn.mintimate.tool.service;

import cn.mintimate.tool.VO.RandomRequestVO;

import java.util.LinkedHashSet;
import java.util.List;

public interface getRandomListService {
    /**
     * 生成不可重复的数列
     * @param first 左区间
     * @param last  右区间
     * @param total 数列长度
     * @return
     */
    LinkedHashSet getListNotRepeat(RandomRequestVO randomRequestVO);

    /**
     * 生成可重复的数列
     * @param first 左区间
     * @param last  右区间
     * @param total 数列长度
     * @return
     */
    List getListAbleRepeat(RandomRequestVO randomRequestVO);
}
