function getRepositories() {
  const req = new XMLHttpRequest();
  const user = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `${repos.map(r => `${r.html_url}`)}`;
  document.getElementById("repositories").innerHTML = repoList;
}
