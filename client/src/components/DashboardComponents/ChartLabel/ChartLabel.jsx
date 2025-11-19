export default function ChartLabel({ heading = "Add Label Here", className="" }) {
  return (
    <div className={`mb-3 ${className}`}>
      <h5 className="fw-bold text-dark">{heading}</h5>
    </div>
  );
}   