// your code here
function getRepositories(){
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('Get', 'https://api.github.com/users/octocat/repos');
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
          ' - <a href="#" data-repo="' +
          r.name +
          '" onclick="getCommits(this)">Details</a></li>'
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
  }

  function getCommits(el) {
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
    req.send();
  }
  

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><strong>' +
          commit.author.login +
          '<li><strong>' +
          commit.author.fullname +
          '</strong> - ' +
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el) {
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
    req.send();
  }

  function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchessList = `<ul>${branches
      .map(
        branch =>
          '<li><strong>' +
          branch.author.login +
          '</strong> - ' +
          branch.name +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('branches').innerHTML = commitsList;
  }