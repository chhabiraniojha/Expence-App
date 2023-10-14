const form = document.getElementById("addForm");
const listExpence = document.getElementById("expences");

// console.log(listItem)
form.addEventListener("submit", onSubmit);
window.addEventListener("DOMContentLoaded",onReload)
listExpence.addEventListener("click", removeItem);
listExpence.addEventListener("click", editItem);

function onSubmit(e) {
    e.preventDefault();
    const amount = document.getElementById('expence_amount').value;
    const description = document.getElementById('expence_description').value;
    const category = document.getElementById('category').value;
    
    // localStorage.setItem("title",newItem)
    // localStorage.setItem("desc",newItem2)
    // console.log(localStorage.getItem("desc"))
    // const itemDetails="itemDetails"+newItem;
    
    const newExpence={
        amount:amount,
        description:description,
        category:category
    }
    axios.post("http://localhost:3000/users/postexpence",newExpence)
    .then(response=>{
        showExpenceOnTheScreen(response.data)
    })
    

};

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm('Are You Sure?')) {
            const li = e.target.parentElement;
            const id=li.firstChild.textContent;
            listExpence.removeChild(li)
            axios.delete(`http://localhost:3000/users/delete-expence/${id}`)
        }
    }

}

function editItem(e) {
    if (e.target.classList.contains("edit")) {
       const li = e.target.parentElement;
       const id=li.firstChild.textContent;
       
       axios.get(`http://localhost:3000/users/getExpences/${id}`)
       .then(res=>{
          const data=res.data[0];
          document.getElementById("expence_amount").value = data.amount;
          document.getElementById("expence_description").value =data.description;
          document.getElementById("category").value =data.category;
          axios.delete(`http://localhost:3000/users/delete-expence/${id}`)
          listExpence.removeChild(li);
       });
    }
 }

function onReload(){
    axios.get("http://localhost:3000/users/getExpences")
   .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showExpenceOnTheScreen(response.data[i]);
      
      }
   });
}

function showExpenceOnTheScreen(obj){
    const li = document.createElement("li");
    li.className = "list-group-item";
    const span=document.createElement("span");
    span.classList="hide_id";
    span.appendChild(document.createTextNode(`${obj.id}`));
    li.appendChild(span)
    li.appendChild(document.createTextNode(`${obj.amount}`));
    li.appendChild(document.createTextNode(`-${obj.description}`));
    li.appendChild(document.createTextNode(`-${obj.category}`));
    // li.appendChild(document.createTextNode(newItem2));
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    const edit = document.createElement("button");
    edit.className = "btn btn-danger btn-sm float-right edit";
    edit.appendChild(document.createTextNode("Edit"));
    li.appendChild(edit);
    li.appendChild(deleteBtn);
    listExpence.appendChild(li);
}