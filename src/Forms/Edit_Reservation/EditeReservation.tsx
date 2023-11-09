import { service } from "@/src/types/services";
import {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { DialogActions } from "@mui/material";
import React, { Suspense, useState } from "react";
import { BsPencil } from "react-icons/bs";
import EditDetail from "./EditDetail";
import state from "@/src/types/state";

interface props {
  services: service[];
  scheduler: SchedulerHelpers;
}

function EditeReservation({ scheduler, services }: props) {
  const [error, setError] = useState("");
  const [component, SetComponent] = useState<"detail" | "client">("detail");
  // fc
  async function handelSubmit() {}
  return (
    <>
      <div className="p-6 min-w-[900px] flex flex-col gap-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div className="operation flex items-center gap-5">
              <p className="text-xl font-semibold">Edite</p>
              {/* <button className="btn btn-sm rounded-full capitalize btn-outline border-gray-500">
                Gréer note
              </button> */}
            </div>
            <div className="icon">
              <DialogActions>
                <button
                  onClick={() => scheduler.close()}
                  className="btn btn-circle p-1 bg-white hover:bg-white"
                >
                  x
                </button>
              </DialogActions>
            </div>
          </div>
          <div className="divider before:bg-primary after:bg-primary my-0.5"></div>
        </section>
        <div className="tab-switcher rounded-full grid border border-solid grid-cols-2">
          <button
            onClick={() => SetComponent("detail")}
            className={`btn no-animation ${
              component === "detail"
                ? "bg-blue-50 hover:bg-blue-50"
                : "bg-white hover:bg-white border-none"
            } capitalize  rounded-full`}
          >
            Détail
          </button>
          <button
            onClick={() => SetComponent("client")}
            className={`btn ${
              component !== "client"
                ? "bg-white hover:bg-white border-none"
                : "bg-blue-50 hover:bg-blue-50"
            }  no-animation capitalize  outline-none  rounded-full`}
          >
            Client
          </button>
        </div>
        {/* content */}

        <EditDetail details={scheduler} services={services} />

        {/* end content */}

        <div className="error w-full">
          <p className="text-error text text-center">{error}</p>
        </div>
        <div className="w-full flex items-center justify-end">
          <DialogActions>
            <button
              className="btn border-gray-500 capitalize rounded-full btn-outline"
              onClick={scheduler.close}
            >
              Annuler
            </button>
            <button
              className="bg-primary btn btn-wide flex items-center gap-3 capitalize hover:bg-primary text-white rounded-full"
              onClick={handelSubmit}
            >
              Modifier
              <BsPencil />
            </button>
          </DialogActions>
        </div>
      </div>
    </>
  );
}

export default EditeReservation;
