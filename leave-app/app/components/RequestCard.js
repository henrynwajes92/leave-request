export default function RequestCard({ req, onUpdate }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <p className="font-bold">{req.name}</p>
      <p>{req.reason}</p>
      <p className="text-sm">Status: {req.status || 'Pending'}</p>

      <div className="mt-2 flex gap-2">
        <button onClick={() => onUpdate(req._id, 'approved')}
          className="bg-green-500 text-white px-2 rounded">Approve</button>

        <button onClick={() => onUpdate(req._id, 'rejected')}
          className="bg-red-500 text-white px-2 rounded">Reject</button>
      </div>
    </div>
  );
}