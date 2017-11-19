function getRepositories() {
    const username = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories)
    req.open("GET", 'https://api.github.com/users/' + username + '/repos');
    req.send();
}

function displayRepositories(event, data) {
    var repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos.map(r => '<li>' + r.name + ` <a href="' + r.html_url +'">${r.html_url}</a><br>` + ' - <a href="#" data-repo="' + r.full_name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" onclick="getBranches(this)" data-details = "' + r.full_name + '">Get Branches</a>'  + '</li>').join("")}</ul>`
    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    req.open("GET", 'https://api.github.com/repos/' + name + '/commits');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(c => '<li><h3>' + c.commit.author.name + '(' + c.author.login + ')</h3>- ' + c.commit.message +'</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
    const name = el.dataset.details;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    req.open("GET", 'https://api.github.com/repos/' + name + '/branches');
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesData = `<ul>${branches.map(b => '<li><strong>' + b.name + '</strong></li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = branchesData;
}
