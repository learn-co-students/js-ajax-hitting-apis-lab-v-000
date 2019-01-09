function getRepositories() {
    const user = document.getElementById('username').value;
    const req = new XMLHttpRequest();

    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/' + user + '/repos');
    req.send();
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText);

    const repoList = `<ul>${repos
    .map(r =>
        '<li>' +
        r.name + ` - <a href="${r.html_url}">${r.html_url}</a><br>` +
        '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' +
        ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches</a>' +
        '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(repoObj) {
    const user = repoObj.dataset.username;
    const repo = repoObj.dataset.repository;
    const req = new XMLHttpRequest();

    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + user + '/' + repo + '/commits');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
        .map(
            commit =>
            '<li><h3>' +
            commit.commit.author.name +
            ' (' +
            commit.author.login +
            ')</h3>' +
            commit.commit.message +
            '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(repoObj) {
    const user = repoObj.dataset.username;
    const repo = repoObj.dataset.repository;
    const req = new XMLHttpRequest();

    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + user + '/' + repo + '/branches');
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
        .map(
            branch => '<li><h4>' + branch.name +'</h4></li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}