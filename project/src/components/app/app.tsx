import RenderingMainPage from '../main/main';

type AppPageProps = {
  settingMovie: {
    title: string,
    genre: string,
    releaseDate: number
  }
}

function App({settingMovie}: AppPageProps): JSX.Element {
  return (
    <RenderingMainPage title={settingMovie.title} genre={settingMovie.genre} releaseDate={settingMovie.releaseDate} />
  );
}

export default App;
