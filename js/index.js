// your code here
function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
  .map(
    commit =>
      '<li><strong>' +
      commit.author.name +
      '</strong> - ' +
      commit.commit.message +
      '</li>'
  )
  .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  const username = document.getElementById("username").value
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
   req.addEventListener('onclick', displayCommits);
   req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
   req.send();
}
