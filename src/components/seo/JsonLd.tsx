type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown> | null> | null;
};

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  const payload = (Array.isArray(data) ? data : [data]).filter(
    (item): item is Record<string, unknown> => item !== null,
  );

  if (payload.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
