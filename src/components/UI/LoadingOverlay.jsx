function LoadingOverlay({ message }) {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      {console.log('inside loading overlay')}
      <p style={{ fontSize: 30, marginBottom: 12 }}>{message}</p>
    </div>
  );
}

export default LoadingOverlay;