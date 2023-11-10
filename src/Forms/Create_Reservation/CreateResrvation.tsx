"use client";
import checkClient from "@/src/functions/CheckClient";
import {
  createAppointment,
  createClient,
  deleteAppointment,
  updateAppointment,
} from "@/src/functions/Crud";
import {
  submitValidation,
  createClientValidation,
} from "@/src/functions/validations";
import useUserStore from "@/src/store/data";
import {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { DialogActions } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClientForm from "./ClientForm";
import DetailForm from "./DetailForm";
import { service } from "@/src/types/services";
import state, { client } from "@/src/types/state";
import { BsPencil, BsTrash } from "react-icons/bs";

interface props {
  scheduler: SchedulerHelpers;
  service: service[];
  editeMod?: boolean;
  data?: { fullName: string; _id: string }[] | null;
}

function CreateResrvation({ scheduler, service, editeMod, data }: props) {
  const event = scheduler.edited;
  const [component, SetComponent] = useState<"client" | "detail">("detail");
  const [error, setError] = useState("");

  // Make your own form/state
  const [state, setState] = useState<state>({
    client: event?.title || "",
    clientId: event?.client_id || "",
    unite: (event?.unite as string) || "",
    start: {
      value: scheduler.state.start.value,
      validity: true,
      type: "date",
    },
    end: {
      value: scheduler.state.end.value,
      validity: true,
      type: "date",
    },
    service: (event?.service as string) || "",
    assets: event?.assets || [],
    color: event?.color || "#06b6d4",
    assetsBlob: [],
  });
  const [client, setClient] = useState<client>({
    fullName: "",
    phone: 600000000,
    adress: "",
    city: "",
    email: "",
  });
  const [disableClient, setDisableClient] = useState(false);
  const { users, addUser } = useUserStore();
  useEffect(() => {
    setError("");
    console.log("################################");
    console.log(state);
    console.log("################################");
  }, [state, client]);

  const handleChangeDetail = (
    value: string | Date | string[],
    name: string
  ) => {
    if (name === "component") {
      SetComponent("client");
      return;
    }
    if (name === "start" || name === "end") {
      setState((prev) => {
        return {
          ...prev,
          [name]: { ...prev[name], value: value },
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  const handleChangeClient = (value: string | number, name: string) => {
    setClient((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmitDetail = async () => {
    // Your own validation
    toast.loading("Chargement en cours...");
    const validate = await submitValidation(state);
    if (!validate.approved) {
      toast.dismiss();
      setError(validate.msg);
      return;
    }
    try {
      const id = nanoid(50);
      const clientId = await checkClient(state.client);
      if (!clientId) {
        toast.dismiss();
        return;
      }
      handleChangeDetail(clientId, "clientId");
      /**Simulate remote data saving */
      if (editeMod) {
        await updateAppointment(scheduler.state.event_id.value, state);
        const added_updated_event = (await new Promise((res) => {
          res({
            event_id: event?.event_id || `reservation_${id}`,
            title: `${state.client}`,
            start: state.start.value,
            end: state.end.value,
            unite: state.unite,
            service: state.service,
            assets: state.assets,
            clientId: state.clientId,
            color: state.color,
          });
        })) as ProcessedEvent;
        scheduler.onConfirm(added_updated_event, "edit");
        toast.dismiss();
        toast.success("Terminé !");
        scheduler.close();
        return;
      }
      const create_Appointment = await createAppointment(clientId, state, id);
      // Operation to add to the database
      const added_updated_event = (await new Promise((res) => {
        res({
          event_id: event?.event_id || `reservation_${id}`,
          title: `${state.client}`,
          start: state.start.value,
          end: state.end.value,
          unite: state.unite,
          service: state.service,
          assets: state.assets,
          clientId: state.clientId,
          color: state.color,
        });
      })) as ProcessedEvent;

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      toast.dismiss();
      toast.success("Terminé !");
      scheduler.close();
    } catch (err) {
      toast.error("Quelque chose s'est mal passé");
    }
  };

  const handleSubmitClient = async () => {
    try {
      const validate = await createClientValidation(client, users);
      if (!validate.isValid) {
        setError(validate.msg);
        return;
      }
      toast.loading("Chargement en cours...");
      const res = await createClient(client);
      console.log(res);
      if (!res?._id) throw Error("Erreur");
      handleChangeDetail(res.fullName, "client");
      SetComponent("detail");
      addUser({ fullName: res.fullName });
      toast.dismiss();
      toast.success("Terminé");
      setDisableClient(true);
    } catch (error) {
      toast.dismiss();
      toast.error("Quelque chose s'est mal passé");
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (component === "detail") {
      handleSubmitDetail();
    } else {
      handleSubmitClient();
    }
  };
  return (
    <div className="p-6 min-w-[900px] overflow-x-hidden flex flex-col gap-y-8">
      <section>
        <div className="flex items-center justify-between">
          <div className="operation flex items-center gap-5">
            <p className="text-xl font-semibold">
              {component === "detail"
                ? "Créer une réservation"
                : "Créer une Client"}
            </p>
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
      <div className="tab-switcher rounded-full  border border-solid flex items-center">
        <button
          onClick={() => SetComponent("detail")}
          className={`btn no-animation ${
            component === "detail"
              ? "bg-blue-50 hover:bg-blue-50"
              : "bg-white hover:bg-white border-none"
          } capitalize  rounded-full flex-grow `}
        >
          Détail
        </button>
        {!editeMod && (
          <button
            onClick={() => !disableClient && SetComponent("client")}
            className={`btn ${
              component !== "client"
                ? "bg-white hover:bg-white border-none"
                : "bg-blue-50 hover:bg-blue-50"
            }  no-animation capitalize  outline-none flex-grow  rounded-full`}
          >
            Client
          </button>
        )}
      </div>
      <div
        className={`detail_component flex flex-col gap-8 justify-center ${
          component !== "detail" ? "hidden" : "block"
        }`}
      >
        <DetailForm
          services={service}
          data={data}
          set={handleChangeDetail}
          state={state}
          documentId={scheduler.state.event_id}
        />
      </div>
      {!editeMod && (
        <div
          className={`client_component flex flex-col gap-8 justify-center ${
            component === "detail" ? "hidden" : "block"
          }`}
        >
          <ClientForm set={handleChangeClient} />
        </div>
      )}

      {error && (
        <div className="error w-full">
          <p className="text-error text text-center">{error}</p>
        </div>
      )}
      <div className="w-full flex items-center justify-end">
        <DialogActions>
          <button
            className="btn border-gray-500 capitalize rounded-full btn-outline"
            onClick={scheduler.close}
          >
            Annuler
          </button>
   
          <button
            className="bg-primary btn btn-wide capitalize hover:bg-primary text-white rounded-full"
            onClick={handleSubmit}
          >
            {component === "detail" ? "Enregistrer" : "Ajouter un client."}
          </button>
        </DialogActions>
      </div>
    </div>
  );
}

export default CreateResrvation;
