function getRepositories() {
    const userName = document.getElementById('username').value
    console.log(userName)

    const req = new XMLHttpRequest
    req.addEventListener('load', displayRepositories)
    req.open("GET", 'https://api.github.com/users/'+userName+'/repos')
    req.send()
}


function displayRepositories(e, data) {
    const repos = JSON.parse(this.responseText)
    console.log(repos)
    const repo = `<ul>${repos.map(r => '<li>'+r.name+'</li><a href='+r.html_url+'>HTML Link</a><a href="#" data-name="'+r.owner.login+'"data-repos="'+r.name+ '"onclick=getCommits(this)>Get Commits</a><a href="#" data-name="'+r.owner.login+'"data-repos="'+r.name+ '"onclick=getBranches(this)>Repo Branches</a>').join('')}</ul>`
    document.getElementById('repositories').innerHTML = repo

}

function getCommits(el) {
    const repoName = el.dataset.repos
    const userName = el.dataset.name
    const req = new XMLHttpRequest
    req.addEventListener('load', displayCommits)
    req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/commits')
    req.send()
}

function displayCommits(el, data) {
    const commits = JSON.parse(this.responseText)
    console.log(commits)
    const commit = `<ul>${ commits.map( commit => '<li>'+ commit.commit.message + '</li><li>'+commit.author.login+'</li><li>'+ commit.commit.author.name+'</li>').join('') }</ul>`
    document.getElementById('details').innerHTML = commit
}

function getBranches(el) {
    const repoName = el.dataset.repos
    const userName = el.dataset.name
    console.log(userName)
    const req = new XMLHttpRequest
    req.addEventListener('load', displayBranches)
    req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/branches')
    req.send()
}

function displayBranches(el, data) {
    const branches = JSON.parse(this.responseText)
    const branch = `<ul>${ branches.map( b => '<li>'+ b.name+'</li>').join('') } </ul>`
    document.getElementById('details').innerHTML = branch
}
