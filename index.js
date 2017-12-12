function getRepositories(){
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  const path = `https://api.github.com/users/${username}/repos`
  //console.log(`https://api.github.com/users/${username}/repos`)
  req.addEventListener("load",displayRepositories);
  req.open("Get",path);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
    const username = 'Username= "'+ repo.owner.login +'"'
     const reponame = 'Repository= "'+ repo.name +'"'
    return(`${repo.name} <a href="${repo.html_url}">${repo.html_url}</a>
    <br>
     <a href="#" ${reponame} ${username} onclick="getCommits(this)">Get Commits</a><br>
     <a href="#" ${reponame} ${username} onclick="getBranches(this)"> Get Branches </a> </li>
     </li>`)}).join('') + "</ul>";

  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el)
{
  const reponame = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${reponame}/commits`);
   req.send()
}

function displayCommits()
{
   const commits = JSON.parse(this.responseText);
   const commitsList = commits.map(c =>  '/'+ c.commit.author.name +'/'+ c.author.login+'/'+ c.commit.message ).join('/');
   document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el)
{
  const reponame = el.dataset.repository;
  const req = new XMLHttpRequest();;
  req.addEventListener("load",displayBranches)
  req.open("GET",`https://api.github.com/repos/${el.dataset.username}/${reponame}/branches`);
  req.send();
}
function displayBranches()
{
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li>'+branch.name+'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList;
}
