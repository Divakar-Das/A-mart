// -----getting social account details from user using sell page form------

function dataGet() {
    fetch('https://retoolapi.dev/xDprB8/social')
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
                console.log("social side");

                row += `<div class="acc-card">
                    <button style="padding:2px 8px; height:30px; background-color: rgba(201, 31, 31, 0.664);color: white;border-radius:15px;border:2px solid white;" onclick="dataDelete(${i.id})">X</button> 
        <div class="card-img">
        <img src="${i.image}" style="cursor:pointer" width="130px" onclick="showcarddata(${i.id})" id="link3" height="250px">
        </div>
        <div class="acc-detail">
            <p>${i.accname} \n ${i.followers} Followers \n ${i.category}</p>
            </div>
            </div>`;
            }
            cardshow.innerHTML = row;
        });
    window.location.href = "social_acc.html#socials";
    window.alert("submited successfully....!👍");
    window.location.reload();
    showdataSocial();
};

// -------------datasend-------------------
async function datasend() {
    try {
        let userName = document.getElementById("name").value;
        let userEmail = document.getElementById("email").value;
        let userPhone = document.getElementById("phone").value;
        let accName = document.getElementById("acc-name").value;
        let Category = document.getElementById("category").value;
        let followers = document.getElementById("followers").value;
        let year = document.getElementById("year").value;
        let Price = document.getElementById("price").value;
        let images = document.getElementById("images").value;

        let setData = await fetch("https://retoolapi.dev/xDprB8/social", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                phone: userPhone,
                price: Price,
                accname: accName,
                year: year,
                category: Category,
                followers: followers,
                image: images
            })
        });

        let data = await setData.json();

        // Fetch current localStorage data
        let savedData = JSON.parse(localStorage.getItem("socialAccounts")) || [];

        // Add the new data to the array
        savedData.push(data);

        // Update localStorage with the new data
        localStorage.setItem("socialAccounts", JSON.stringify(savedData));

        // Re-render the data with updated localStorage
        dataGet();


    } catch (err) {
        console.log(err);
    }
}



// -----show data in social-------
// Show social account data
function showdataSocial() {
    let cardshow = document.getElementById("cardshow");

    try {
        // Check if the data is already in localStorage
        const savedData = localStorage.getItem("socialAccounts");

        if (savedData) {
            // If data is found in localStorage, use it
            const data = JSON.parse(savedData);
            renderCards(data);
        } else {
            // Otherwise, fetch data from the API
            fetch('https://retoolapi.dev/xDprB8/social')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    // Store the fetched data in localStorage
                    localStorage.setItem("socialAccounts", JSON.stringify(data));

                    // Render the data in the UI
                    renderCards(data);

                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }
    } catch (error) {
        console.log("Error in showdataSocial:", error);
    }
}

// Helper function to render cards
function renderCards(data) {
    let cardshow = document.getElementById("cardshow");
    searchProducts(data);
    let row = '';
    for (let i of data) {
        row += `<div class="acc-card">
                    <!---  only manager access the delete option
                     <button style="padding:2px 8px; height:30px; background-color: rgba(201, 31, 31, 0.664); color: white; border-radius: 15px; border: 2px solid white;" onclick="dataDelete(${i.id})">X</button>
                     ----> 
                    <div class="card-img">
                        <img src="${i.image}" style="cursor:pointer" width="130px" height="250px" onclick="showcarddata(${i.id})">
                    </div>
                    <div class="acc-detail">
                        <p>${i.accname} <br> ${i.followers} Followers <br> ${i.category}</p>
                    </div>
                </div>`;
    }
    cardshow.innerHTML = row;
}


function searchProducts(data) {
    console.log("search engine worked for social site");
    const categories = document.getElementById("products");

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

// -------delete data from social----------
async function dataDelete(id) {
    try {
        let deldata = await fetch("https://retoolapi.dev/xDprB8/social" + "/" + id, {
            method: "DELETE"
        });
        if (deldata) {
            console.log(`Data Deleted: ${id}`);
            window.alert(`Thank you for your response..!.This account will be removed.`);

            // Update localStorage after deletion
            let savedData = JSON.parse(localStorage.getItem("socialAccounts")) || [];
            savedData = savedData.filter(item => item.id !== id);
            localStorage.setItem("socialAccounts", JSON.stringify(savedData));

            // Re-render the cards after deletion
            showdataSocial();
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
async function showcarddata(id) {
    let socialcard = document.getElementById("social-single-card");

    try {
        // Fetch data from localStorage
        const savedData = localStorage.getItem("socialAccounts");

        if (savedData) {
            const data = JSON.parse(savedData);

            // Find the specific account by ID
            const account = data.find(item => item.id === id);

            if (account) {
                socialcard.innerHTML = `
                    <div class="products">
                        <div class="p-left">
                            <img src="${account.image}" alt="Account Image" width="200px" height="250px">
                        </div>
                        <div class="p-right">
                            <div class="title">
                                <h1>${account.accname} <br> <span>${account.price}</span></h1>
                            </div>
                            <hr>
                            <div class="pro-detail">
                                <p id="followers">Followers: ${account.followers}</p>
                                <p id="username">User Name: ${account.name}</p>
                                <p id="email">User Email: ${account.email}</p>
                                <p id="mobile">Mobile No: ${account.phone}</p>
                                <p id="year">Starting Year: ${account.year}</p>
                                <p id="comments">
                                I am a A-mart User.I grew the account totally in an organic way and I prepared the account for shoutout. But I have many accounts so now I want to sell my account because I can’t manage all those accounts alone. I grew it 100% organically.</p>
                            </div>
                            <div class="pro-btn">
                    <button onclick="dataDelete(${account.id})">Click Me ✔</button>Before  clicking ,contact the user. Because it is automatically deleted.
                </div>
                        </div>
                    </div>
                `;
                document.getElementById('cardshow').style.display = 'none';
                document.getElementById('socials').style.display = 'none';
            }
        }
    } catch (err) {
        console.log(err);
    }
}