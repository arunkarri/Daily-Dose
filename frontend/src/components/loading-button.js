const LoadingButton = () => (
    <button className="btn btn-orange btn-block" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;
      <span className="visually-hidden">Loading...</span>
    </button>
  );
  
  export default LoadingButton;