const rootURL = "https://api.github.com"

function getRepositories() {
    const name = document.getElementById("username").value
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayRepositories);
    req.open("GET", rootURL + "/users/" + name + "/repos")
    req.send()
    return false;
}

function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText)
    const repoList = "<ul>" + repos.map(repo => {
        const dataUserName = 'data-username="' + repo.owner.login + '"'
        const dataRepoName = 'data-repository="' + repo.name + '"'
        return(`
            <li>
                <h2>${repo.name}</h2>
                <a href="${repo.html_url}">Link to Repositiory</a> <br>
                <a href="#" ${dataRepoName} ${dataUserName} onclick="getCommits(this)">See Commits</a>
                <a href="#" ${dataRepoName} ${dataUserName} onclick="getBranches(this)">See Branches</a>
            </li>`)
    }).join('') + "</ul>";
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
    const req = new XMLHttpRequest
    req.addEventListener("load", displayCommits);
    req.open("GET", rootURL + "/repos/" + element.dataset.username + "/" + element.dataset.repository + "/commits")
    req.send()
}

function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitList = "<ul>" + commits.map( commit => {
        return(`
        <li>
            <p><b>Commit from:</b> "${commit.author.login}", A.K.A. "${commit.commit.author.name}"</p>
            <p><b>Commit message:</b> "${commit.commit.message}"
        </li>`)
    }).join('') + "</ul>";
    document.getElementById("details").innerHTML = commitList
}

function getBranches(element) {
    const req = new XMLHttpRequest
    req.addEventListener("load", displayBranches);
    req.open("GET", rootURL + "/repos/" + element.dataset.username + "/" + element.dataset.repository + "/branches")
    req.send()
}

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = "<h2>Branches:</h2>" + "<ul>" + branches.map( branch => {
        return(`
        <li>
            "${branch.name}"
        </li>`)
    }).join('') + "</ul>";
    document.getElementById("details").innerHTML = branchesList
}
