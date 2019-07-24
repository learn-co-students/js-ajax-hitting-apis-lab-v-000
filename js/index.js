// your code here
function getRepositories() {
    const req = new XMLHttpRequest();
    const username = document.querySelector('#username').value
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${username}/repos`);
    req.send();
}

function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ol>${repos.map(r => '<li>' + r.name + ` - <a href="${r.html_url}">Go to Repo</a>` + ` - <a href="#" data-repository=${r.name} data-username=${r.owner.login} onclick="getCommits(this)">Commits</a>` + ` - <a href="#" data-repo=${r.name} data-username=${r.owner.login} onclick="getBranches(this)">Branches</a></li>`).join('')}</ol>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
    const repository = el.dataset.repository;
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' - ' + decideLogin(commit) + ' - ' + commit.commit.message + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function decideLogin(commit) {
    if (commit.author) {
        return commit.author.login;
    } else {
        return "Login Missing";
    }
}

function getBranches(el) {
    const repository = el.dataset.repository;
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener ('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
    document.getElementById('details').innerHTML = branchList;
}