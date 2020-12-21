$(window).on('hashchange', function (e) {
    $('#post').html('');
    $('#posts-section').html('');
    $('#edit-post-section').html('');
    $('#create-post-section').html('');
    $('#create-comment-section').html('');
    $('#comments').html('');
    $('#login-form').html('');
    route();
});

$(document).ready(function () {
    route();
});



function route() {
    const loc = window.location.hash;
    console.log(loc);
    if (getCookie() == "") {
        const loginstr =
            `
        <li class="nav-item" id="login-out">
            <a class="nav-link" href="#login">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#register">Register</a>
        </li>
        `;
        $('#login-out').html(loginstr);

        if (loc == "#login") {
            const str =
                `
                <input type="text" id="username-input">
                <input type="password" id="password-input">
                <button id="loginBtn" onclick="loginSubmit()">Login</button>
            `;
            $('#login-form').html(includeLoginForm());
        } else if (loc == "#register") {
            const str =
                `
                username <input type="text" id="username-input">
                <br>
                name <input type="text" id="name-input">
                <br>
                password <input type="password" id="password-input">
                <button id="registerBtn" onclick="registerSubmit()">Submit</button>
            `;
            $('#login-form').html(includeRegForm());
        }
        else {
            window.location.hash = "login";
        }
    }
    else if (getCookie() != "") {
        $('#login-out').html(`<li class="nav-item" id="login-out"><a class="nav-link" href="#logout">Logout</a></li>`);
        //window.location.hash = "posts";
        if (loc == '#create-post') {
            createPost();
        } else if (loc == '#posts') {
            loadPosts();
        } else if (loc.startsWith('#posts/')) {
            const parts = loc.slice(1).split('/');
            goToPost(parts[1]);
        } else if (loc == "#logout") {
            setCookie("", 0);
            window.location.hash = "login";
        } else {
            window.location.hash = "posts";
        }
    }
}