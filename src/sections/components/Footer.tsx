export function Footer({
  buttons,
}: {
  buttons: {
    text: string;
    onclick: () => void;
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  }[];
}) {
  return (
    <>
      <div className="footer">
        {buttons.map((t) => (
          <button {...(t?.attributes ?? [])} onClick={t.onclick}>
            {t.text}
          </button>
        ))}
      </div>
    </>
  );
}
