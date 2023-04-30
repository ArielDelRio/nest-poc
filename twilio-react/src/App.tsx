import { CSSProperties } from 'react';

const styles = {
  title: {
    textAlign: 'center',
    width: '100vw',
  } as CSSProperties,
};

function App() {
  return (
    <>
      <h1 style={styles.title}>Twilio App React</h1>
    </>
  );
}

export default App;
