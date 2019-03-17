// your code here
function getRepositories(){
    const username = document.getElementById("username").value;
    const url = 'https://api.github.com' + '/users/' + username + '/repos';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayRepositories);
    xhr.open('GET', url);
    xhr.send();
}

function displayRepositories(){
    const repos = JSON.parse(this.responseText);
    const div = '<div>' + repos.map(repo => {
        const dataUsername = "data-username='" + repo.owner.login + "'";
        const dataRepoName = "data-repository='" + repo.name + "'";
        return `
          <div>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </div>`;
    }).join('') +
    '</div>';
    document.getElementById('repositories').innerHTML = div;
}

function getCommits(element){
    const repoName = element.dataset.repository;
    const url =
    'https://api.github.com' + '/repos/' + element.dataset.username + '/' + repoName + '/commits';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayCommits);
    xhr.open('GET', url);
    xhr.send();
}

function displayCommits(){
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

function getBranches(element){
    const repoName = element.dataset.repository;
    const url = 'https://api.github.com' + '/repos/' + element.dataset.username + '/' + repoName + '/branches';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayBranches);
    xhr.open('GET', url);
    xhr.send();
}

function displayBranches(){
    const branches = JSON.parse(this.responseText);
    console.log(this.responseText);
    const branchesList = `<ul>${branches.map(
        branch => 
            '<li>' +
            branch.name + '</li>'
    ).join('')}</ul>`
    document.getElementById('details').innerHTML = branchesList;
}