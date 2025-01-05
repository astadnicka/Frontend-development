import Navigation from "./components/Navigation";
import './styles/style.css';


export const metadata = {
  title: "Pokemon Finder",
  description: "Wyszukiwarka Pokemonów",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon</title>
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
