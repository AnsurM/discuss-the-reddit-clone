const paths = {
  home() {
    return "/";
  },
  topicsShow(slug: string) {
    return `/topics/${slug}`;
  },
  postsShow(slug: string) {
    return `${this.topicsShow(slug)}/posts`;
  },
  postShow(slug: string, postId: string) {
    return `${this.topicsShow(slug)}/posts/${postId}`;
  },
  postNew(slug: string) {
    return `${this.topicsShow(slug)}/posts/new`;
  },
};

export default paths;
