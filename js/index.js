// your code here

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  var gitusername = document.getElementById("username");
  //var link1 = `https://api.github.com/users/${gitusername.value}/repos`
  req.open('GET', `https://api.github.com/users/${gitusername.value}/repos`);
  //console.log(link1)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);

  const repoList = `<ul>${repos
    .map(
      r =>
      '<li><a href="' + r.html_url + '">' + r.name +
  '</a> - <a href="#" data-repository="' + r.name +
  '" data-username="' + r.owner.login +
  '" onclick="getCommits(this)">Get Commits</a> | <a href="#" data-repository="' + r.name +
  '" data-username="' + r.owner.login +
  '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  console.log(name)
  console.log(username)
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  //var link2 = 'https://api.github.com/repos/' + username + '/' + name + '/commits'
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  //console.log(link2)
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><strong>' +
      commit.author.login +
      '</strong>-'+
      commit.commit.message +
      '<strong>-' +
      commit.commit.committer.name +
      '</li>'
    )
.join('')}</ul>`;

document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username +'/' + name +'/branches');
  req.send()
}

function displayBranches() {
const branches = JSON.parse(this.responseText);
const branchList = `<ul>${branches
  .map(
    branch =>
    '<li>' +
    branch.name +
    '</li>')
    .join('')}</ul>`;
document.getElementById('details').innerHTML = branchList;
}
