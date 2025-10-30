/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface Incident {
  id: string;
  status: string;
  severity: string;
  createdAt: string;
}

export default function Dashboard() {
  const [incidentCount, setIncidentCount] = useState<number>(0);
  const [criticalCount, setCriticalCount] = useState<number>(0);
  const [avgResponse, setAvgResponse] = useState<number>(83.34);

  useEffect(() => {
    const fetchIncidents = async () => {
      const snapshot = await getDocs(collection(db, "incidents"));
      const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Incident[];

      setIncidentCount(all.length);
      setCriticalCount(all.filter((i) => i.severity === "Critical").length);
    };

    fetchIncidents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Incidents</p>
          <h2 className="text-2xl font-semibold">{incidentCount}</h2>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Critical Incidents</p>
          <h2 className="text-2xl font-semibold text-red-600">{criticalCount}</h2>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Avg. Initial Response</p>
          <h2 className="text-2xl font-semibold">{avgResponse.toFixed(2)}h</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Welcome to C&C IT Incident Dashboard</h2>
        <p className="text-gray-600 text-sm">
          Here you can manage and track all critical incidents in real-time. Use the sidebar to
          view incidents by category (Active, Resolved, Critical, etc.), check response metrics,
          and review logs.
        </p>
      </div>
    </div>
  );
}
