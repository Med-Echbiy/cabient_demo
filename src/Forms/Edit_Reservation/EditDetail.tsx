"use client";
import { client as Client, client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import useUserStore from "@/src/store/data";
import { service } from "@/src/types/services";
import state, { client as typeClient } from "@/src/types/state";
import {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { RxUpdate } from "react-icons/rx";
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
      const req = await Client.fetch(
        `*[_type == 'services' && _id == '${props.details.edited?.service}' ]`
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
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Client</p>
        <div className="inputs flex items-center gap-4">
          <div className=" flex-grow relative px-3">
            <Autocomplete
              fullWidth
              disabled
              onChange={(event: any, newValue: string | null) =>
                console.log(newValue)
              }
              value={props.details.edited?.title}
              options={users.map((e) => e.fullName)}
              key={nanoid(5)}
              renderInput={(params) => (
                <TextField {...params} label="choisissez un client" />
              )}
            />
          </div>
          {/* <button
            // onClick={() => props.set("", "component")}
            className="btn flex items-center rounded-full capitalize border-gray-500 bg-white text-black btn-outline  btn-md"
          >
            Ajouter +
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl max-w-fit">
          <span>Service</span>
          <span className="mb-1 text-error"> *</span>
        </p>
        <div className="inputs flex items-center">
          <div className=" relative px-3 flex-grow">
            <FormControl
              className="flex items-center justify-between gap-3"
              fullWidth
            >
              <div className="flex w-full items-center gap-3 justify-between">
                <TextField
                  label="Choisissez un Service"
                  disabled
                  defaultValue={detailData.data?.service.service_name}
                  fullWidth
                />
              </div>
            </FormControl>
          </div>
        </div>
      </div>
      {/*  */}

      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl max-w-fit">
          <span>Unité</span>
          <span className="mb-1 text-error"> *</span>
        </p>
        <div className="inputs flex items-center">
          <div className=" relative px-3 flex-grow">
            <FormControl
              className="flex items-center justify-between gap-3"
              fullWidth
            >
              <div className="flex w-full items-center gap-3 justify-between">
                <TextField
                  label="Choisissez un Service"
                  disabled
                  defaultValue={detailData.data?.unite.fullName}
                  fullWidth
                />
              </div>
            </FormControl>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl max-w-fit">
          <span>Heure de début</span>
          <span className="mb-1 text-error"> *</span>
        </p>
        <div className="inputs flex items-center">
          <div className=" relative px-3 grid grid-cols-2 gap-2 flex-grow">
            <DateTimeField
              defaultValue={props.details.edited?.start}
              disabled
              ampm={false}
              label="Start Date"
              minTime={new Date("2023/11/02 9:00")}
              maxTime={new Date("2023/11/02 19:00")}
            />
            <DateTimeField
              ampm={false}
              disabled
              defaultValue={props.details.edited?.end}
              label="End Date"
              minTime={new Date("2023/11/02 9:00")}
              maxTime={new Date("2023/11/02 19:00")}
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-3">
        {props.details.edited?.assets.map((e: SanityImageSource, i: number) => (
          <img src={`${urlForImage(e)}`} key={i + i + "zeyzyeazue"} />
        ))}
      </div>
    </>
  );
}

export default EditDetail;
