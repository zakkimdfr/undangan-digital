import Content from "@/components/Content";

export default function GuestPage({ params }: { params: { slug: string } }) {
  const guestName = decodeURIComponent(params.slug.replace(/-/g, " "));
  return <Content guestName={guestName} />;
}
