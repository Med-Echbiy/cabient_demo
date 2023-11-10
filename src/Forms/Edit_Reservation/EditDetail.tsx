"use client";
import { client as Client } from "@/sanity/lib/client";
import useUserStore from "@/src/store/data";
import { service } from "@/src/types/services";
import { SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsCalendar2Date } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";

interface props {
  details: SchedulerHelpers;
  services: service[];
}

function EditDetail(props: props) {
  const { users } = useUserStore();
  const [edite, setEdite] = useState({
    unite: true,
    service: true,
    client: true,
    startDate: true,
    endDate: true,
  });
  const handelEditeChange = (name: string, value: boolean) => {
    setEdite((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const fetchDoctor = async () => {
    try {
      console.log("id:", props.details.edited?.unite);

      const res = await Client.fetch(
        `*[ _type == 'unite' && _id == '${props.details.edited?.unite}' ]`
      );
      //   console.log(res, "response");
      const req = props.services.filter(
        (e) => e._id == props.details.edited?.service
      );

      if (res.length < 1 || req.length < 1) {
        throw Error("not found");
      }
      return { unite: res[0], service: req[0] };
    } catch (error) {
      console.log(error);
      toast.error("bruuh");
      props.details.close();
    }
  };
  const detailData = useQuery({
    queryKey: ["doctors", "service"],
    queryFn: fetchDoctor,
  });
  if (detailData.isLoading) {
    // toast.loading("chargement en cours...");
    return;
  }
  //   toast.dismiss();
  console.log(detailData.data);

  return (
    <>
      <div className="w-full h-full grid grid-cols-3 gap-6">
        <div
          className={`appointment_time_duration p-3 rounded text-white flex flex-col gap-y-4`}
          style={{
            backgroundColor: props.details.edited?.color,
          }}
        >
          <p className="flex items-center gap-2">
            <span>
              <BsCalendar2Date />
            </span>
            <span>
              {`${
                props.details.edited?.end &&
                new Date(props.details.edited?.end).toDateString()
              }`}
            </span>
          </p>

          <p>
            {props.details.edited?.start &&
              `${new Date(
                props.details.edited?.start
              ).getHours()}:00 - ${new Date(
                props.details.edited?.end
              ).getHours()}:00`}
          </p>
          <p className="flex items-center gap-2">
            <span>
              <BiTimer size={20} />
            </span>
            <span>
              {props.details.edited?.start &&
                new Date(props.details.edited?.end).getHours() -
                  new Date(props.details.edited?.start).getHours()}
              h.
            </span>
          </p>
        </div>
        <div className=""></div>
      </div>
    </>
  );
}

export default EditDetail;
