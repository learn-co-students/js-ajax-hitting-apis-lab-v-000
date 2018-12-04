// your code here

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `${repos.map(repo => '<li>' + repo.name + repo.html_url +'</li>')} `;
  document.getElementById('repositories').innerHTML = repoList;
}




function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}


function getCommits(el) {

};
