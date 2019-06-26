// your code here
function getRepositories() {
    const name = document.getElementById("username").value
    console.log(name)
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/' + name + '/repos');
    req.send();
}

function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ul>${repos
      .map(
        r =>
          '<li>' +
          r.name +
          ' - <a href="' +
          r.html_url + 
          '">' +
          r.html_url +
          '</a>' +
          ' - <a href="#" data-repo="' +
          r.name +
          '" data-username="' +
          r.owner.login +
          ' onclick="getCommits(this)">Get Commits</a>' +
          ' - <a href="#" data-repo="' +
          r.name +
          '" data-username="' +
          r.owner.login +
          ' onclick="getBranches(this)">Get Branches</a></li>'
      )
      .join('')}</ul>`;
      console.log(repoList)
    document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
    console.log(el.dataset)
    const name = el.dataset.repository;
    console.log(name);
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    
    const commitsList = `<ul>${commits
    .map(
        commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    const name = el.dataset.repository;
    const username = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
    .map(
        branch =>
        '<li><strong>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}