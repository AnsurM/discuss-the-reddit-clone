export default function TopicShowPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Topic Show</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
