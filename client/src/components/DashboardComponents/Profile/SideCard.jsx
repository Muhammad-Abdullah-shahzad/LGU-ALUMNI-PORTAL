export default function SideCard({ data = {} }) {
  return (
    <>
      <div className="card shadow-sm p-3 rounded border-0">


        <ul className="list-group list-group-flush ">
          {Object.entries(data).map(([key, value]) => (
            <li
              key={key}
              className="list-group-item d-flex justify-content-between align-items-center text-success"
            >
              <span className="text-capitalize fw-semibold">{key}</span>
              <span className="text-muted">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}