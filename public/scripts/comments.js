const loadCommentsBtnelement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentFormElement = document.querySelector("#comments-form form");
const commentTitlteElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createList(comments) {
  const commentsList = document.createElement("ol");
  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
        <article class="comment-item">
  <h2>${comment.title}</h2>
  <p>${comment.text}</p>
</article>
`;
    commentsList.appendChild(commentElement);
  }
  return commentsList;
}

async function fetchCommentsList() {
  const postId = loadCommentsBtnelement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  const commentsList = createList(responseData);
  commentsSectionElement.innerHTML = "";
  commentsSectionElement.appendChild(commentsList);
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentFormElement.dataset.postid;
  const enteredText = commentTextElement.value;
  const enteredTitlte = commentTitlteElement.value;
  const comment = { title: enteredTitlte, text: enteredText };
  await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  fetchCommentsList();
}

loadCommentsBtnelement.addEventListener("click", fetchCommentsList);
commentFormElement.addEventListener("submit", saveComment);
