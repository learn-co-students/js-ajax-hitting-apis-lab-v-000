function getRepositories() {
    const username = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories);
    req.open("GET", 'https://api.github.com/users/' + username + '/repos');
    req.send();
}
function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    repoList = `<ul>${repos.map( repo => "<li><h3><a href='" + repo.html_url + "'>" + repo.name + '</a></h3><a href="#" data-repository="' + repo.name + '" data-username="' + repo.html_url.split("/")[3] + '"onclick="getCommits(this)">Get Commits</a><br><a href="#" data-repository="' + repo.name + '" data-username="' + repo.html_url.split("/")[3] + '"onclick="getBranches(this)">Display Branches</a></li>').join("")}</ul>`;
    document.getElementById("repositories").innerHTML = repoList;
}
function getCommits(dataBlock) {
    const data = dataBlock.dataset
    const username = data.username;
    const repoName = data.repository;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    const commitsUrl = 'https://api.github.com/repos/' + username + '/' + repoName + '/commits';
    req.open("GET", commitsUrl)
    req.send();
}
function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + "-" + commit.commit.message + '</li>').join("")}</ul>`;
    document.getElementById("details").innerHTML = commitsList;
}
function getBranches(dataBlock) {
    const data = dataBlock.dataset
    const username = data.username;
    const repoName = data.repository;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    const branchesUrl = 'https://api.github.com/repos/' + username + '/' + repoName + '/branches';
    req.open("GET", branchesUrl)
    req.send();
}
function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join("")}</ul>`;
    document.getElementById("details").innerHTML = branchesList;
}