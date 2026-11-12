let selectedRole = false
const studentBtn = document.getElementById("student-btn")
const staffBtn = document.getElementById("staff-btn")


studentBtn.addEventListener("click", () => {
    selectedRole = false
    studentBtn.classList.add("selected")
    staffBtn.classList.remove("selected")
})
staffBtn.addEventListener("click", () => {
    selectedRole = true
    staffBtn.classList.add("selected")
    studentBtn.classList.remove("selected")
})

document.getElementById("login-form").addEventListener("submit", async (e)=> {
    e.preventDefault()
    const form = new FormData(document.getElementById("login-form"))
    const options ={
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password"),
            role: selectedRole
        })
    }
    const response = await fetch("http://localhost:3001/users/login", options)
    const data = await response.json()
    console.log(data);
    if (response.status == 200 && selectedRole == false) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)
        window.location.assign("index.html")
        alert("Logged in!")
    } else if (response.status == 200 && selectedRole == true) {
        localStorage.setItem("token", data.token)
        window.location.assign("teacher.html")
        alert("Logged in!")
    } else {
        alert(data.error)
    }
})

document.getElementById("register-btn").addEventListener("click", async (e) => {
    e.preventDefault()

    const form = new FormData(document.getElementById("login-form"))
    const options = {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password"),
            is_admin: selectedRole
        })
    }
    const response = await fetch("http://localhost:3001/users/register", options)
    const data = await response.json()
    if (response.status==201) {
        alert("Registered! Please now log in")
        window.location.assign("login.html")
    } else {
        alert(data.error)
    }
})