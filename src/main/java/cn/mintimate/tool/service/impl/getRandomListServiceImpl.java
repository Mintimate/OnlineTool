package cn.mintimate.tool.service.impl;

import cn.mintimate.tool.VO.RandomRequestVO;
import cn.mintimate.tool.service.getRandomListService;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class getRandomListServiceImpl implements getRandomListService {
    @Override
    public LinkedHashSet getListNotRepeat(RandomRequestVO randomRequestVO) {
        LinkedHashSet list=new LinkedHashSet();
        Random r = new Random();
        while (list.size()!=randomRequestVO.getTotalNum()){
            list.add(r.nextInt(randomRequestVO.getLastNum())
                    %(randomRequestVO.getLastNum()-randomRequestVO.getFirstNum()+1)
                    + randomRequestVO.getFirstNum());
        }
        return list;
    }

    @Override
    public List getListAbleRepeat(RandomRequestVO randomRequestVO) {
        List list=new ArrayList();
        Random r = new Random();
        while (list.size()!=randomRequestVO.getTotalNum()){
            list.add(r.nextInt(randomRequestVO.getLastNum())
                    %(randomRequestVO.getLastNum()-randomRequestVO.getFirstNum()+1)
                    + randomRequestVO.getFirstNum());
        }
        return list;
    }
}
