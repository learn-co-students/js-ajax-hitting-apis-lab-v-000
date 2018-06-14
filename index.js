function getRepositories() {
    const xhr = new XMLHttpRequest();
    const username = document.getElementById("username").value;
    console.log(`https://api.github.com/users/${username}/repos`);
    xhr.addEventListener("load", showRepositories)
    xhr.open(`GET`, `https://api.github.com/users/${username}/repos`);
    xhr.send();
    // return false => Prevents the default behavior
    return false;
}

function showRepositories(event, data) {
    const jsonRepo = JSON.parse(this.responseText);
    const repoList = `<ul>${jsonRepo.map( r => "<li>"+r.name+"</li>").join('')}</ul>`;
    document.getElementById("repositories").innerHTML = repoList
}