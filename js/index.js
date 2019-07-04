function getRepositories() {
    const username = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories)
    req.open("GET", 'https://api.github.com/users/' + username + '/repos');
    req.send();
}


function getCommits(element) {
    const repoName = element.dataset.repository;
    const url =
    'https://api.github.com' + '/repos/' + element.dataset.username + '/' + repoName + '/commits';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', displayCommits);
    xhr.open('GET', url);
    xhr.send();
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

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li> <a href="' + r.html_url + '">'+ r.name  + '</a>' + 
        ' - <a href="#" data-repository="' +
        r.name + '" data-username="' + r.owner.login  + '"' +
        ' onclick="getCommits(this)">Get Commits</a>' + 
        ' - <a href="#" data-repository="' +
        r.name + '" data-username="' + r.owner.login  + '"' +
        ' onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getBranches(element) {
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