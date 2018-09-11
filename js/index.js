function getRepositories() {
    const username = document.getElementById('username').value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${username}/repos`);
    req.send();
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoList = repos.map(r => {
        const listUsername = r.owner.login;
        const listRepoName = r.name;
        return (`
            <ul>
                <li>
                    <h2>${r.name}</h2>
                    <a href="${r.html_url}">${r.html_url}</a><br>
                    <a href="#" onclick="getCommits(this)">Get Commits</a><br>
                    <a href="#" onclick="getBranches(this)">Get Branches</a><br>
                </li>
            </ul>` 
        );
    }).join('')
    document.getElementById('repositories').innerHTML = repoList;
};

function getCommits(el) {
    const name = el.dataset.repository;
    const user = document.getElementById('username').value;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayCommits);
    xhr.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/commits');
    xhr.send();

}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
        .map(
            commit =>
            '<li><strong>' +
            commit.commit.author.name +
            '</strong> - ' + 
            commit.author.login +
            commit.commit.message +
            '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    const name = el.dataset.repository;
    const username = document.getElementById('username').value;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayBranches);
    xhr.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
    xhr.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
        .map(
            branch =>
            '<li>' + branch.name + '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}
