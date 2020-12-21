let _post = null;
let postUpdateOp = false;

function createPost() {
    window.location.hash = "create-post";
    $('#create-post-section').html(includeCreatePost());
}

function cancelPostCreate() {
    window.history.back();
}

function isInvalidPost(_postTitle, _postBody) {
    let prob = false;
    $('#errtitle').html("");
    $('#errbody').html("");

    if (_postTitle.length < 4) {
        $('#errtitle').html("Please Provide a Post Title of at least 4 characters long");
        prob = true;
    } else if (_postTitle.length > 200) {
        $('#errtitle').html("Post Title can not be more than 200 characters");
        prob = true;
    }
    if (_postBody.length < 10) {
        $('#errbody').html("Please Provide a Post Description of at least 10 characters long");
        prob = true;
    }
    return prob;
}

function submitPost() {
    const _postTitle = $('#title').val().trim();
    const _postBody = $('#body').val().trim();

    if (isInvalidPost(_postTitle, _postBody)) {
        return;
    }
    const token = "Basic " + getCookie();
    $.ajax({
        url: "http://localhost:5571/posts/",
        method: "POST",
        headers: {
            Authorization: token,
        },
        header: "Content-Type:application/json",
        data: {
            postTitle: _postTitle,
            postBody: _postBody,
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                const data = xmlhttp.responseJSON;
                window.location.hash = "#posts/" + data.postId;
            }
            else if (xmlhttp.status == 400) {

                const data = xmlhttp.responseJSON;
                Object.keys(data.modelState).forEach(function (key, index) {
                    for (const p of data.modelState[key]) {
                        alert(p);
                    }
                });
                console.error(xmlhttp.status);
            } else {
                console.error(xmlhttp.status);
            }
        }
    });
}


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


function appendPost(post) {
    $('#posts-section').append(includeAppendPost(post));
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

    loadComments(post.postId);

    $('#post').html(includeShowPost(post));

    $('#create-comment-section').html(includeCreateCommentSection);

}


function editPost() {
    //$('#comments').html('');
    $('#post').css("display", "none");
    console.log(_post);

    $('#edit-post-section').html(includeEditPost(_post));
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
                else if (xmlhttp.status == 400) {

                    const data = xmlhttp.responseJSON;
                    Object.keys(data.modelState).forEach(function (key, index) {
                        for (const p of data.modelState[key]) {
                            alert(p);
                        }
                    });
                    console.error(xmlhttp.status);
                } else {
                    console.error(xmlhttp.status);
                }
            }
        });
        console.log('9');
    }
}

function submitUpdatedPost() {
    const _postTitle = $('#title').val().trim();
    const _postBody = $('#body').val().trim();

    if (isInvalidPost(_postTitle, _postBody)) {
        return;
    }

    $.ajax({
        url: "http://localhost:5571/posts/" + _post.postId,
        method: "PUT",
        headers: {
            Authorization: "Basic " + getCookie()
        },
        header: "Content-Type:application/json",
        data: {
            postTitle: _postTitle,
            postBody: _postBody,
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
            else if (xmlhttp.status == 400) {

                const data = xmlhttp.responseJSON;
                Object.keys(data.modelState).forEach(function (key, index) {
                    for (const p of data.modelState[key]) {
                        alert(p);
                    }
                });
                console.error(xmlhttp.status);
            } else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function cancelPostUpdate() {
    console.log("Cancel");
    $('#post').css("display", "block");
    $('#edit-post-section').html('');
}


function isInvalidComment(_commentBody,) {
    let prob = false;
    $('#errcommentbody').html("");

    if (_commentBody.length < 1) {
        $('#errcommentbody').html("Please Provide a Post Title of at least 1 characters long");
        prob = true;
    }
    return prob;
}


function submitComment() {
    const _commentBody = $('#comment-body').val().trim();

    if (isInvalidComment(_commentBody)) {
        return;
    }

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
            commentBody: _commentBody,
            postId: _post.postId,
        },
        complete: function (xmlhttp, status) {
            console.log(status);
            if (xmlhttp.status == 201) {
                const data = xmlhttp.responseJSON;
                $('#comment-body').val('');
                appendComment(data);
            }
            else if (xmlhttp.status == 400) {

                const data = xmlhttp.responseJSON;
                Object.keys(data.modelState).forEach(function (key, index) {
                    for (const p of data.modelState[key]) {
                        alert(p);
                    }
                });
                console.error(xmlhttp.status);
            } else {
                console.error(xmlhttp.status);
            }
        }
    });
}



let commentParentDiv = null;
let innerCommentParentDiv = null;

function clearCommentCreate() {
    $('#comment-body').val('');
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

                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    appendComment(data[i]);
                }

                //$("#categoryList tbody").html(str);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function appendComment(comment) {
    $('#comments').append(includeAppendComment(comment));
}

