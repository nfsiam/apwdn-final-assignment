let _post = null;
let postUpdateOp = false;



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
            $('#login-form').html(str);
        } else if (loc == "#registration") {

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

function createPost() {
    //e.preventDefault();
    window.location.hash = "create-post";
    const str =
        `
    <div class="col-sm-12">
        <div class="form-group">
            <label for="title">Title</label>
            <textarea class="form-control cvalid" id="title" rows="3" name="title"></textarea>
            <small class="form-text text-muted">
                A short description or title, not more than 300 characters
            </small>
            <small class="err" id="errtitle"></small>
        </div>    
        <div class="form-group">
            <label for="body">Description</label>
            <textarea class="form-control cvalid" id="body" rows="6" name="body"></textarea>
            <small class="err" id="errbody"></small>
        </div>

        <div class="form-group d-flex justify-content-end mt-2">
            <button class="btn btn-secondary mr-2" onclick="cancelPostUpdate()">Cancel</button>
            <button class="btn btn-success" id="submitPostBtn" onclick="submitPost()">Submit</button>
        </div>
    </div>
    `;
    $('#create-post-section').html(str);
}

function submitPost() {
    const token = "Basic " + getCookie();
    $.ajax({
        url: "http://localhost:5571/posts/",
        method: "POST",
        headers: {
            Authorization: token,
        },
        header: "Content-Type:application/json",
        data: {
            postTitle: $('#title').val(),
            postBody: $('#body').val(),
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                const data = xmlhttp.responseJSON;
                window.location.hash = "#posts/" + data.postId;

                //$("#edit-post-section").html('');
            }
            else {
                $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
            }
        }
    });
}

// $('#home').click(function (e) {
//     e.preventDefault();
//     window.location.hash = "posts";
// })

// $('#create-post').click(function (e) {
//     e.preventDefault();
//     $('#post').html('');
//     $('#posts-section').html('');
//     $('#edit-post-section').html('');
//     $('#comments').html('');
//     window.location.hash = "create-post";

//     const str =
//         `
//         <div class="col-sm-12">
//             <div class="form-group">
//                 <label for="title">Title</label>
//                 <textarea class="form-control cvalid" id="title" rows="3" name="title"></textarea>
//                 <small class="form-text text-muted">
//                     A short description or title, not more than 300 characters
//                 </small>
//                 <small class="err" id="errtitle"></small>
//             </div>    
//             <div class="form-group">
//                 <label for="body">Description</label>
//                 <textarea class="form-control cvalid" id="body" rows="6" name="body"></textarea>
//                 <small class="err" id="errbody"></small>
//             </div>

//             <div class="form-group d-flex justify-content-end mt-2">
//                 <button class="btn btn-secondary mr-2" onclick="cancelPostUpdate()">Cancel</button>
//                 <button class="btn btn-success" id="updatePostBtn" onclick="submitUpdatedPost()">Update</button>
//             </div>
//         </div>
//         `;
//     $('#create-post-section').html(str);
// });

function loadPosts() {
    $.ajax({
        url: "http://localhost:5571/posts",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie().toString()
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseJSON;

                var str = '';
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    appendPost(data[i]);
                }

                $("#categoryList tbody").html(str);
            }
            else {
                $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
            }
        }
    });
}

//loadPosts();


function appendPost(post) {
    const str =
        `
        <div class="col-md-12">
        <div class="card shadow mb-3 rounded bg-dark">
            <div class="card-body pb-3">

                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="mr-2">
                            <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                        </div>
                        <div class="ml-2">
                            <div class="h7 m-0">${post.user.username}</div>
                            <div class="h8 text-muted">${post.user.name}</div>
                        </div>
                    </div>
                    <div>
                        ${post.postTime}
                    </div>
                </div>
                <hr>
                <p class="card-title text-white bg-dark p-3 mt-2 rounded">
                    ${post.postTitle}
                </p>
                <p class="card-title p-3 mt-2 rounded">
                    ${post.postBody}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-white shadow-none">
                        @comments
                    </button>
                    
                    <div>
                        <a href="/#posts/${post.postId}"class="btn bg-white text-primary-100 btn-sm">
                            <span class="text">view</span>
                            <span class="icon text-primary">
                                <i class="fas fa-arrow-right"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;
    $('#posts-section').append(str);
}



function goToPost(postId) {
    console.log(postId);
    $.ajax({
        url: "http://localhost:5571/posts/" + postId,
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie()
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseJSON;
                console.log(data);
                showPost(data);
            }
            else {
                $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
            }
        }
    });

}

function showPost(post) {
    _post = post;
    $('#posts-section').html('');
    $('#create-post-section').html('');
    $('#comments').html('');
    $('#post').css("display", "block");


    const str =
        `
        <div class="card shadow mb-3 rounded bg-dark">
            <div class="card-body pb-3">

                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="mr-2">
                            <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                        </div>
                        <div class="ml-2">
                            <div class="h7 m-0">${post.user.username}</div>
                            <div class="h8 text-muted">${post.user.name}</div>
                        </div>
                    </div>
                    <div>
                        ${post.postTime}
                    </div>
                </div>
                <hr>
                <p class="card-title p-3 mt-2 rounded text-white">
                    ${post.postTitle}
                </p>
                <p class="card-title p-3 mt-2 rounded">
                    ${post.postBody}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-white shadow-none">
                    </button>
                    
                    <div>
                        <button class="btn btn-white shadow-none" onclick="editPost()">
                            Edit
                        </button>
                        <button class="btn btn-white shadow-none" id="deletePost" onclick="deletePost()">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    // if (postUpdateOp) {

    // }
    // else {
    //     postUpdateOp = false;
    // }
    loadComments(post.postId);
    $('#post').html(str);
    const str2 =
        `
        <div class="card bg-transparent">
            <div class="form-group">
                <label for="comment-body">Description</label>
                <textarea class="form-control cvalid" id="comment-body" rows="6"></textarea>
                <small class="err" id="commentBody"></small>
            </div>

            <div class="form-group d-flex justify-content-end">
                <button class="btn btn-secondary mr-2 reset">Clear</button>
                <button class="btn btn-success" id="submitCommentBtn" onclick="submitComment()">Submit</button>
            </div>
        </div>
    `;
    $('#create-comment-section').html(str2);

}


