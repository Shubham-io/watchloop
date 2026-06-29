interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="py-20 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
