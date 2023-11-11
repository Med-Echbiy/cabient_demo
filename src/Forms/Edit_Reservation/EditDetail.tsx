"use client";
import { client as Client } from "@/sanity/lib/client";
import useUserStore from "@/src/store/data";
import { service } from "@/src/types/services";
import { SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsCalendar2Date, BsPerson } from "react-icons/bs";
import { BiDollar, BiLogoGmail, BiTimer } from "react-icons/bi";
import { client as clientType } from "@/src/types/state";
import { Doctor } from "@/src/types/doctor";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

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
  const calculateDuration = (startDate, endDate) => {
    const diffInMs = endDate - startDate;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const fetchDoctor = async () => {
    try {
      console.log("id:", props.details.edited?.unite);
      const user: clientType = await Client.fetch(
        `*[_type == 'client' && fullName == '${props.details.edited?.title}' ][0]`
      );

      const res: Doctor[] = await Client.fetch(
        `*[ _type == 'unite' && _id == '${props.details.edited?.unite}' ]`
      );
      //   console.log(res, "response");
      const req: service[] = props.services.filter(
        (e) => e._id == props.details.edited?.service
      );

      if (res.length < 1 || req.length < 1) {
        throw Error("not found");
      }
      return { unite: res[0], service: req[0], user: user };
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
      <div className="w-full h-full grid grid-cols-3 gap-6 capitalize">
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
              {props.details.edited?.end &&
                new Date(props.details.edited?.end).toLocaleString()}
            </span>
          </p>

          <p>
            {props.details.edited?.start && props.details.edited?.end && (
              <>
                {`${new Date(props.details.edited?.start).toLocaleTimeString(
                  "it-IT",
                  {
                    timeStyle: "short",
                  }
                )} - ${new Date(props.details.edited?.end).toLocaleTimeString(
                  "it-It",
                  {
                    timeStyle: "short",
                  }
                )}`}
              </>
            )}
          </p>

          <p className="flex items-center gap-2">
            <span>
              <BiTimer size={20} />
            </span>
            <span>
              {props.details.edited?.start && props.details.edited?.end && (
                <>
                  {calculateDuration(
                    new Date(props.details.edited?.start),
                    new Date(props.details.edited?.end)
                  )}
                </>
              )}
            </span>
          </p>
        </div>

        <div
          className="p-3 outline outline-solid outline-offset-2 rounded-md"
          style={{
            outlineColor: props.details.edited?.color,
          }}
        >
          <p className="underline">médecin</p>
          <div className="client_detail flex mt-2 flex-col gap-y-2">
            <p className="flex items-center gap-2">
              <BsPerson />
              <span>{detailData.data?.unite.fullName}</span>
            </p>
            <p>
              <span>🇲🇦 +212{detailData.data?.unite.phone}</span>
            </p>
            <p className="adress lowercase flex items-center gap-2">
              <BiLogoGmail />
              <span>{detailData.data?.unite.email}</span>
            </p>
          </div>
        </div>
        <div className="p-3 outline outlne-solid drop-shadow-xl outline-gray-100 rounded-md">
          <p className="underline">Client</p>
          <div className="client_detail flex mt-2 flex-col gap-y-2">
            <p className="flex items-center gap-2">
              <BsPerson />
              <span>{detailData.data?.user.fullName}</span>
            </p>
            <p>
              <span>🇲🇦 +{detailData.data?.user.phone}</span>
            </p>
            <p className="adress lowercase flex items-center gap-2">
              <BiLogoGmail />
              <span>{detailData.data?.user.email}</span>
            </p>
          </div>
        </div>
        <div className="p-3 outline outlne-solid drop-shadow-xl outline-gray-100 rounded-md">
          <p className="underline">Service</p>
          <div className="client_detail flex mt-2 flex-col gap-y-2">
            <p>
              {detailData.data?.service.image && (
                <img
                  className="w-full object-contain"
                  src={`${urlForImage(detailData.data.service.image)}`}
                  alt={detailData.data.service.service_name}
                />
              )}
            </p>
            <p className="flex items-center gap-2">
              <span>{detailData.data?.service.service_name}</span>
            </p>

            <p className="adress capitalize flex items-center gap-1">
              <span>{detailData.data?.service.price} Dh</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDetail;
