function password_generator( len,passwordNumber,passwordLowercase,passwordUppercase,passwordSpecial) {
    let string=''
    let numeric=''
    let punctuation=''
    let length = (len)?(len):(10);
    if((passwordUppercase===false)&&(passwordLowercase===false)){
        string='';
    }
    else if ((passwordLowercase===true)&&(passwordUppercase===false)){
        string = 'abcdefghijklmnopqrstuvwxyz';
    }
    else if ((passwordLowercase===false)&&(passwordUppercase===true)){
        string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    else {
        string = 'abcdefghijklmnABCDEFGHIJKLMNopqrstuvwxyzOPQRSTUVWXYZ';
    }
    if(passwordNumber){
        numeric = '0123456789';
    }
    else {
        numeric='';
    }
    if (passwordSpecial){
        punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    }
    else {
        punctuation = '';
    }
    let password = "";
    let character = "";
    while( password.length<length ) {
        let entity1 = Math.ceil(string.length * Math.random()*Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        let entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        let hold = string.charAt( entity1 );
        // //大写和小写
        // if (passwordLowercase&&passwordUppercase){
        //     hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        // }
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){
        return 0.5-Math.random()
    }).join('');
    return password.substring(0,len);
}
export function getPWD(len,enableNum,enableLowAlpha,enableUpAlpha,enableSpecial){
    return password_generator(len, enableNum, enableLowAlpha, enableUpAlpha, enableSpecial)
}