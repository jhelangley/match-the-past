document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem('token')
    window.location.assign("login.html")
    alert('Logged out')
})