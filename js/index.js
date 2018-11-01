const apiURL = `https://api.github.com`

function getRepositories(){
  const user = document.getElementById(`username`).value
  const uri = `${apiURL}/users/${user}/repos`;
  const req = new XMLHttpRequest();
  req.addEventListener(`load`, displayRepositories)
  req.open(`GET`, uri);
  req.send();
};

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  let lis = repos.map(repo => {
    const dataUsername = `data-username="${repo.owner.login}"`;
    const dataRepoName = `data-repository="${repo.name}"`
    return `<li>
    ${repo.name} - <a href="${repo.html_url}">Repo Link</a> </br>
    <a href="#" ${dataRepoName} ${dataUsername} onClick="getCommits(this)">Get Commits</a> |
    <a href="#" ${dataRepoName} ${dataUsername} onClick="getBranches(this)">Get Branches</a>
    </li></br>`
  }).join('')

  const repoList = `<ul> ${lis} </ul>`
  document.getElementById(`repositories`).innerHTML += repoList
};

function getCommits(el){
  const user = el.dataset.username;
  const repo = el.dataset.repository;
  const uri = `${apiURL}/repos/${user}/${repo}/commits`;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits)
  req.open (`GET`, uri)
  req.send();
};

function displayCommits(){
  let commits = JSON.parse(this.responseText);
  let lis = commits.map(commit =>
    `<li>
    ${commit.author.login} -
    ${commit.commit.author.name}</br>
    ${commit.commit.message}
    </li>`
  ).join('')

  const commitList = `<ul> ${lis} </ul>`
  document.getElementById(`details`).innerHTML += commitList
};

function getBranches(el){
  const user = el.dataset.username;
  const repo = el.dataset.repository;
  const uri = `${apiURL}/repos/${user}/${repo}/branches`;
  const req = new XMLHttpRequest();
  req.addEventListener(`load`, displayBranches);
  req.open('GET', uri)
  req.send();
};

function displayBranches(){
  let branches = JSON.parse(this.responseText);
  let lis = branches.map(branch =>
    `<li>
    ${branch.name}
    </li>`
  ).join('')

  const branchList = `<ul> ${lis} </ul>`
  document.getElementById(`details`).innerHTML += branchList
};
