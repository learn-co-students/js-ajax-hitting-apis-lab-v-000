// your code here
function getRepositories(){
    let username = document.querySelector('input').value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${username}/repos`);
    req.send();
}

function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ul>${repos
      .map(
        r =>`
        <li>
        ${r.name}
        <a href="${r.html_url}">${r.html_url}</a><br>
        <a href="#" 'data-repository="' + repo.name + '"' 'data-username="' + repo.owner.login + '"' onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" 'data-repository="' + repo.name + '"' 'data-username="' + repo.owner.login + '"' onclick="getBranches(this)">Get Branches</a><br>
      `).join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
  }

  function getCommits(item){
    const username = item.dataset.username
    const repo = item.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayCommits)
    req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`)
    req.send
  }

   function displayCommits(){
    var commits= JSON.parse(this.responseText);
    console.log(commits);
     const commitList =
    `<ul>
      ${commits.map(commit => `
        <li>
          ${commit.commit.author.name}
          ${commit.author.login}
          ${commit.commit.message}
        </li>
          `).join('')}
      </ul>`
      document.getElementById('details').innerHTML = commitList;
  }


  function getBranches(item){
    const username = item.dataset.username
    const repo = item.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayBranches)
    req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`)
    req.send()
  }
   function displayBranches(){
    var branches= JSON.parse(this.responseText)
    console.log(branches)
    const branchlist =
    `
    <ul>
      ${branches.map(branch => `
        <li>
          ${branch.name}
        </li>`).join('')}
    </ul>`
    document.getElementById('details').innerHTML = branchlist
  }