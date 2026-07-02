import { useEffect } from "react";

export default function Toast({ id, message, type, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 2500);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`toast toast-${type}`} onClick={() => onRemove(id)}>
      {message}
    </div>
  );
}
