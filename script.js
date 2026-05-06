const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const mirror = document.createElement('span');
mirror.style.position = 'absolute';
mirror.style.visibility = 'hidden';
mirror.style.whiteSpace = 'pre';
mirror.style.font = window.getComputedStyle(taskInput).font;
document.body.appendChild(mirror);


    //growing taskInput
    taskInput.addEventListener('input',
        () => {
            mirror.textContent = taskInput.value ||
            taskInput.placeholder;
            taskInput.style.width = (mirror.offsetWidth + 20) + 'px'
        });

    function addTask(savedText = null, isCompleted = false) {
        const textvalue = savedText || taskInput.value;   
        if (textvalue === "") return;
            console.log("the button was clicked");
            const newEntry = document.createElement('li');
            newEntry.textContent = textvalue;

            if (isCompleted) {
                newEntry.classList.add('completed');
            }
        
            const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '🗑';
                deleteBtn.className = "deleteBtn";

            newEntry.addEventListener('click',function(event) {
                    if (event.target !== deleteBtn){
            newEntry.classList.toggle('completed');
            saveToLocal();
                    }
        });

            deleteBtn.addEventListener('click',() => {
                    newEntry.remove();
                    saveToLocal();
                }
            )

            newEntry.appendChild(deleteBtn);
            taskList.appendChild(newEntry);

            if (!savedText){
            taskInput.value = "";
            taskInput.dispatchEvent(new Event('input'));
            }
            saveToLocal();
        }

            //add Task with button
    addBtn.addEventListener('click',
        () => {
            addTask()
        })

    //add Task with enter
    taskInput.addEventListener('keypress',
        (event) => {
            if (event.key === 'Enter') {
                addTask();
            }
        }
    );

    
   function saveToLocal() {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('🗑','').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('myTasks',JSON.stringify(tasks))
    }

    function loadTasks(){
        const savedTasks = JSON.parse(localStorage.getItem('myTasks'));
            if (savedTasks){
                savedTasks.forEach(task => {
                    addTask(task.text,task.completed)
                });
            }
    }
    loadTasks();
