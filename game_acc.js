// -----getting social account details from user using sell page form------

function dataGetGame() {
    fetch('https://retoolapi.dev/6SxjAZ/game')
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
            let row = '';
            for (let i of data) {
                console.log("name " + i.name + "\n" + "email :" + i.email + "\n" + "mobile no: " + i.phone);
                console.log("game side");

                row += `<div class="game-acc-card" id="link4">
                    <button style="height:45px; background-color: rgba(201, 31, 31, 0.664);color: white;width:35px;border-radius:15px;border:2px solid white;" onclick="dataDeleteGame(${i.id})">X</button> 
                    <div class="game-card-img">
                        <img src="${i.image}" style="cursor:pointer" onclick="showgamecarddata(${i.id})">
                    </div>
                    <div class="game-acc-detail">
                        <p>${i.category} (lv:${i.level}) <span>Price:${i.price}</span></p>
                    </div>
                </div>`;
            }
            cardshow.innerHTML = row;
        });
    window.location.href = "game_acc.html#games";
    window.alert("submited successfully....!👍");
    window.location.reload();
    showdataGame();
};

// -------------datasendgame-------------------
async function datasendGame() {
    try {
        let userName = document.getElementById("g-name").value;
        let userEmail = document.getElementById("g-email").value;
        let userPhone = document.getElementById("g-phone").value;
        let idName = document.getElementById("g-id-name").value;
        let accLevel = document.getElementById("g-level").value;
        let Category = document.getElementById("g-category").value;
        let Price = document.getElementById("g-price").value;
        let images = document.getElementById("g-images").value;

        let setData = await fetch("https://retoolapi.dev/6SxjAZ/game", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                phone: userPhone,
                price: Price,
                idname: idName,
                category: Category,
                level: accLevel,
                image: images
            })
        });

        let data = await setData.json();

        // Fetch current localStorage data
        let savedData = JSON.parse(localStorage.getItem("gameAccounts")) || [];

        // Add the new data to the array
        savedData.push(data);

        // Update localStorage with the new data
        localStorage.setItem("gameAccounts", JSON.stringify(savedData));

        // Re-render the data with updated localStorage
        dataGetGame();


    } catch (err) {
        console.log(err);
    }
}



// -----show data in game_acc.html page-------
// Show game account data
function showdataGame() {
    let gamecardshow = document.getElementById("gamecardshow");

    try {
        // Check if the data is already in localStorage
        const savedData = localStorage.getItem("gameAccounts");

        if (savedData) {
            // If data is found in localStorage, use it
            const data = JSON.parse(savedData);
            renderCards(data);
        } else {
            // Otherwise, fetch data from the API
            fetch('https://retoolapi.dev/6SxjAZ/game')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    // Store the fetched data in localStorage
                    localStorage.setItem("gameAccounts", JSON.stringify(data));

                    // Render the data in the UI
                    renderCards(data);
                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }
    } catch (error) {
        console.log("Error in showdataGame:", error);
    }
}

// Helper function to render cards
function renderCards(data) {
    let gamecardshow = document.getElementById("gamecardshow");
    searchgameProducts(data);
    let row = '';
    for (let i of data) {
        row += `<div class="game-acc-card" id="link4">
         <!---  only manager access the delete option           
        <button style="height:45px; background-color: rgba(201, 31, 31, 0.664);color: white;width:35px;border-radius:15px;border:2px solid white;" onclick="dataDeleteGame(${i.id})">X</button>
        ---> 
                    <div class="game-card-img">
                        <img src="${i.image}" style="cursor:pointer" onclick="showgamecarddata(${i.id})">
                    </div>
                    <div class="game-acc-detail">
                        <p>${i.category} (lv:${i.level}) <span>Price:${i.price}</span></p>
                    </div>
                </div>`;
    }
    gamecardshow.innerHTML = row;
    // searchgameProducts(data);
}

function searchgameProducts(data) {
    console.log("search engine worked");

    const categories = document.getElementById("gameproducts");

    // Check if event listener has already been added to avoidultiple bindings
    if (!categories.dataset.listenerAdded) {
        categories.addEventListener("change", (e) => {
            const value = e.target.value;
            value === "All" ? renderCards(data) : renderCards(data.filter((product) => product.category == value));
            console.log(value);
        });

        // Mark the event listener as added to prevent multiple additions
        categories.dataset.listenerAdded = "true";
    }
}


// -------delete data from game----------
async function dataDeleteGame(id) {
    try {
        let deldata = await fetch("https://retoolapi.dev/6SxjAZ/game" + "/" + id, {
            method: "DELETE"
        });
        if (deldata) {
            console.log(`Data Deleted: ${id}`);
            window.alert(`Thank you for your response..!.This account will be removed.`);

            // Update localStorage after deletion
            let savedData = JSON.parse(localStorage.getItem("gameAccounts")) || [];
            savedData = savedData.filter(item => item.id !== id);
            localStorage.setItem("gameAccounts", JSON.stringify(savedData));

            // Re-render the cards after deletion
            showdataGame();
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
}



// --to display particular account card--
// shown the account details into the game card details card page--------------

// show the selected card details to game-card.html
// Function to show the detailed card of a particular social account
async function showgamecarddata(id) {
    let gamecard = document.getElementById("gamecard");

    try {
        // Fetch data from localStorage
        const savedData = localStorage.getItem("gameAccounts");

        if (savedData) {
            const data = JSON.parse(savedData);

            // Find the specific account by ID
            const account = data.find(item => item.id === id);

            if (account) {
                gamecard.innerHTML = `
                <div class="products">
                <div class="p-right"><div class="title">
            <h1 style="font-size:40px;">${account.name}<br> <span style="font-size:30px;"> Price :$${account.price}</span></h1></div><hr><hr>
                <div class="pro-detail">
                    <p id="level">Level : ${account.level}</p>
                    <p>Phone : ${account.phone}</p>
                    <p>Email : ${account.email}</p>
                    <p id="username">Username : ${account.name}</p>
                    <p id="category">Category : ${account.category}</p>
                    <p id="idname">Id : ${account.idname}</p>
                    <p id="comments">
                    This is a personal account so it is absolutely safe. I have a 100% guarantee no one else will ever be able to access the account after you buy it. I delete from my device before I sell.
                    </p>
                </div>

                <div class="pro-btn">
                    <button onclick="dataDeleteGame(${account.id})">Click Me ✔</button>Before  clicking ,contact the user. Because it is automatically deleted.
                </div>

            </div>
            <div class="p-left">
                <img src="${account.image}" alt="game image">
            </div></div>`;
                document.getElementById('gamecardshow').style.display = 'none';
                document.getElementById('games').style.display = 'none';
                document.getElementById('gamecard').style.display = 'block';
            }
        }
    } catch (err) {
        console.log(err);
    }
}