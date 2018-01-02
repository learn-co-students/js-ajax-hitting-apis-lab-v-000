function getRepositories() {

    const username = document.getElementById("username").value;

    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.send()
}

function displayRepositories(event, data) {
    var repos = JSON.parse(this.responseText)
    const repoList = "<ul>" + repos.map(repo => {
        return(`
        <li>
        <a href="${repo.html_url}">${repo.name}</a><br>
        <a href='#' data-repository="${repo.name}" data-username="${repo.owner.login}" onclick='getCommits(this)'>Show Commits </a><br>
        <a href='#' data-repository="${repo.name}" data-username="${repo.owner.login}" onclick='getBranches(this)'>Show Branches</a></li>
        `)
    }).join('') + "</ul>";

    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
    const dataset = el.dataset;
    const name = dataset.repository;
    const username = dataset.username;
    const uri = `https://api.github.com/repos/${username}/${name}/commits`
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", uri )
    req.send()
}

function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul><li>${commits.map(commit => '<strong>' + commit.commit.author.name + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
}


function getBranches(el){
    const name = el.dataset.repository
    const username = el.dataset.username
    const uri = `https://api.github.com/repos/${username}/${name}/branches`
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", uri)
    req.send()
}

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul><li>${branches.map(branch => '<strong>' + branch.name + '</strong></li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
}
