export default function Coffins({
  coffins,
  selectedCoffins,
}: {
  coffins: (string | number)[];
  selectedCoffins: number[];
}) {
  return (
    <ul>
      {coffins.map((player, idx) => (
        <li
          key={`${player}-${idx + 1}`}
          style={{ background: selectedCoffins.findIndex((v) => v === idx) >= 0 ? 'red' : 'white' }}
        >
          <p>{player}</p>
        </li>
      ))}
    </ul>
  );
}
