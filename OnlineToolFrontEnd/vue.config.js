let JavaBaseURL=""
let PythonBaseURL=""
switch (process.env.NODE_ENV) {
  case 'development':
    JavaBaseURL = "http://localhost:8083"  //开发环境url
    PythonBaseURL = "http://localhost:8099"  //开发环境url
    break
  case 'production':
    JavaBaseURL = ""  //生产环境url
    PythonBaseURL = ""  //生产环境url
    break
}

module.exports = {
  transpileDependencies: ['vue-meta'],
  devServer: {
    proxy:{
      '/dataApiJava':{
        target: JavaBaseURL,
        pathRewrite:{'^/dataApiJava':""},
        ws:true,
        changeOrigin:true
      },
      '/dataApiPython':{
        target:PythonBaseURL,
        pathRewrite:{'^/dataApiPython':""},
        ws:true,
        changeOrigin:true
      },
    }

  }
}
