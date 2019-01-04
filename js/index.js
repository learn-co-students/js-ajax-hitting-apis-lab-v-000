// your code here

function getRepositories(){
    //take the username input from html form
    const username = document.getElementById('username').value;
    //setup XHR get request to api
    const req = new XMLHttpRequest();
    //listen for a loading of the xhr request then execute show function
    req.addEventListener('load', displayRepositories);

    req.open('GET', 'https://api.github.com/users/'+ username +'/repos');
    req.send();
}

function getCommits(el){
    const owner = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/'+ owner +'/'+repo+'/commits');
    req.send();
}

function getBranches(el){
    const owner = el.dataset.username;
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/'+ owner +'/'+repo+'/branches');
    req.send();
}

function displayRepositories(){
  //tell the interpreter its working with JSON by
    const repos = JSON.parse(this.responseText);
    //set to the XHW object that fired the event
    console.log(repos)
    //very important before <ul> below that is not an apostraphe ('), it is this (`) which is shift ~
    const repoList = `<ul>${repos.map(
                                      r =>
                                          '<li>' +
                                          //add repo name
                                          r.name +
                                          '<br> https://github.com/'+ r.owner.login + '/' + r.name +
                                      		'<br><a href="#" data-username="'+ r.owner.login + '"data-repository="' + r.name +'"onclick="getCommits(this)">GetCommits</a>' +
                                          //above code passes username and repository into a dataset this to be used in the function
                                          '<br><a href="#" data-username="'+ r.owner.login + '"data-repository="' + r.name +'"onclick="getBranches(this)">GetBranches</a></li>'
		                                 )
                      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}
function displayCommits(){
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => '<li><strong>'+commit.commit.author.name+' ('+commit.author.login+')</strong>'+commit.commit.message+'</li>')
                        .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList
}

function displayBranches(){
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches.map(branch => '<li>'+branch.name+'</li>')
                          .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList     
}
