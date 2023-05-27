export function getListNotRepeat(minNum, maxNum, total){
    let setList = new Set();
    minNum=Number(minNum);
    maxNum=Number(maxNum);
    while (setList.size!=total){
      console.log(Math.floor(Math.random() * (maxNum - minNum + 1) ) + minNum);
      setList.add(Math.floor(Math.random() * (maxNum - minNum + 1) ) + minNum);
    }
    let numList=JSON.stringify(Array.from(setList));
    console.log(numList);
    numList=numList.replace(/\[|]/g, '');
    return numList
}
export function getListEnableRepeat(minNum, maxNum, total){
    let arrayList=new Array();
    minNum=Number(minNum);
    maxNum=Number(maxNum);
    while (arrayList.length!=total){
        let newNum= Math.floor(Math.random() * (maxNum - minNum + 1) ) + minNum;
        arrayList.push(newNum);
    }
    let numList=JSON.stringify(arrayList);
    numList=numList.replace(/\[|]/g, '');
    return numList
}
