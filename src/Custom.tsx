import type { SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { service } from "./types/services";
import CreateResrvation from "./Forms/Create_Reservation/CreateResrvation";
import EditeReservation from "./Forms/Edit_Reservation/EditeReservation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import UISkeleton from "./Forms/Create_Reservation/DetailSkul";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
  service: service[];
}
const CustomEditor = ({ scheduler, service }: CustomEditorProps) => {
  console.log(scheduler, "schedular");
  const [editeMode, setEditeMode] = useState<boolean>(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const res = await client.fetch(
      `*[_type == 'services' && _id == '${scheduler.edited?.service}' ][0]`
    );
    const doctorsId = res.doctors.map((e: { _ref: string }) => e._ref);
    const doctors = await client.fetch(
      `*[_type == 'unite' && _id in $doctorsId ]`,
      { doctorsId }
    );
    setData(
      doctors.map((e: { fullName: string; _id: string }) => ({
        _id: e._id,
        fullName: e.fullName,
      }))
    );
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
    if (!!scheduler.edited?.unite) {
      fetchData();
      setEditeMode(true);
    }
  }, [scheduler.edited?.unite]);
  if (loading) {
    return <UISkeleton />;
  }

  return (
    <>
      <CreateResrvation
        scheduler={scheduler}
        editeMod={editeMode}
        data={data}
        service={service}
      />
    </>
  );
};

export default CustomEditor;
