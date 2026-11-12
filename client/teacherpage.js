const studentDataTable = document.querySelector('#student-data');

const studentRowTemplate = document.querySelector('#student-data-row');

// needs authentication enabled in router
const getStudentData = async () => {
    const response = await fetch('http://localhost:3001/users/students')
    
    const students = await response.json();
    console.log(students)
    
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
    
    
    
    
    
}


getStudentData();