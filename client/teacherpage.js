document.getElementById("teacher-logout-btn").addEventListener("click", () => {
    localStorage.removeItem('token')
    window.location.assign("login.html")
    alert('Logged out')
})

const studentDataTable = document.querySelector('#student-data');

const studentRowTemplate = document.querySelector('#student-data-row');

// needs authentication enabled in router
const getStudentData = async () => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token');
        }

        const response = await fetch('http://localhost:3001/users/students', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch students: ${response.status}`);
        }

    const students = await response.json();
    console.log(students);
    
    students.forEach(student => {
        const studentFullName = student.username.split(".")
        const studentFirstName = studentFullName[0];
        const studentLastName = studentFullName[1];

        const dataRow = studentRowTemplate.content.cloneNode(true);

            dataRow.querySelector('.student-firstname').textContent = studentFirstName;
            dataRow.querySelector('.student-lastname').textContent = studentLastName;
            dataRow.querySelector('.current-level').textContent = student.current_score;
            studentDataTable.appendChild(dataRow)
        })
    } catch (error) {
        console.error(error);
    }
    
    
    
    
    
}


getStudentData();