function loadComments(postId) {
    $('#comments').html();
    $.ajax({
        url: "http://localhost:5571/posts/" + postId + "/comments",
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie()
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseJSON;

                var str = '';
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    appendComment(data[i]);
                }

                //$("#categoryList tbody").html(str);
            }
            else {
                $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
            }
        }
    });
}

function appendComment(comment) {
    const str =
        `
            <div class="card mb-3 rounded bg-default">
                <div class="card-body pb-3">

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                            </div>
                            <div class="ml-2">
                                <div class="h7 m-0">${comment.user.username}</div>
                                <div class="h8 text-muted">${comment.user.name}</div>
                            </div>
                        </div>
                        <div>
                            ${comment.commentTime}
                        </div>
                    </div>
                    <p class="card-title p-3 mt-2 rounded text-white">
                        ${comment.commentBody}
                    </p>
                </div>
            </div>
    `;

    $('#comments').append(str);
}


function editPost() {
    //$('#comments').html('');
    $('#post').css("display", "none");
    console.log(_post);
    const str =
        `
    <div class="col-sm-12">
        <div class="form-group">
            <label for="title">Title</label>
            <textarea class="form-control cvalid" id="title" rows="3" name="title">${_post.postTitle}</textarea>
            <small class="form-text text-muted">
                A short description or title, not more than 300 characters
            </small>
            <small class="err" id="errtitle"></small>
        </div>    
        <div class="form-group">
            <label for="body">Description</label>
            <textarea class="form-control cvalid" id="body" rows="6" name="body">${_post.postBody}</textarea>
            <small class="err" id="errbody"></small>
        </div>

        <div class="form-group d-flex justify-content-end mt-2">
            <button class="btn btn-secondary mr-2" onclick="cancelPostUpdate()">Cancel</button>
            <button class="btn btn-success" id="updatePostBtn" onclick="submitUpdatedPost()">Update</button>
        </div>
    </div>
    `;
    $('#edit-post-section').html(str);
}

function submitUpdatedPost() {

    $.ajax({
        url: "http://localhost:5571/posts/" + _post.postId,
        method: "PUT",
        headers: {
            Authorization: "Basic " + getCookie()
        },
        header: "Content-Type:application/json",
        data: {
            postTitle: $('#title').val(),
            postBody: $('#body').val(),
            postTime: _post.postTime,
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseJSON;
                console.log(data);
                _post.postTitle = data.postTitle;
                _post.postBody = data.postBody;
                postUpdateOp = true;
                showPost(_post);
                $("#edit-post-section").html('');
            }
            else {
                $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
            }
        }
    });

}

function cancelPostUpdate() {
    console.log("Cancel");
    $('#post').css("display", "block");
    $('#edit-post-section').html('');
}

function deletePost() {
    if (confirm("Are you Sure?")) {
        $.ajax({
            url: "http://localhost:5571/posts/" + _post.postId,
            method: "DELETE",
            headers: {
                Authorization: "Basic " + getCookie()
            },
            header: "Content-Type:application/json",
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 204) {
                    window.location.hash = "posts"
                }
                else {
                    $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
                }
            }
        });
        console.log('9');
    }
}


function submitComment() {
    console.log(999);
    const token = "Basic " + getCookie();
    console.log(token);
    $.ajax({
        url: "http://localhost:5571/posts/" + _post.postId + "/comments",
        method: "POST",
        headers: {
            Authorization: token,
        },
        header: "Content-Type:application/json",
        data: {
            commentBody: $('#comment-body').val(),
            postId: _post.postId,
        },
        complete: function (xmlhttp, status) {
            console.log(status);
            if (xmlhttp.status == 201) {
                const data = xmlhttp.responseJSON;
                data.user = _post.user;
                $('#comment-body').val('');
                appendComment(data);
            }
            else {
                $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
            }
        }
    });
}

function loginSubmit() {
    const username = $('#username-input').val().trim();
    const password = $('#password-input').val().trim();
    console.log(username + ":" + password);
    const base64 = btoa(username + ":" + password);
    setCookie(base64, 1);
    window.location.hash = "posts";
}