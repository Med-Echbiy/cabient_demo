import { TextField } from "@mui/material";
import React from "react";
import { CountrySelector } from "react-international-phone";
import "react-international-phone/style.css";

function ClientForm({
  set,
}: {
  set: (value: string | number, name: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Nom et prénom</p>
        <div className="inputs flex items-center gap-4">
          <div className=" flex-grow relative px-3">
            <TextField
              label="Nom et prénom"
              type="text"
              fullWidth
              onChange={(e) => set(e.target.value, "fullName")}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Téléphone</p>
        <div className="inputs flex items-center gap-4">
          <div className=" relative flex flex-grow gap-2 items-center px-3">
            <CountrySelector
              dropdownArrowStyle={{ display: "none" }}
              selectedCountry="ma"
              disabled
            />
            <TextField
              label="Tele"
              onChange={(e) => set(e.target.value, "phone")}
              type="number"
              fullWidth
              placeholder="6 xx xx xx xx"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Adresse</p>
        <div className="inputs  flex items-center gap-4">
          <div className=" relative flex-grow px-3">
            <TextField
              label="Adresse"
              type="text"
              fullWidth
              onChange={(e) => set(e.target.value, "adress")}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Ville</p>
        <div className="inputs flex items-center gap-4">
          <div className=" relative flex-grow px-3">
            <TextField
              fullWidth
              label="Ville"
              onChange={(e) => set(e.target.value, "city")}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center justify-between">
        <p className="label text-xl">Email</p>
        <div className="inputs flex items-center gap-4">
          <div className=" relative flex-grow px-3">
            <TextField
              fullWidth
              label="Email"
              onChange={(e) => set(e.target.value, "email")}
              type="text"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientForm;
