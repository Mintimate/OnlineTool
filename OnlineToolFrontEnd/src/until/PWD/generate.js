function password_generator( len,passwordNumber,passwordLowercase,passwordUppercase,passwordSpecial) {
    let length = (len)?(len):(10);
    if((passwordUppercase==false)&&(passwordLowercase==false)){
        var string='';
    }
    else if ((passwordLowercase==true)&&(passwordUppercase==false)){
        var string = 'abcdefghijklmnopqrstuvwxyz';
    }
    else if ((passwordLowercase==false)&&(passwordUppercase==true)){
        var string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    else {
        var string = 'abcdefghijklmnABCDEFGHIJKLMNopqrstuvwxyzOPQRSTUVWXYZ';
    }
    if(passwordNumber){
        var numeric = '0123456789';
    }
    else {
        var numeric='';
    }
    if (passwordSpecial){
        var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    }
    else {
        var punctuation = '';
    }
    let password = "";
    let character = "";
    let crunch = true;
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
    return password.substr(0,len);
}
export function getPWD(len,enableNum,enableLowAlpha,enableUpAlpha,enableSpecial){
        let PWD=password_generator( len,enableNum,enableLowAlpha,enableUpAlpha,enableSpecial);
        return{
            PWD
        }
}