function displayRepositories() {
    var repos = JSON.parse(this.responseText)
    console.log(repos)
    const repoList= `<ul>${repos.map(r => '<li>' + r.full_name + ' - <a href="' + r.html_url +'">See This Repo</a>' + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories)
    username = document.getElementById("username").value
    req.open("GET", 'https://api.github.com/users/'+ username +'/repos')
    req.send()
}

function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> -' + commit.commit.author.name + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
    const username = el.dataset.username
    const repository = el.dataset.repository
    const req = new XMLHttpRequest()
    const url = "https://api.github.com/repos/"+ username + "/" + repository + "/commits"
    req.addEventListener("load", displayCommits)
    req.open("GET", url)
    req.send()
}

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
    const username = el.dataset.username
    const repository = el.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", 'https://api.github.com/repos/'+ username + '/' + repository + '/branches')
    req.send()
}
