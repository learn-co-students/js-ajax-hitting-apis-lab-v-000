// your code here

function getRepositories() {
  let username = document.getElementById('username').value;
  const request = new XMLHttpRequest();

  request.addEventListener('load', displayRepositories);
  request.open('GET',`https://api.github.com/users/${username}/repos`);
  request.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  // console.log(repos);

  const repoList = '<ul>'+ repos.map(repo =>{
    const dataUserName = 'data-username="' + repo.owner.login + '"';
    const dataRepo = 'data-repository="' + repo.name + '"';
    return`
      <li>
      <h4>${repo.name}</h4>
      <a href="${repo.html_url}">${repo.html_url}</a><br><br>
      <a href="#" ${dataRepo} ${dataUserName} onclick="getCommits(this)"> Get Commits</a><br>
      <a href="#" ${dataRepo} ${dataUserName} onclick="getBranches(this)"> Get Branches</a><br>
      </li>`;
    }).join('')+ '</ul>';

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;

  const request = new XMLHttpRequest();
  request.addEventListener('load', displayCommits);
  request.open('GET', 'https://api.github.com/repos/octocat/'+ name +'/commits');
  console.log('repoName',name);
  request.send();
};

function displayCommits(){
  const commits = JSON.parse(this.responseText);

  const commitList = `<ul>${commits.map(commit=>'<li>'+
  commit.author.login + ' -  ' + commit.commit.author.name +  ' - ' + commit.commit.message +
  '</li>')
  .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  let username = el.dataset.username;
  const name = el.dataset.repository;
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayBranches);
  request.open('GET',`https://api.github.com/repos/${username}/${name}/branches`);
  request.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);

  const branchList = `<ul>${branches.map(branch=>'<li>'+
  branch.name + '</li>')
  .join('')}</ul>`;

  document.getElementById('details').innerHTML = branchList;
}
