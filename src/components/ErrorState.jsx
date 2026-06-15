import { AlertCircle, X } from 'lucide-react';

function ErrorState({ message, onDismiss }) {
  return (
    <div className="error-state" role="alert">
      <AlertCircle size={18} aria-hidden="true" />
      <p>{message}</p>
      <button type="button" onClick={onDismiss} aria-label="Dismiss error" title="Dismiss error">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default ErrorState;
