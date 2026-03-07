// login settings

const signInBtn =document.getElementById("signInBtn");

signInBtn.addEventListener("click",function(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    if(username==="admin" && password==="admin123")
    {
        localStorage.setItem("auth","true");

        window.location="dashboard.html";
    }

    else
    {
        alert("Invalid Credentials");
    }
});

