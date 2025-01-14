export default function PokemonDetailsLayout({ children }) {
  return (
    <div>
      {children}
      <nav id="footer">
        <a href="/pokemon">← Powrót do listy Pokemonów</a>
      </nav>
    </div>
  );
}
