export default function SummaryCards({ requests }) {
  const approved = requests.filter(r => r.status === 'approved').length;
  const rejected = requests.filter(r => r.status === 'rejected').length;
  const pending = requests.length - approved - rejected;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="card bg-blue-100">Pending: {pending}</div>
      <div className="card bg-green-100">Approved: {approved}</div>
      <div className="card bg-red-100">Rejected: {rejected}</div>
    </div>
  );
}