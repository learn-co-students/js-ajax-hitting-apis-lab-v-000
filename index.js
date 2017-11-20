function getRepositories() {
    const req = new XMLHttpRequest()
    const username = document.getElementById("username").value
    req.addEventListener("load", displayRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`)
    req.send()
}

function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText);

    const repoList = "<ul>" + repos.map(r => {

        const dataRepo = 'data-repository="' + r.name + '"';
        const dataUsername = 'data-username="' + r.owner.login + '"';
        const dataLink = r.html_url;
        return (
            `<li>
                <a href="${dataLink}" target="_blank">${r.name}</a>
                <a href="#" ${dataUsername} ${dataRepo} onclick="getCommits(this)">Get Commits</a><br>
                <a href="#" ${dataUsername} ${dataRepo} onclick="getBranches(this)">Get Branches</a>
            </li>
            `
        )}).join('') + "</ul>"

    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
    const req = new XMLHttpRequest();
    const repoName = el.dataset.repository;
    const username = el.dataset.username;
    req.addEventListener("load", displayCommits);
    req.open("GET", `https://api.github.com/repos/${username}/${repoName}/commits`)
    req.send()
}

function displayCommits(event, data) {
    const commits = JSON.parse(this.responseText);
    const commitList = "<ul>" + commits.map(c => {
        const githubUsername = c.author.login;
        const fullName = c.commit.author.name;
        const commitMessage = c.commit.message;
        
        return (
            
            `<li>
                Github username: ${githubUsername}<br>
                Fullname: ${fullName}<br>
                Commit message: ${commitMessage}
            </li>
            `
        )
    }).join('') + "</ul>"
    
    document.getElementById("details").innerHTML = commitList;
}

function getBranches(el) {
    const req = new XMLHttpRequest();
    const repoName = el.dataset.repository;
    const username = el.dataset.username;
    req.addEventListener("load", displayBranches);
    req.open("GET", `https://api.github.com/repos/${username}/${repoName}/branches`)
    req.send()
}
    
function displayBranches(event, data) {
    const branches = JSON.parse(this.responseText);
    const branchList = "<ul>" + branches.map(b => {
        const branch = b.name;

        return (
            
            `<li>
                ${branch}
            </li>
            `
        )
    }).join('') + "</ul>"
    
    document.getElementById("details").innerHTML = branchList;
}






