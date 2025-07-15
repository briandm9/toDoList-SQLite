let taskName = document.getElementById('taskName');
let addBtn = document.getElementById('addToList');
let taskCont = document.querySelector('.tasksContainer');

taskName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

function createTask(taskid, taskInput, isChecked = false){
    let temp = document.createElement('li');

    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
	
    check.checked = isChecked;
    if(check.checked) temp.classList.add('green')

    check.addEventListener('change', () => {
        check.disabled = true;

        fetch(`http://localhost:3000/tasks/${taskid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskName: taskText.textContent,
                completed: check.checked
            })
        })
        .then(response => response.json())
        .then(() => {
            if (check.checked) temp.classList.add('green');
            else temp.classList.remove('green');

            check.disabled = false;
        })
        .catch(error => {
            console.error("Error changing task:", error.message);
            check.disabled = false;
        });
    });
    
    let taskText = document.createElement('span');
    taskText.textContent = taskInput.trim();

    taskText.addEventListener('click', ()=>{
        let taskEdit = prompt("Modify task", taskText.textContent);
		taskEdit = taskEdit.trim();
		
        if(taskEdit && taskEdit !== taskText.textContent){
            fetch(`http://localhost:3000/tasks/${taskid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    taskName: taskEdit,
                    completed: check.checked
                })
            })
            .then(response => response.json())
            .then(()=> taskText.textContent = taskEdit)
            .catch(error => console.error("Error updating task:", error.message))
        }
    })
    
    const delBtn = document.createElement('button');
    delBtn.classList.add('deleteTask');
    delBtn.textContent = 'Delete task';
    delBtn.addEventListener('click', () =>{
        fetch(`http://localhost:3000/tasks/${taskid}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(()=> temp.remove())
        .catch(error => console.error("Error deleting task:", error.message))
    });

    temp.setAttribute('taskid', taskid);
	temp.append(check, taskText, delBtn);
	return temp;
}

document.addEventListener("DOMContentLoaded", ()=>{
    fetch('http://localhost:3000/tasks', {
        method: "GET"
    })
    .then(response => response.json())
    .then(data =>{
        data.forEach(task =>{
            const taskElement = createTask(task.taskid, task.taskname, task.completed);
            taskCont.appendChild(taskElement);
        })
    })
    .catch(error => console.error("Error getting tasks from server:", error))
})

addBtn.addEventListener('click', ()=>{
	taskName.value = taskName.value.trim();
	
	if(!taskName.value){
		return alert('Invalid task');
	}

    fetch('http://localhost:3000/tasks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            taskName: taskName.value
        })
    })
    .then(response => response.json())
    .then(data =>{
        let temp = createTask(data.taskID, taskName.value);
        taskCont.appendChild(temp);
        taskName.value = '';
    })
    .catch(error => console.error("Error sending data to server:", error))
})