function editComment(that, commentId) {
    commentParentDiv = that.parentNode.parentNode.parentNode.parentNode;
    innerCommentParentDiv = commentParentDiv.innerHTML;


    $.ajax({
        url: "http://localhost:5571/posts/" + _post.postId + "/comments/" + commentId,
        method: "GET",
        headers: {
            Authorization: "Basic " + getCookie()
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseJSON;
                setupCommentUpdate(data);
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function setupCommentUpdate(comment) {

    commentParentDiv.innerHTML = includeSetupCommentUpdate(comment);
    commentParentDiv.classList.remove("bg-default");
    commentParentDiv.classList.add("bg-transparent");
}


function cancelCommentUpdate() {
    commentParentDiv.innerHTML = innerCommentParentDiv;
    commentParentDiv.classList.remove("bg-transparent");
    commentParentDiv.classList.add("bg-default");
    commentParentDiv = null;
    innerCommentParentDiv = null;
}


function updateComment(commentId) {
    const _commentBody = $('#update-comment-body').val().trim();

    let prob = false;
    $('#errupcommentbody').html("");

    if (_commentBody.length < 1) {
        $('#errupcommentbody').html("Please Provide a Post Title of at least 1 characters long");
        prob = true;
    }
    if (prob) {
        return;
    }

    $.ajax({
        url: "http://localhost:5571/posts/" + _post.postId + "/comments/" + commentId,
        method: "PUT",
        headers: {
            Authorization: "Basic " + getCookie()
        },
        data: {
            commentBody: _commentBody,
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 200) {
                const data = xmlhttp.responseJSON;
                replaceComment(data);
            }
            else if (xmlhttp.status == 400) {

                const data = xmlhttp.responseJSON;
                Object.keys(data.modelState).forEach(function (key, index) {
                    for (const p of data.modelState[key]) {
                        alert(p);
                    }
                });
                console.error(xmlhttp.status);
            } else {
                console.error(xmlhttp.status);
            }
        }
    });
}

function replaceComment(comment) {
    commentParentDiv.innerHTML = includeReplaceComment(comment);
    commentParentDiv.classList.remove("bg-transparent");
    commentParentDiv.classList.add("bg-default");
    commentParentDiv = null;
    innerCommentParentDiv = null;
}

function deleteComment(that, commentId) {
    xcommentParentDiv = that.parentNode.parentNode.parentNode.parentNode;
    console.log(commentParentDiv);
    if (confirm("Are you sure to delete?")) {
        $.ajax({
            url: "http://localhost:5571/posts/" + _post.postId + "/comments/" + commentId,
            method: "DELETE",
            headers: {
                Authorization: "Basic " + getCookie()
            },
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 204) {
                    xcommentParentDiv.style.display = "none";
                    commentParentDiv = null;
                }
                else {
                    $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText);
                }
            }
        });
    }
    commentParentDiv = null;
}



function loginSubmit() {
    const username = $('#username-input').val().trim();
    const password = $('#password-input').val().trim();

    $.ajax({
        url: "http://localhost:5571/users/login",
        method: "POST",
        data: {
            username: username,
            password: password
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 204) {
                alert("No Records Found");
            }
            else if (xmlhttp.status == 200) {
                console.log(username + ":" + password);
                const base64 = btoa(username + ":" + password);
                setCookie(base64, 1);
                window.location.hash = "posts";
            }
            else {
                console.error(xmlhttp.status);
            }
        }
    });

}

function registerSubmit() {
    const username = $('#username-input').val().trim();
    const name = $('#name-input').val().trim();
    const password = $('#password-input').val().trim();

    $.ajax({
        url: "http://localhost:5571/users/register",
        method: "POST",
        data: {
            username: username,
            name: name,
            password: password
        },
        complete: function (xmlhttp, status) {
            if (xmlhttp.status == 201) {
                console.log(username + ":" + password);
                const base64 = btoa(username + ":" + password);
                setCookie(base64, 1);
                window.location.hash = "posts";
            }
            else {
                alert("something went wrong");
                console.error(xmlhttp.status);
            }
        }
    });

}