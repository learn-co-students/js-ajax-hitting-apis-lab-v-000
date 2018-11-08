function getRepositories() {
    const request = new XMLHttpRequest();
    const username = document.getElementById('username').value;
    request.addEventListener('load', displayRepositories);
    request.open('GET', `https://api.github.com/users/${username}/repos`);
    request.send();
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoList = `<ul>${repos.map(repo => `
            <li>
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}">${repo.html_url}</a><br>
                <a href="#" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a> | 
                <a href="#" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a>
            </li>`).join('')}
            </ul>`;

    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
    const username = document.getElementById('username').value;
    const repoName = el.dataset.repository;
    const request = new XMLHttpRequest();
    request.addEventListener('load', displayCommits);
    request.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits`);
    console.log(`https://api.github.com/repos/${username}/${repoName}/commits`);
    request.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => `<li>${commit.author.login} ${commit.commit.author.name} – ${commit.commit.message}</li>`).join('')}</ul>`

    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    const username = document.getElementById('username').value;
    const name = el.dataset.repository;
    const request = new XMLHttpRequest();
    request.addEventListener('load', displayBranches);
    request.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
    request.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul> ${branches.map(branch => `<li>${branch.name}</li>`).join('')} </ul>`

    document.getElementById('details').innerHTML = branchesList;
}
