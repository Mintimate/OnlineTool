package cn.mintimate.tool.controller;

import cn.mintimate.tool.VO.RandomRequestVO;
import cn.mintimate.tool.service.getRandomListService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import static cn.mintimate.tool.constant.randomNumberMode.ONLY;

/**
 * 随机数生成（弃用）
 */

@Controller
public class randomNumber {
    @Resource
    private getRandomListService randomListService;

    @RequestMapping("/randomNumber/getRandomList")
    @ResponseBody
    public ResponseEntity<?> getRandomList(@RequestBody RandomRequestVO randomRequestVO) {
        if (randomRequestVO.getLastNum() < randomRequestVO.getFirstNum()) {
            return ResponseEntity.badRequest().body("错误：最大值不应小于最小值");
        } else if ((randomRequestVO.getLastNum() - randomRequestVO.getFirstNum() + 1) < randomRequestVO.getTotalNum()
                && randomRequestVO.getMode().equals(ONLY)) {
            return ResponseEntity.badRequest().body("错误：最大值和最小值没这么多数啦！");
        }
        if (randomRequestVO.getMode().equals(ONLY)) {
            return ResponseEntity.ok(randomListService.getListNotRepeat(randomRequestVO));
        } else {
            return ResponseEntity.ok(randomListService.getListAbleRepeat(randomRequestVO));
        }
    }
}
