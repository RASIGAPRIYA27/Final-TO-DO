const taskInput = document.getElementById("todo-input");
const ListContainer = document.getElementById("todo-list");

function addTask(){
    if(taskInput.value === ""){
        alert("Please enter a task!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML= taskInput.value;
        ListContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML= "\u00D7";
        li.appendChild(span);
    }
    fetch('/save_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'task': taskInput }),
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error('Error:', error));
    taskInput.value="";
    saveData();
   
}

ListContainer.addEventListener("click",function(e){
  if (e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData();
  }
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
},false);

function saveData(){
  localStorage.setItem("data", ListContainer.innerHTML);
}

function showTask(){
  ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();



const notesContainer = document.querySelector(".notes");
const creatbtn = document.querySelector(".btn");
let notes= document.querySelectorAll( ".inputbox" );

function shownotes(){
  notesContainer.innerHTML = localStorage.getItem("notes");
}
shownotes();

creatbtn.addEventListener("click",()=>{
  let inbut= document.createElement("p");
  let img = document.createElement("img");
  inbut.className="inputbox";
  inbut.setAttribute("contenteditable","true");
  img.src="https://i.ibb.co/85RRd1b/delete.png";
  notesContainer.appendChild(inbut).appendChild(img);
      fetch('/save_notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'notes': notesInput }),
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error('Error:', error));
        
            shownotes();
        
        
})

notesContainer.addEventListener("click",function(e){
  if(e.target.tagName=== "IMG"){
    e.target.parentElement.remove();
    updateStorage();
    }
  else if (e.target.tagName=="P"){
    notey = document.querySelectorAll(".inputbox");
    notey.forEach(nt =>{
      nt.onkeyup = function(){
        updateStorage();
      }
    })
  }
})

function updateStorage(){
  localStorage.setItem("notes",notesContainer.innerHTML);
}

document.addEventListener("keydown",event =>{
  if(event.key=== "Enter"){
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
})


function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');

    const now = new Date();
    const dateOptions = { weekday:'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

    datetimeElement.textContent = formattedDate + '📅 - (' + formattedTime + ')';
}

updateDateTime();
setInterval(updateDateTime, 1000); 


