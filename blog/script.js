document.addEventListener('DOMContentLoaded', function() {
    // Load Blog Posts
    if (document.getElementById('blog-posts')) {
        fetch('posts.json')
            .then(response => response.json())
            .then(data => {
                const blogPosts = document.getElementById('blog-posts');
                data.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                        <h2><a href="${post.link}">${post.title}</a></h2>
                        <p><em>${post.date}</em></p>
                        <p>${post.excerpt}</p>
                    `;
                    blogPosts.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error loading posts:', error));
    }
});
