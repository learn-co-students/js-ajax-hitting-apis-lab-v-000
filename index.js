function displayRepositories() { 
    var repos = JSON.parse(this.responseText)
    console.log(repos)
     const repoList = `<ul>${repos.map(r => '<li>' + r.full_name + ' - <a href="' + r.html_url +'">Repo</a>' + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
     
    document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() { 
    username = document.getElementById("username").value
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories) 
    req.open("GET", 'https://api.github.com/users/' + username + '/repos')
    req.send() 
}

function displayCommits() { 
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(c => '<li>' + c.author.login + ' -' + c.commit.author.name + c.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList 
}

function getCommits(el) {
    const username = el.dataset.username 
    const repository = el.dataset.repository 
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
    req.send()
}

function displayBranches() { 
const branches = JSON.parse(this.responseText)
const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
document.getElementById("details").innerHTML = branchesList 
}

function getBranches(el) { 
    const username = el.dataset.username
    const repository = el.dataset.repository 
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
    req.send()
}