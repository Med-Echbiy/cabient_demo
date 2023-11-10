import state, { client as typeClient } from "../types/state";
import { client as Client } from "@/sanity/lib/client";
import { nanoid } from "nanoid";
import { reservation } from "../types/reservation";

export async function createAppointment(
  clientId: string,
  state: state,
  id: string
) {
  try {
    const assetRefs = (await addAsset(state)) || [];
    const doc: reservation = {
      _id: `reservation_${id}`,
      event_id: `reservation_${id}`,
      _type: "reservation",
      start: new Date(state.start.value),
      end: new Date(state.end.value),
      title: state.client, // Replace with your document type in Sanity
      client: {
        _ref: clientId,
        _type: "reference",
      },
      service: {
        _ref: state.service,
        _type: "reference",
      },
      doctors: {
        _ref: state.unite,
        _type: "reference",
      },
      assets: assetRefs,
      color: state.color,
    };

    await Client.create(doc, { autoGenerateArrayKeys: true }).then((done) =>
      console.log(done)
    );
    // window.location.reload();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createClient(client: typeClient) {
  try {
    const res = await Client.create({
      _id: `client_${nanoid(20)}`,
      _type: "client",
      ...client,
      fullName: client.fullName.toLocaleLowerCase(),
      phone: +`212${client.phone}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function updateAppointment(docId: string, state: state) {
  //update

  try {
    const assetRefs = (await addAsset(state)) || [];
    const getId = await Client.fetch(
      `*[_type == 'client' && fullName == '${state.client}' ][0]{_id}`
    );

    const res = await Client.patch(docId)
      .set({
        client: {
          _ref: getId._id,
          _type: "reference",
        },
        start: new Date(state.start.value),
        end: new Date(state.end.value),
        service: {
          _ref: state.service,
          _type: "reference",
        },
        doctors: {
          _ref: state.unite,
          _type: "reference",
        },
        assets: assetRefs,
        title: state.client,
        color: state.color,
      })
      .commit();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function addAsset(state: state) {
  const assetRefs: {
    _key: string;
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  }[] = state.assets || [];
  try {
    if (state.assetsBlob && state.assetsBlob.length > 0) {
      for (const assetBlob of state.assetsBlob) {
        const asset = await Client.assets.upload("image", assetBlob as Blob, {
          contentType: "image/*",
          filename: nanoid(10),
        });

        assetRefs.push({
          _key: nanoid(20),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        });
      }
    }
    return assetRefs;
  } catch (error) {
    console.log(error);
  }
}

export async function updateClient() {}

export async function deleteAppointment(docId: string) {
  try {
    const res = await Client.delete(docId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function getServices() {
  try {
    const response = await Client.fetch(`*[_type == 'services' ]`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAsset(
  assets: {
    _type: "image";
    _key: string;
    asset: {
      _type: "reference";
      _ref: string;
    };
  }[],
  target: string,
  docId: string
) {
  try {
    const filterTheTargetOut = assets.filter((e) => e.asset._ref !== target);
    console.log(filterTheTargetOut, docId);
    const req = await Client.patch(docId)
      .set({ assets: filterTheTargetOut })
      .commit();
  } catch (error) {
    console.log(error);
  }
}

export async function getServiceDoctors(idOfDoctorsProviding: string[]) {
  try {
    const res = await Client.fetch(
      `*[_type == 'unite' &&  _id in $idOfDoctorsProviding ]`,
      {
        idOfDoctorsProviding,
      }
    );
    const response: { _id: string; fullName: string }[] = res;
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
