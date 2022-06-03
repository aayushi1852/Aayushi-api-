
const GitHubForm = document.getElementById('gitHubForm');

GitHubForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the github username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the Value of the github username input field
    let GitHubUsername = usernameInput.value;

    // Run github API 
    requestUserRepos(GitHubUsername);


})
document.getElementById("submitbtn").addEventListener("click", () => {
    window.location.replace("contactus.html")
})

function requestUserRepos(username) {

    //create new XMLHTTPREQUEST object
    const xhr = new XMLHttpRequest();

    //github endpoint, dynamically passing in specifid username
    const url = `https://api.github.com/users/${username}/repos`;

    xhr.open('GET', url, true);
    xhr.onload = function(){
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        
        console.log(data);

        let ul = document.getElementById('userRepos');
        userRepos.innerHTML = (`<h1 style="margin-left: auto;margin-right: auto;"> ${data[0].owner.login}</h1>
        <img src=${data[0].owner.avatar_url} alt="The Repo Owner" style="display:block;margin-left:auto;margin-right:auto;width:10%;margin-top:2%">
        <p " width="200" height="200" style="text-align:center; margin-top:2%">Followers : ${data[0].owner.followers_url.length}  </p>`)
        
        for (let i = 0; i < data.length; i++) {
            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');

           // Add Bootstrap list item class to each li
            li.classList.add('list-group-item');
            li.innerHTML = (`
            <p><strong>Repo:</strong> ${data[i].name}</p>
            <p><strong>Description:</strong> ${data[i].description}</p>
            <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
        `);
        ul.appendChild(li)
            
        }


    }
    
    // Send the request to the server
    xhr.send();

}