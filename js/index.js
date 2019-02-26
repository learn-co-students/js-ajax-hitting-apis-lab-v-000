// your code here
function getRepositories(){
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRespositories);
  req.open('GET', 'https://api.github.com/users/'+ username +'/repos');
  req.send();
}

function showRespositories(){
  let repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(r =>
  '<li>'+ r.name + '</li>').join(" ")}</ul>`;
  document.getElementById('repositories').innerHTML += repoList;
}
