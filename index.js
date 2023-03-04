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

    showData() {
        const trElement = document.createElement("tr");

        trElement.innerHTML = `
                            <tr role="row" class="odd">
                                <td>${this.id}</td>
                                <td>${this.username}</td>
                                <td>${this.email}</td>
                                <td>${this.phone}</td>
                                <td>
                                    <button class="btn btn-sm btn-info  edit">Edit</button>
                                    <button class="btn btn-sm btn-danger delete">Delete</button>
                                </td>
                            </tr>`;

        tableBody.appendChild(trElement);
    }

}


// Events 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let id = Math.floor(Math.random() * 100000);
    const user = new User(id, inputName.value, inputEmail.value, inputPhone.value);
    user.showData();

});