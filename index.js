// get keys input
// form 
const form = document.getElementById("formUser");
const inputName = document.getElementById("username");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");


// table 
const tableBody = document.querySelector("#tableUser tbody");


class User {

    constructor(id, username, email, phone) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone
    }

    static showHTML(id, username, email, phone) {
        const trElement = document.createElement("tr");

        trElement.innerHTML = `
                            <tr role="row" class="odd">
                                <td>${id}</td>
                                <td>${username}</td>
                                <td>${email}</td>
                                <td>${phone}</td>
                                <td>
                                    <button class="btn btn-sm btn-info  edit">Edit</button>
                                    <button class="btn btn-sm btn-danger delete">Delete</button>
                                </td>
                            </tr>`;

        tableBody.appendChild(trElement);
    }

    showData() {
        User.showHTML(this.id, this.username, this.email, this.phone);
        return this;
    }

    addToLocalStorage() {
        const allData = JSON.parse(localStorage.getItem("UsersData")) ?? [];
        allData.push({ id: this.id, username: this.username, email: this.email, phone: this.phone });
        localStorage.setItem("UsersData", JSON.stringify(allData));
    }

    static dispalyDataFormLocalStorage() {
        if (localStorage.getItem("UsersData")) {
            JSON.parse(localStorage.getItem("UsersData")).forEach((item) => {
                User.showHTML(item.id, item.username, item.email, item.phone);
            });
        }
    }

}


// Events 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let id = Math.floor(Math.random() * 100000);
    const user = new User(id, inputName.value, inputEmail.value, inputPhone.value);
    user.showData().addToLocalStorage();

});

// loading page 
User.dispalyDataFormLocalStorage();