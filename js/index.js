// your code here


const rootURL = 'https://api.github.com';

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function displayCommits(){
  const commits  = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
  .map(
    commit =>
    '<li><strong>' +
     commit.commit.author.name +
     ' - ' +
     commit.author.login +
     '</strong> - ' +
      commit.commit.message +
      '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches(){
  const response = JSON.parse(this.responseText);
  console.log("******************");
  console.log(response);
  const branches = `<ul>${response
    .map(
      branch =>
      '<li><strong>' +
      branch.name +
      '</strong></li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branches;

}

function getBranches(el){
    const repoName = el.dataset.repository;
  const uri =
  rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}
