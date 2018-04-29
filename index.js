function getRepositories() {
    const username=document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`);
    req.send();
}

function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - ' 
      + `<a href="${r.html_url}">` + r.html_url + '</a>' 
      + '<br><a href="#" data-repository="' + r.name 
      + '" onclick="getCommits(this)">Get Commits</a>'
      + ' <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name
      + '" onclick="getBranches(this)">Get Branches</a>'
      + '</li>').join('')}</ul>`;
    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits (el) {
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    req.open("GET", `https://api.github.com/repos/${username.value}/${repo}/commits`);
    req.send();
}

function displayCommits (event, data) {
    const commits = JSON.parse(this.responseText);
    const commitList = `<ul>${commits.map(c => '<li>' + c.author.login + ' - ' + c.commit.committer.name 
    + ' - ' + c.commit.message + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = commitList;

}

function getBranches (el) {
    const username = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`);
    req.send();

}

function displayBranches (event, data) {
    const branches = JSON.parse(this.responseText);
    const branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = branchList;

}