"use client";
import { Scheduler } from "@aldabil/react-scheduler";
import fr from "date-fns/locale/fr";
import React, { useEffect, useState } from "react";
import CustomEditor from "./Custom";
import Image from "next/image";
import toast from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { client } from "@/sanity/lib/client";
import { service } from "./types/services";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import useUserStore from "./store/data";

interface events {
  title: string;
  end: Date;
  start: Date;
  _id?: string;
  event_id: string;
  service: string;
  unite: string;
  client_id: string;
  color: string;
}

const queryClient = new QueryClient();

function Calender({
  events,
  service,
  users,
}: {
  events: events[];
  service: service[];
  users: { fullName: string }[];
}) {
  const [view, setView] = useState<"day" | "week">("week");
  const { initialUsers, addUser } = useUserStore();
  useEffect(() => {
    initialUsers(users);
  }, [users, initialUsers]);
  const handelDelete = async (e: string | number) => {
    console.log(e);
    try {
      const loading = toast.loading("loading...");
      const res = await client.delete(`${e}`);
      toast.dismiss(loading);
      console.log(res.results);
      if (res.results) {
        toast.error("something went wrong");
        // Handle HTTP error here (e.g., log or throw an error)
      } else {
        // Request was successful, handle the response here
        toast.success("Delete successful");
      }

      return e;
    } catch (error) {
      toast.dismiss();
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex gap-y-3 flex-col">
        <div className="flex items-center">
          <button></button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Scheduler
            loading={false}
            onDelete={(e) => handelDelete(e)}
            onEventClick={(event) => console.log(event.event_id)}
            draggable={false}
            disableViewNavigator={true}
            events={events}
            locale={fr}
            height={700}
            view={view}
            hourFormat="24"
            day={{
              startHour: 9,
              endHour: 19,
              step: 60,
              navigation: true,
            }}
            customEditor={(sch) => {
              const newDate = new Date();
              const date = sch.edited?.start;

              if (date && newDate > date) {
                toast.error("you can't edite this appointment");
                return (
                  <div className="p-8 flex flex-col gap-8">
                    <div className="icon">
                      <button
                        onClick={() => sch.close()}
                        className="btn btn-circle p-1 bg-white hover:bg-white"
                      >
                        x
                      </button>
                    </div>
                    <div>
                      <Image
                        width={200}
                        height={200}
                        className=" bg-blend-color-burn"
                        src="/no.png"
                        alt=""
                      />
                    </div>
                  </div>
                );
              }
              return <CustomEditor service={service} scheduler={sch} />;
            }}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 9,
              endHour: 19,
              step: 60,
              disableGoToDay: false,
              cellRenderer: ({ start, onClick, ...props }) => {
                const date = new Date();
                if (date > start) {
                  return (
                    <button
                      style={{
                        cursor: "not-allowed",
                        backgroundColor: "#eee",
                      }}
                      className="  disabled:bg-gray-50 "
                      onClick={() => {
                        return alert("Opss");
                      }}
                      disabled
                      {...props}
                    ></button>
                  );
                }
                return (
                  <button
                    style={{ height: "100%" }}
                    {...props}
                    onClick={onClick}
                  ></button>
                );
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </QueryClientProvider>
  );
}

export default Calender;
