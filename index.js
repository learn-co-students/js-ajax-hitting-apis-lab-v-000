function getRepositories(){
    var username = document.getElementById('username').value
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.send()
}

function displayRepositories(event, data){
    const repos = JSON.parse(this.responseText)
    const repoList = `<ul>${repos.map(r => '<li> <b>Name:</b> ' + r.name + '<br> <b>URL:</b> ' + 
    '<a href="' + r.html_url + '">' + r.html_url + '</a><br>' + 
    '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)"> Get Commits </a><br><a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
    const name = el.dataset.repository
    const username = el.dataset.username
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
    req.send()
}

function displayCommits(){
    const commits = JSON.parse(this.responseText)
    //debugger
    const commitsList = `<ul>${commits.map(commit => '<li><b>Github Name: </b> ' + commit.author.login + '<br></b> Author Name: </b> ' + commit.commit.author.name +  '<br><b>Commit Message:</b> ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
    const name = el.dataset.repository
    const username = el.dataset.username
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches)
    req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
    req.send()
}

function displayBranches(){
    const branches = JSON.parse(this.responseText)
    //debugger
    const branchesList = `<ul>${branches.map(branch => '<li><b>Branch Name: </b> ' + branch.name + '<br></b> URL: </b> ' +`<br><a href="${branch.commit.url}">` + branch.commit.url + '</a></li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
}