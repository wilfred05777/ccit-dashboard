import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

interface Incident {
  id: string;
  incidentNumber: string;
  title: string;
  status: string;
  severity: string;
  createdAt: string;
}

export default function Critical() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const snapshot = await getDocs(collection(db, "incidents"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Incident[];
      setIncidents(list);
    };
    fetchIncidents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">⚠️ Critical Incidents</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Critical Incidents</p>
          <h2 className="text-2xl font-semibold">{incidents.length}</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Unviewed Incidents</p>
          <h2 className="text-2xl font-semibold">0</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Avg. Initial Response</p>
          <h2 className="text-2xl font-semibold">83.34h</h2>
        </div>
      </div>

      <table className="w-full bg-white rounded-xl shadow text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-2 text-left">Incident #</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Severity</th>
            <th className="p-2 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc) => (
            <tr key={inc.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{inc.incidentNumber}</td>
              <td className="p-2">{inc.title}</td>
              <td className="p-2">{inc.status}</td>
              <td className="p-2">{inc.severity}</td>
              <td className="p-2">{new Date(inc.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {incidents.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-400" colSpan={5}>
                No critical incidents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
