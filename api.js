const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5501"


// 회원가입 함수
async function handleSignin(){

    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    const response = await fetch(`${backend_base_url}/login`,{
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )
    console.log(response)

    response_json = await response.json()
    console.log(response_json)

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
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

    if (response.status == 200){
        window.location.replace(`${frontend_base_url}/index.html`);
    }else {
        alert(response.status)
    }
}

async function getName(){
    console.log("get Name")
    console.log(localStorage.getItem("token"))

    const response = await fetch(`${backend_base_url}/getuserinfo`,{
        headers:{
            'Authorization' : localStorage.getItem("token")
        }

    }
    )
    response_json = await response.json()
    console.log(response_json)

    const username = document.getElementById("username")
    username.innerText = response_json.email


    
}

