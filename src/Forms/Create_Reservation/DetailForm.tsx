import React, { useEffect, useState } from "react";
import { DateTimeField } from "@mui/x-date-pickers";
import state from "../../types/state";
import Image from "next/image";
import { deleteAsset, getServiceDoctors } from "../../functions/Crud";
import { service } from "../../types/services";
import toast from "react-hot-toast";
import useUserStore from "../../store/data";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { urlForImage } from "@/sanity/lib/image";
import { BsTrash } from "react-icons/bs";
import { StateItem } from "@aldabil/react-scheduler/views/Editor";

interface props {
  set: (value: string | Date | string[], name: string) => void;
  state: state;
  services: service[];
  data?: { fullName: string; _id: string }[] | null;
  documentId: StateItem;
}
interface assets {
  _key: string;
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
}
function DetailForm(props: props) {
  const [client, setClient] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State to store image previews
  const [unite, setUnite] = useState<{ _id: string; fullName: string }[]>([]);
  const [error, setError] = useState("");
  const [assets, setAssets] = useState<assets[]>([]);
  const { users } = useUserStore();
  useEffect(() => {
    if (props.data && props.data.length > 0) {
      setUnite(props.data);
      if (props.state.assets) {
        setAssets(props.state.assets as assets[]);
      }
    }
  }, [props.data, props.state.assets]);
  function handleImageChange(event: any) {
    const files = event.target.files;

    const previewUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        previewUrls.push(imageUrl);
      }
    }

    setImagePreviews(previewUrls);
    props.set(files, "assets");
  }
  async function handelServiceChange(e: any) {
    setUnite([]);
    setError("");
    const selectedService = props.services.filter(
      (val) => val._id === e.target.value
    );
    // console.log(selectedService, "selscted Service");
    const doctorsId =
      "doctors" in selectedService[0]
        ? selectedService[0].doctors.map((d) => d._ref)
        : [];
    if (doctorsId.length < 1) {
      setError("Aucun médecin disponible pour ce service");
      return;
    }
    toast.loading("Recherche de médecins pour ce service");
    const doctors = await getServiceDoctors(doctorsId);

    toast.dismiss();

    if (doctors && doctors.length < 1) {
      setError("Aucun médecin disponible pour ce service");
      return;
    }
    toast.success("Choisissez un médecin");

    doctors && setUnite(doctors);
    props.set(e.target.value, "service");
  }
  return (
    <>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Client</p>
        <div className="inputs flex items-center gap-4">
          <div className=" flex-grow relative px-3">
            <Autocomplete
              fullWidth
              onChange={(event: any, newValue: string | null) =>
                newValue
                  ? props.set(newValue?.toLocaleLowerCase(), "client")
                  : props.set("", "client")
              }
              value={props.state.client}
              options={users.map((e) => e.fullName)}
              renderInput={(params) => (
                <TextField {...params} label="choisissez un client" />
              )}
            />
          </div>
          {!props.data && (
            <button
              onClick={() => props.set("", "component")}
              className="btn flex items-center rounded-full capitalize border-gray-500 bg-white text-black btn-outline hover:bg-white hover:text-black  btn-md"
            >
              <span className="text-2xl">{!client ? "+" : "-"}</span>
              <span className="">{!client ? "Ajouter" : "retirer"}</span>
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl max-w-fit">
          <span>Service</span>
          <span className="mb-1 text-error"> *</span>
        </p>
        <div className="inputs flex items-center">
          <div className=" relative px-3 flex-grow">
            <FormControl fullWidth>
              <InputLabel>Choisissez un Service</InputLabel>
              <Select
                label="Choisissez un Service"
                onChange={(e) => handelServiceChange(e)}
                fullWidth
                defaultValue={props.state.service}
              >
                <MenuItem disabled selected>
                  Choose a service
                </MenuItem>
                {props.services.map((e, i) => (
                  <MenuItem key={e._id + i} value={e._id}>
                    <div className="flex items-center w-full gap-3">
                      <img
                        className="w-[60px] aspect-square object-cover"
                        src={`${urlForImage(e.image)}`}
                        alt="service image"
                      />
                      <span>{e.service_name}</span>
                      <div className="flex-grow flex items-center justify-end text-sm">
                        <span className=" justify-end text-gray-700">
                          {e.price} Dh
                        </span>
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl max-w-fit">
          <span>Unité</span>
          <span className="mb-1 text-error"> *</span>
        </p>
        <div className="inputs  flex items-center">
          <div className=" relative px-3 flex-grow">
            <FormControl fullWidth>
              <InputLabel> Choose Medicen </InputLabel>
              <Select
                fullWidth
                label="Choose Medicen"
                disabled={unite.length > 0 ? false : true}
                onChange={(e) => props.set(e.target.value as string, "unite")}
                defaultValue={props.state.unite}
              >
                <MenuItem disabled selected>
                  Choose a Medicen
                </MenuItem>
                {unite.length > 0 &&
                  unite.map((e, i) => (
                    <MenuItem key={e._id + i} value={e._id}>
                      {e.fullName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl max-w-fit">
          <span>Heure de début</span>
          <span className="mb-1 text-error"> *</span>
        </p>
        <div className="inputs flex items-center">
          <div className=" relative px-3 grid grid-cols-2 gap-2 flex-grow">
            <DateTimeField
              defaultValue={props.state.start.value}
              onChange={(e) => e && props.set(e, "start")}
              ampm={false}
              label="Start Date"
              minTime={new Date("2023/11/02 9:00")}
              maxTime={new Date("2023/11/02 19:00")}
            />
            <DateTimeField
              ampm={false}
              defaultValue={props.state.end.value}
              onChange={(e) => e && props.set(e, "end")}
              label="End Date"
              minTime={new Date("2023/11/02 9:00")}
              maxTime={new Date("2023/11/02 19:00")}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="grid my-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-3">
          {props.data &&
            props.data.length > 0 &&
            assets.map((e, i) => (
              <div key={i + "rrtrz"} className="relative">
                <img src={`${urlForImage(e)}`} alt="" />
                <p
                  className=" absolute btn btn-circle btn-sm bg-white btn-outline btn-error top-1 right-0 z-10 cursor-pointer"
                  onClick={() => {
                    const filterAssets = assets.filter(
                      (el) => el.asset._ref !== e.asset._ref
                    );
                    deleteAsset(
                      props.state.assets as assets[],
                      e.asset._ref as string,
                      props.documentId.value
                    );
                    setAssets(filterAssets);
                  }}
                >
                  <BsTrash />
                </p>
              </div>
            ))}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          className="file-input w-full max-w-xs"
          multiple // Allow multiple file selection
        />
        {/* Display the image previews */}
        {imagePreviews.length > 0 && (
          <div className="flex mt-5 items-center gap-3 flex-wrap">
            {imagePreviews.map((previewUrl, index) => (
              <div className="max-w-[100px]" key={index}>
                <Image
                  src={previewUrl}
                  alt={`Image Preview ${index}`}
                  width={100}
                  height={100}
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 text-error">{error && error}</div>
    </>
  );
}

export default DetailForm;
