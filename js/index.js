// your code here
function displayRepositories() {
    let repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ul>${repos
    .map(
        r =>
        '<li>' + 
        '<a href="' + r.html_url + '" target="_blank">' + r.name + '</a>' + 
        ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>'
        ).join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
    const req = new XMLHttpRequest();
    const name = document.getElementById('username').value;
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/' + name + '/repos');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `${commits
    .map(
        commit =>
        commit.author.login +
        commit.commit.author.name +
        commit.commit.message
    )}`;
    document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
    const username = el.dataset.username;
    const repository = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
    req.send();
}
function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `${branches
    .map( 
        branch => 
        branch.name
    )}`;
    document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
    const username = el.dataset.username;
    const repository = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository +'/branches');
    req.send();
}