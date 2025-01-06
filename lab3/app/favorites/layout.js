export default function FavoritesLayout({ children }) {
    return (
      <div id="favorites">
        <h1>Twoje ulubione Pokémony!</h1>
        <section>{children}</section>
      </div>
    );
  }
  