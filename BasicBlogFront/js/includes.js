function includeCreatePost() {
    return `
    <div class="col-sm-12">
        <div class="form-group">
            <label for="title" class="text-white">Title</label>
            <textarea class="form-control cvalid bg-dark text-white" id="title" rows="3" name="title"></textarea>
            <small class="err text-primary" id="errtitle"></small>
        </div>    
        <div class="form-group">
            <label for="body" class="text-white">Description</label>
            <textarea class="form-control cvalid bg-dark text-white" id="body" rows="6" name="body"></textarea>
            <small class="err text-primary" id="errbody"></small>
        </div>

        <div class="form-group d-flex justify-content-end mt-2">
            <button class="btn btn-secondary mr-2" onclick="cancelPostCreate()">Cancel</button>
            <button class="btn btn-success" id="submitPostBtn" onclick="submitPost()">Submit</button>
        </div>
    </div>
    `;
}

function includeAppendPost(post) {
    return `
    <div class="col-md-12">
    <div class="card shadow mb-3 rounded bg-dark">
        <div class="card-body pb-3">

            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    
                    <div class="ml-2">
                        <div class="h6 m-0 text-success font-weight-bold" >${post.user.name} <span class="bg-default text-white">@${post.user.username}</span></div>
                        <div class="h8 text-muted"></div>
                    </div>
                </div>
                <div>
                    ${post.postTime}
                </div>
            </div>
            
            <p class="card-title text-white p-3 mt-2 rounded">
                ${post.postTitle}
            </p>
            
            <div class="d-flex justify-content-end align-items-center">
                <div>
                    <a href="/#posts/${post.postId}"class="btn bg-warning text-white btn-sm">
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
}

function includeShowPost(post) {
    let ownerButtons = '';
    const loggedUser = atob(getCookie()).split(':')[0];
    //console.log(loggedUser);
    if (loggedUser == _post.user.username) {
        ownerButtons =
            `
        <div>
            <button class="btn btn-sm btn-transparent shadow-none text-info font-weight-bold text-uppercase" onclick="editPost()">
                Edit
            </button>
            <button class="btn btn-sm btn-transparent shadow-none text-warning font-weight-bold text-uppercase" id="deletePost" onclick="deletePost()">
                Delete
            </button>
        </div>
        `;
    }


    const str =
        `
        <div class="card shadow mb-3 rounded bg-dark">
            <div class="card-body pb-3 border-bottom border-success rounded">

                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        
                        <div class="ml-2">
                            <div class="h6 m-0 text-success font-weight-bold" >${post.user.name} <span class="bg-default text-white">@${post.user.username}</span></div>
                            <div class="h8 text-muted"></div>
                        </div>
                    </div>
                    <div>
                        ${post.postTime}
                    </div>
                </div>
                <p class="card-title p-3 mt-2 rounded text-white font-weight-bold border border-white">
                    ${post.postTitle}
                </p>
                <p class="card-title p-3 mt-2 rounded text-white">
                    ${post.postBody}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-white shadow-none">
                    </button>
                    ${ownerButtons}
                </div>
            </div>
        </div>
    `;
    return str;
}

function includeCreateCommentSection() {
    const str =
        `
    <div class="card bg-transparent">
        <div class="form-group">
            <label for="comment-body" class="text-white">Create Comment</label>
            <textarea class="form-control cvalid bg-dark text-white" id="comment-body" rows="6" placeholder="type your comment here..."></textarea>
            <small class="err text-primary" id="errcommentbody"></small>
        </div>

        <div class="form-group d-flex justify-content-end">
            <button class="btn btn-secondary mr-2 reset" onclick="clearCommentCreate()">Clear</button>
            <button class="btn btn-success" id="submitCommentBtn" onclick="submitComment()">Submit</button>
        </div>
    </div>
`;
    return str;
}

function includeAppendComment(comment) {
    let ownerButtons = '';
    const loggedUser = atob(getCookie()).split(':')[0];
    console.log(loggedUser);
    if (loggedUser == comment.user.username) {
        ownerButtons =
            `
        <div>
            <button class="btn btn-sm btn-transparent shadow-none text-info font-weight-bold text-uppercase" onclick="editComment(this,${comment.commentId})">
                Edit
            </button>
            <button class="btn btn-sm btn-transparent shadow-none text-warning font-weight-bold text-uppercase" id="deleteComment" onclick="deleteComment(this,${comment.commentId})">
                Delete
            </button>
        </div>
        `;
    }
    const str =
        `
            <div class="card mb-3 rounded bg-default comment-parent">
                <div class="card-body pb-3">

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            
                            <div class="ml-2">
                                <div class="h6 m-0 text-success font-weight-bold" >${comment.user.name} <span class="bg-default text-white">@${comment.user.username}</span></div>
                                <div class="h8 text-muted"></div>
                            </div>
                        </div>
                        <div>
                            ${comment.commentTime}
                        </div>
                    </div>



                    <p class="card-title p-3 mt-2 rounded text-white">
                        ${comment.commentBody}
                    </p>
                    <div class="d-flex justify-content-end align-items-center">
                        ${ownerButtons}
                    </div>
                </div>
            </div>
    `;
    return str;

}

function includeEditPost(post) {
    const str =
        `
        <div class="form-group">
            <label for="title" class="text-white">Title</label>
            <textarea class="form-control cvalid bg-dark text-white" id="title" rows="3" name="title">${post.postTitle}</textarea>
            <small class="err text-primary" id="errtitle"></small>
        </div>    
        <div class="form-group">
            <label for="body" class="text-white">Description</label>
            <textarea class="form-control cvalid bg-dark text-white" id="body" rows="6" name="body">${post.postBody}</textarea>
            <small class="err text-primary" id="errbody"></small>
        </div>

        <div class="form-group d-flex justify-content-end mt-2">
            <button class="btn btn-secondary mr-2" onclick="cancelPostUpdate()">Cancel</button>
            <button class="btn btn-success" id="updatePostBtn" onclick="submitUpdatedPost()">Update</button>
        </div>
    `;
    return str;
}


function includeSetupCommentUpdate(comment) {
    const str =
        `
        <div class="card bg-transparent">
            <div class="form-group">
                <label for="update-comment-body" class="text-white">Create Comment</label>
                <textarea class="form-control cvalid bg-dark text-white" id="update-comment-body" rows="6">${comment.commentBody}</textarea>
                <small class="err text-primary" id="errupcommentbody"></small>
            </div>

            <div class="form-group d-flex justify-content-end">
                <button class="btn btn-secondary mr-2 reset" onclick="cancelCommentUpdate()">Cancel</button>
                <button class="btn btn-success" id="updateCommentBtn" onclick="updateComment(${comment.commentId})">Update</button>
            </div>
        </div>
    `;
    return str;
}

function includeReplaceComment(comment) {
    const str =
        `
    <div class="card-body pb-3">

        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
                
                <div class="ml-2">
                    <div class="h6 m-0 text-success font-weight-bold" >${comment.user.name} <span class="bg-default text-white">@${comment.user.username}</span></div>
                    <div class="h8 text-muted"></div>
                </div>
            </div>
            <div>
                ${comment.commentTime}
            </div>
        </div>
        <p class="card-title p-3 mt-2 rounded text-white">
            ${comment.commentBody}
        </p>
        <div class="d-flex justify-content-end align-items-center">
            <div>
                <button class="btn btn-sm btn-transparent shadow-none text-info font-weight-bold text-uppercase" onclick="editComment(this,${comment.commentId})">
                    Edit
                </button>
                <button class="btn btn-sm btn-transparent shadow-none text-warning font-weight-bold text-uppercase" id="deleteComment" onclick="deleteComment(this,${comment.commentId})">
                    Delete
                </button>
            </div>
        </div>
    </div>
    `;
    return str;
}

function includeLoginForm() {
    const str =
        `
        <div class="col-md-12">
        <div class="login-form">
    <div>
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required" id="username-input">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" id="password-input">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" onclick="loginSubmit()">Log in</button>
        </div>       
    </div>
    <p class="text-center"><a href="#register">Create an Account</a></p>
    </div>
        </div>
    
    `;
    return str;
}

function includeRegForm() {
    const str =
        `
        <div class="col-md-12">
        <div class="login-form">
    <div>
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required" id="username-input">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" required="required" id="name-input">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required" id="password-input">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" onclick="registerSubmit()">Log in</button>
        </div>       
    </div>
    <p class="text-center"><a href="#register">Create an Account</a></p>
    </div>
        </div>
    
    `;
    return str;
}