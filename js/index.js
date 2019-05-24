// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value

  req.addEventListener('load', showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send
}

function showRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos)

  const repoList = `<ul>${repos
    .map(r => '<li>' + r.name + '</li>')
    .join('')}</ul>`;
    
  document.getElementById('repositories').innerHTML = repoList;
}
