// ------------------------------------------------------
// this is for hide and show login and sign up using hash..

document.getElementById("login-in").addEventListener('click', function () {
    window.location.hash = "#login_page";
    window.location.reload();
});
document.getElementById("login-in2").addEventListener('click', function () {
    window.location.hash = "#login_page";
    window.location.reload();
});

document.getElementById("lg-login-btn").addEventListener('click', function () {
    window.location.hash = "#signup_page";
    window.location.reload();
});
document.getElementById("lg-login-btn2").addEventListener('click', function () {
    window.location.hash = "#signup_page";
    window.location.reload();
});


const hash = window.location.hash;

if (hash == '#login_page') {

    document.getElementById('signup_page_id').style.display = 'none';
    document.getElementById('login_page_id').style.display = 'block';
} else if (hash == '#signup_page') {
    document.getElementById('signup_page_id').style.display = 'block';
    document.getElementById('login_page_id').style.display = 'none';
};

// ------------------------------------------
// This code is for sign-up page--------------

document.getElementById("sign-up").addEventListener("click", () => {
    datasend1();
})

function dataGet1() {
    setTimeout(() => {
        fetch('https://retoolapi.dev/m3MzL7/logindata')
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(response.status)
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                for (let i of data) {
                    console.log("name: " + i.username + " Email: " + i.email + " Password : " + i.password);
                }
            });
    }, 50);
    window.alert("Signed successfully...!");

    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    window.location.href = "index.html";
};


async function datasend1() {
    let userName = document.getElementById("username").value;
    let useremail = document.getElementById("email").value;
    let userpassword = document.getElementById("password").value;
    let setData = await fetch
        (
            "https://retoolapi.dev/m3MzL7/logindata",
            {
                method: "POST",
                headers:
                {
                    "content-type": "application/json"
                },
                body: JSON.stringify
                    ({
                        username: userName,
                        email: useremail,
                        password: userpassword
                    })
            }
        );
    data = setData.json();
    console.log(data);
    dataGet1();
};



// this is for login site-----------------------------------

document.getElementById("lg-btn").addEventListener("click", () => {
    dataGet2();
});

function dataGet2() {
    setTimeout(() => {
        fetch('https://retoolapi.dev/m3MzL7/logindata')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                const username = document.getElementById("lgusername").value;
                const password = document.getElementById("lgpassword").value;
                for (let i of data) {
                    if ((username == i.username) && (password == i.password)) {
                        window.location.href = "index.html";
                        console.log("its worked");
                        break;
                    }
                    else {
                        console.log("worng");
                        document.getElementById("lgusername").value = "";
                        document.getElementById("lgpassword").value = "";
                    }
                }
            });
    }, 50);
};
