let registerResultContainer = document.getElementById('registerResultContainer');


function ValidateEmail(mail) {
    if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

document.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    //TODO : Validation

    var player = {
        fullName: document.querySelector("#inputFullName").value.trim(),
        email: document.querySelector("#inputEmail3").value.trim(),
    };

    if(!player.fullName){
        registerResultContainer.innerHTML = `
        <div class="alert alert-danger">
            <strong>Full name is required.</strong>
        </div>
        `
        return
    }

    if(!player.email){
        registerResultContainer.innerHTML = `
        <div class="alert alert-danger">
            <strong>Email is required.</strong>
        </div>
        `
        return
    }   

    if(!ValidateEmail(player.email)){
        registerResultContainer.innerHTML = `
        <div class="alert alert-danger">
            <strong>Please enter a valid email.</strong>
        </div>
        `
        return
    }

    localStorage.setItem("player", JSON.stringify(player));
    location.href = "./game.html";
});

