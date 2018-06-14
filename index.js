function getRepositories() {
    const xhr = new XMLHttpRequest();
    const username = document.getElementById("username").value;
    console.log(`https://api.github.com/users/${username}/repos`);
    xhr.addEventListener("load", displayRepositories)
    xhr.open(`GET`, `https://api.github.com/users/${username}/repos`);
    xhr.send();
    // return false => Prevents the default behavior
    return false;
}

function displayRepositories(event, data) {
    const jsonRepo = JSON.parse(this.responseText);
    console.log(jsonRepo)
    const repoList = `<ul>${jsonRepo.map( r=> '<li>' + r.name + 
                                                ' - <a href="' + r.html_url + '">' + r.html_url + '</a>' +
                                                ' - <a href="#" data-repo-name="' + r.name + '" data-owner-name="'+ r.owner.login + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;
    document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
    console.log(`el: ${el}`)
    const repoName = el.dataset.repoName;
    const owner = el.dataset.ownerName;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    req.open("GET", `https://api.github.com/repos/${owner}/${repoName}/commits`);
    req.send();
}

function displayCommits(event, data) {
    const jsonCommits = JSON.parse(this.responseText);
    console.log(jsonCommits);
    const commitList = `<ul>${jsonCommits.map( c => '<li>'+ c.author.login + '-' + c.commit.author.name + '-' + c.commit.message + '</li>').join("")}</ul>`;
    document.getElementById("details").innerHTML = commitList;


}