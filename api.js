const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5501"


// 회원가입 함수
async function handleSignin(){

    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    const response = await fetch(`${backend_base_url}/signup`,{
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )
    

    response_json = await response.json()
    

    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/login.html`);
    }else {
        alert(response.status)
    }
}

// 로그인함수
async function handleLogin(){
    console.log("handle login")

    const loginData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    
    const response = await fetch(`${backend_base_url}/login`,{
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )
    response_json = await response.json()
    
    localStorage.setItem("token", response_json.token)

    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/index.html`);
    }else {
        alert(response.status)
    }
}

// 이름 불러오는 함수
async function getName(){
    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers:{
            'Authorization' : localStorage.getItem("token")
        }

    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        console.log(response_json)
        return response_json.email
    }  
    else{
        return null
    }
    
    
    
    
    
    
    // const username = document.getElementById("username")
    // username.innerText = response_json.email

    // // return response_json.email
}



async function postArticle(title, content){
    // 입력값 받아온다
    const articleData = {
        title : title,
        content : content,
    }
    // api 서버통신
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'POST',
        headers:{
            'Authorization' : localStorage.getItem("token")},
        body:JSON.stringify(articleData)
    }
    )
    // json형태로 받아온다
    response_json = await response.json()
    
    
    // 메인페이지로 리다이렉 이동
    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/`);
    }else {
        alert(response.status)
    }

}

async function getArticles(){
    const response = await fetch(`${backend_base_url}/article`, {
        method:'GET',
    }
    )
    // json형태로 받아온다
    response_json = await response.json()
    return response_json.articles
}


function logout(){
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/`);
}


function articleDetail(article_id){
    console.log(article_id)
    //각 엘레멘트해당하는 각자의 페이지로 이동하게하는 url ? = 쿼리스트링
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url



}

async function getArticleDetail(article_id){
    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        method: 'GET',
    }
    )
    response_json = await response.json()
    console.log(response_json)

    return response_json.article
}