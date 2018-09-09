// AJAX CALLERS
function getRepositories(){
    const username = document.getElementById('username').value;

    const req = new XMLHttpRequest();

    req.addEventListener("load", displayRepositories);

    req.open(
        'GET',
        `https://api.github.com/users/${username}/repos`
    );

    req.send();
}

// AJAX CALLBACKS
function displayRepositories(event, data){
    const reposJSON = JSON.parse(this.responseText);

    reposList = 
        '<ul>' +
            reposJSON.map(repo => `<li><a href="${repo.html_url}" target="blank">${repo.name}</a></li>`).join('') +
        '</ul>';

    document.getElementById('repositories').innerHTML = reposList;
}