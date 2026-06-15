function LoadingState() {
  return (
    <div className="loading-state" aria-label="Loading tasks">
      {[1, 2, 3].map((item) => (
        <div className="task-skeleton" key={item}>
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
