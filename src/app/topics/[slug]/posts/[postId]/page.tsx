export default function PostsShowPage({
  params,
}: {
  params: { slug: string; postId: string };
}) {
  return (
    <div>
      <h1>PostsShowPage</h1>
      <p>Slug: {params.slug}</p>
      <p>PostId: {params.postId}</p>
    </div>
  );
}
