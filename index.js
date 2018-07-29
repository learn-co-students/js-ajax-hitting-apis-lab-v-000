function getRepositories(){
  const username=document.getElementsByName("username")[0].value;
  const req=new XMLHttpRequest();
  req.addEventListener("load",displayRepositories);
  req.open("GET","https://api.github.com/users/"+username+"/repos");
  req.send();
}

function displayRepositories(){
  let dest=document.getElementById("repositories");
  const repos=JSON.parse(this.responseText);
  console.log(repos.length);
  const output=`<ul>${repos.map(r=>"<li>"+r.name+" - <a href='#' data-username='"+r.owner.login+"'data-repository='"+r.name+"' onclick='getCommits(this)'>"+r.html_url+"</a> - <a href='#' data-username='"+r.owner.login+"'data-repository='"+r.name+"'onclick='getBranches(this)'>Get Branches</li>").join("")}</ul>`;
  dest.innerHTML=output;
}

function getCommits(el){
  const repoName=el.dataset.repository;
  const userName=el.dataset.username;
  const req=new XMLHttpRequest();
  req.addEventListener("load",displayCommits);
  req.open("GET","https://api.github.com/repos/"+userName+"/"+repoName+"/commits");
  req.send();
}

function displayCommits(){
  let dest=document.getElementById('details');
  const commits=JSON.parse(this.responseText);
  console.log(commits);
  const output=`<ul>${commits.map(c=>"<li>"+c.author.login+", ("+c.commit.author.name+"): "+c.commit.message+" - <a href='#' data-author='"+"' onclick='getCommits(this)'>Get Commits</a></li>").join("")}</ul>`;
  dest.innerHTML=output;
}

function getBranches(el){
  const repoName=el.dataset.repository;
  const userName=el.dataset.username;
  const req=new XMLHttpRequest();
  req.addEventListener("load",displayCommits);
  req.open("GET","https://api.github.com/repos/"+userName+"/"+repoName+"/branches");
  req.send();
}

function displayBranches(){
  let dest=document.getElementById('details');
  const branches=JSON.parse(this.responseText);
  console.log(branches);
  const output=`<ul>${branches.map(b=>"<li>"+b.name+"</li>")}`;
  dest.innerHTML=output;
}


