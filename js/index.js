// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  let username = document.getElementById("username").value
  let url = 'https://api.github.com/users/' + username + '/repos'
  req.open('GET', url);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  let names = repos.map(function (repo) {
    return repo.name
  })
  let repoArray = []
  let repoList = names.forEach(function (el) {
    repoArray.push(`<ul><li>${el} - <a href="#" data-repo="${el}" onclick="getCommits(this)">Get Commits</a></li></ul>`)
  })
  document.getElementById('repositories').innerHTML = repoArray.join('');
}
