package cn.mintimate.tool.fitter;

import net.coobird.thumbnailator.filters.ImageFilter;

import java.awt.*;
import java.awt.image.BufferedImage;

public class ThumbnailsImgFilter implements ImageFilter {
    @Override
    public BufferedImage apply(BufferedImage bufferedImage) {
        int w = bufferedImage.getWidth();
        int h = bufferedImage.getHeight();
        BufferedImage newImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphic = newImage.createGraphics();
        graphic.setColor(Color.white);//背景设置为白色
        graphic.fillRect(0, 0, w, h);
        graphic.drawRenderedImage(bufferedImage, null);
        graphic.dispose();
        return newImage;
    }
}
