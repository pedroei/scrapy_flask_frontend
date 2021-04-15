import spinner from './spinner.gif';

const Loading = () => {
  return (
    <>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </>
  );
};

export default Loading;
