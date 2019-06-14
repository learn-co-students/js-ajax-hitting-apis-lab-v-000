// your code here
function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li>' + r.clone_url + '</li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li>' +
          commit.commit.author.name + ' - ' + commit.commit.message + ' ' + commit.committer.login +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
    req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText); //// NEED HELP HERE
  console.log(branches)
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}

function getBranches(el){
  const name = el.dataset.repository; /// NEED HELP HERE
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
  req.send();
}
