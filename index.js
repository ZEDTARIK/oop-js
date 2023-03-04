// get keys input
// form 
const form = document.getElementById("formUser");
const inputName = document.getElementById("username");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");

// button and input hidden

const userId = document.getElementById("userId");
const submit = document.getElementById("submit");

// table 
const tableBody = document.querySelector("#tableUser tbody");


class User {

    constructor(id, username, email, phone) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone
    }
    // Show Data
    showData() {
        User.showHTML(this.id, this.username, this.email, this.phone);
        return this;
    }
    // save into localstorage
    addToLocalStorage() {
        const allData = JSON.parse(localStorage.getItem("UsersData")) ?? [];
        allData.push({ id: this.id, username: this.username, email: this.email, phone: this.phone });
        localStorage.setItem("UsersData", JSON.stringify(allData));
    }
    // loading data from localstorage first time acesse
    static dispalyDataFormLocalStorage() {
        if (localStorage.getItem("UsersData")) {
            JSON.parse(localStorage.getItem("UsersData")).forEach((item) => {
                User.showHTML(item.id, item.username, item.email, item.phone);
            });
        }
    }
    // update user 
    updateUser(id) {
        const newItem = { id: id, username: this.username, email: this.email, phone: this.phone };
        const updateData = JSON.parse(localStorage.getItem("UsersData")).map((el) => {
            if (el.id == id) {
                return newItem;
            }
            return el;
        });
        localStorage.setItem("UsersData", JSON.stringify(updateData));
    }
    // dispalData into table
    static showHTML(id, username, email, phone) {
        const trElement = document.createElement("tr");

        trElement.innerHTML = `
                            <tr role="row" class="odd">
                                <td>${id}</td>
                                <td>${username}</td>
                                <td>${email}</td>
                                <td>${phone}</td>
                                <td>
                                    <button class="btn btn-sm btn-info  edit" data-id="${id}">Edit</button>
                                    <button class="btn btn-sm btn-danger delete" data-id="${id}">Delete</button>
                                </td>
                            </tr>`;

        tableBody.appendChild(trElement);
    }

}


// Events 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!userId.value) {
        // add user
        let id = Math.floor(Math.random() * 100000);
        const user = new User(id, inputName.value, inputEmail.value, inputPhone.value);
        user.showData().addToLocalStorage();
    } else {
        // edit user
        const id = userId.value;
        const userEdit = new User(id, inputName.value, inputEmail.value, inputPhone.value);
        userEdit.updateUser(id);
        submit.value= "Store Data";
        tableBody.innerHTML = "";
        User.dispalyDataFormLocalStorage();
    }

    inputName.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    userId.value= "";

});

// loading page 
User.dispalyDataFormLocalStorage();

tableBody.addEventListener("click", (e) => {

    // DELETE 
    if (e.target.classList.contains("delete")) {

        const id = +e.target.getAttribute("data-id");
        // remove from Html 
        e.target.parentElement.parentElement.remove();

        // remove from LocalStorage
        const users = JSON.parse(localStorage.getItem("UsersData"));
        const newdata = users.filter(us => us.id != id);
        localStorage.setItem("UsersData", JSON.stringify(newdata));
    }

    // EDIT
    if (e.target.classList.contains("edit")) {
        const id = +e.target.getAttribute("data-id");
        const user = JSON.parse(localStorage.getItem("UsersData")).find(item => item.id === id);

        inputName.value = user.username;
        inputEmail.value = user.email;
        inputPhone.value = user.phone;
        userId.value = id;
        submit.value = "Edit User"
    }

});