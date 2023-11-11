import { service } from "@/src/types/services";
import {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { DialogActions } from "@mui/material";
import React, { Suspense, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import EditDetail from "./EditDetail";
import state from "@/src/types/state";
import { deleteAppointment } from "@/src/functions/Crud";
import toast from "react-hot-toast";

interface props {
  services: service[];
  scheduler: SchedulerHelpers;
  set: () => void;
}

function EditeReservation({ scheduler, services, set }: props) {
  const colorBg = `bg-${scheduler.edited?.color?.substring(1)}`;
  const [error, setError] = useState("");
  // const [component, SetComponent] = useState<"detail" | "client">("detail");
  // fc
  async function handelSubmit() {}
  return (
    <>
      <div className="p-6 min-w-[900px] flex flex-col gap-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div className="operation flex items-center gap-5">
              <p className="text-xl font-semibold">Edite Rendez-Vous</p>
              {/* <button className="btn btn-sm rounded-full capitalize btn-outline border-gray-500">
                Gréer note
              </button> */}
            </div>
            <div className="icon">
              <DialogActions>
                <button
                  onClick={() => scheduler.close()}
                  className="btn btn-circle btn-outline p-1 btn-error"
                >
                  x
                </button>
              </DialogActions>
            </div>
          </div>
          <div
            className={`divider before:bg-black after:bg-black my-0.5`}
          ></div>
        </section>
        <div className="tab-switcher rounded-full flex  border border-solid ">
          <button
            className={`btn flex-grow no-animation text-white ${`${colorBg}`} capitalize  rounded-full`}
          >
            Résumé du rendez-vous
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
              onClick={async () => {
                toast.loading("wait to be deleted !");
                await deleteAppointment(scheduler.state.event_id.value);
                toast.dismiss();
                toast.success("supprime");
                scheduler.close();
              }}
              className="btn border-gray-500 flex items-center gap-3 capitalize rounded-full btn-outline btn-error"
            >
              <p>Supprimer</p>
              <p>
                <BsTrash />
              </p>
            </button>

            <button
              onClick={() => set()}
              className="btn border-gray-500 flex items-center gap-3 capitalize rounded-full bg-purple-500 text-white hover:bg-purple-700"
            >
              <p>Modifier</p>
              <p>
                <BsPencil />
              </p>
            </button>

            <button
              className="bg-primary btn btn-wide flex items-center gap-3 capitalize hover:bg-primary text-white rounded-full"
              onClick={handelSubmit}
            >
              Mise a joure
              <BsPencil />
            </button>
          </DialogActions>
        </div>
      </div>
    </>
  );
}

export default EditeReservation;
