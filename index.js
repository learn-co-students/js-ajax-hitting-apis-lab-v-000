function getRespositories(){
  const username = document. getElementById("username").innerHTML;
  const req = new XMLHttpRequest)();
  req.open ("GET", 'https://api.github.com/${username}/repos');
  req.addEventListener("load", displayRepositories);
  req.send();
}

function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
