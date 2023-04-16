export function CountChineseCharacters(Words) {
  let sTotal = 0;
  let iTotal = 0;
  let eTotal = 0;
  let inum = 0;
  for (let i = 0; i < Words.length; i++) {
    let c = Words.charAt(i);
    //基本汉字
    if (c.match(/[\u4e00-\u9fa5]/)) {
      iTotal++;
    }
    //基本汉字补充
    else if (c.match(/[\u9FA6-\u9fcb]/)) {
      iTotal++;
    }
  }

  for (let i = 0; i < Words.length; i++) {
    let c = Words.charAt(i);
    if (c.match(/[^\x00-\xff]/)) {
      sTotal++;
    } else {
      eTotal++;
    }
    if (c.match(/[0-9]/)) {
      inum++;
    }
  }
  let hanzi, zishu, biaodian, zimu, shuzi, zifu;
  hanzi = iTotal;
  zishu = (inum + iTotal);
  biaodian = sTotal - iTotal;
  zimu = (eTotal - inum);
  shuzi = inum;
  zifu = (iTotal * 2 + (sTotal - iTotal) * 2 + eTotal);
  return {
    hanzi,
    zishu,
    biaodian,
    zimu,
    shuzi,
    zifu,
  }
}
