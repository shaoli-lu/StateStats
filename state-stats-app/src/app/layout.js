import './globals.css';

export const metadata = {
  title: 'State Stats — Explore All 50 U.S. States',
  description: 'An interactive, fun way to learn everything about all 50 U.S. states — flags, capitals, birds, flowers, population, quizzes, and more!',
  keywords: 'US states, state facts, quiz, education, geography, population, capital',
  openGraph: {
    title: 'State Stats — Explore All 50 U.S. States',
    description: 'Learn state facts with interactive slideshows, rankings, and spin-the-wheel quizzes!',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
